import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WechatPayRequestBody {
  orderId: string;
  amount: number;
  description: string;
}

serve(async (req) => {
  // 处理 CORS 预检请求
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { orderId, amount, description }: WechatPayRequestBody = await req.json();

    // 获取微信支付配置
    const mchid = Deno.env.get('WECHAT_PAY_MCH_ID');
    const serialNo = Deno.env.get('WECHAT_PAY_CERT_SERIAL_NO');
    const privateKey = Deno.env.get('WECHAT_PAY_PRIVATE_KEY');
    const appId = Deno.env.get('WECHAT_PAY_APP_ID');

    if (!mchid || !serialNo || !privateKey || !appId) {
      console.error('Missing WeChat Pay configuration');
      return new Response(
        JSON.stringify({ error: 'Missing WeChat Pay configuration' }), 
        { 
          status: 500,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json' 
          } 
        }
      );
    }

    console.log('Creating payment request with config:', {
      mchid,
      serialNo,
      appId,
      orderId,
      amount
    });

    // 生成随机字符串
    const nonceStr = crypto.randomUUID();
    const timestamp = Math.floor(Date.now() / 1000).toString();
    
    // 构建请求参数
    const requestBody = {
      appid: appId,
      mchid: mchid,
      description: description,
      out_trade_no: orderId,
      notify_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/wechat-payment-callback`,
      amount: {
        total: amount,
        currency: 'CNY'
      },
      scene_info: {
        payer_client_ip: req.headers.get('x-real-ip') || '127.0.0.1',
      }
    };

    // 生成签名
    const method = 'POST';
    const url = '/v3/pay/transactions/native';
    const signStr = `${method}\n${url}\n${timestamp}\n${nonceStr}\n${JSON.stringify(requestBody)}\n`;
    
    console.log('Generating signature with string:', signStr);

    try {
      // 处理私钥格式，移除头尾和换行符
      const formattedPrivateKey = privateKey
        .replace(/-----BEGIN PRIVATE KEY-----/, '')
        .replace(/-----END PRIVATE KEY-----/, '')
        .replace(/\n/g, '');

      // 将Base64格式的私钥转换为字节数组
      const binaryKey = Uint8Array.from(atob(formattedPrivateKey), c => c.charCodeAt(0));

      // 使用私钥签名
      const key = await crypto.subtle.importKey(
        "pkcs8",
        binaryKey,
        {
          name: "RSASSA-PKCS1-v1_5",
          hash: "SHA-256",
        },
        false,
        ["sign"]
      );

      const signatureBytes = await crypto.subtle.sign(
        "RSASSA-PKCS1-v1_5",
        key,
        new TextEncoder().encode(signStr)
      );

      const base64Signature = btoa(String.fromCharCode(...new Uint8Array(signatureBytes)));

      // 构建认证头
      const authorization = `WECHATPAY2-SHA256-RSA2048 mchid="${mchid}",nonce_str="${nonceStr}",signature="${base64Signature}",timestamp="${timestamp}",serial_no="${serialNo}"`;

      console.log('Sending request to WeChat Pay API...');
      
      // 调用微信支付API
      const response = await fetch('https://api.mch.weixin.qq.com/v3/pay/transactions/native', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': authorization,
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('WeChat Pay API error:', responseData);
        return new Response(
          JSON.stringify({ error: `WeChat Pay API error: ${responseData.message || response.statusText}` }), 
          { 
            status: response.status,
            headers: { 
              ...corsHeaders,
              'Content-Type': 'application/json' 
            } 
          }
        );
      }

      console.log('Payment result:', responseData);

      // 创建支付记录
      const { error: paymentError } = await supabaseClient
        .from('payment_records')
        .insert({
          order_id: orderId,
          amount: amount / 100, // 转换回元
          status: 'pending'
        });

      if (paymentError) {
        console.error('Error creating payment record:', paymentError);
        return new Response(
          JSON.stringify({ error: 'Failed to create payment record' }), 
          { 
            status: 500,
            headers: { 
              ...corsHeaders,
              'Content-Type': 'application/json' 
            } 
          }
        );
      }

      // 返回支付二维码URL
      return new Response(
        JSON.stringify({ code_url: responseData.code_url }),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json' 
          } 
        }
      );

    } catch (error) {
      console.error('Error processing payment request:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to process payment request' }), 
        { 
          status: 500,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json' 
          } 
        }
      );
    }

  } catch (error) {
    console.error('Error creating WeChat payment:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});