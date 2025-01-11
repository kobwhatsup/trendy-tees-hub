import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { createHash } from "https://deno.land/std@0.218.2/crypto/mod.ts"

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
      throw new Error('Missing WeChat Pay configuration');
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

    // 使用私钥签名
    const key = await crypto.subtle.importKey(
      "pkcs8",
      new TextEncoder().encode(privateKey),
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256",
      },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      new TextEncoder().encode(signStr)
    );

    const base64Signature = btoa(String.fromCharCode(...new Uint8Array(signature)));

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

    if (!response.ok) {
      const errorData = await response.json();
      console.error('WeChat Pay API error:', errorData);
      throw new Error(`WeChat Pay API error: ${response.statusText}`);
    }

    const paymentResult = await response.json();
    console.log('Payment result:', paymentResult);

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
      throw paymentError;
    }

    // 设置订单超时自动关闭（5分钟）
    setTimeout(async () => {
      const { data: order } = await supabaseClient
        .from('orders')
        .select('status')
        .eq('id', orderId)
        .single();

      if (order?.status === 'pending_payment') {
        // 关闭订单
        await supabaseClient
          .from('orders')
          .update({ 
            status: 'payment_timeout',
            updated_at: new Date().toISOString()
          })
          .eq('id', orderId);

        // 更新支付记录
        await supabaseClient
          .from('payment_records')
          .update({ 
            status: 'timeout',
            updated_at: new Date().toISOString()
          })
          .eq('order_id', orderId);

        console.log('Order timeout handled:', orderId);
      }
    }, 5 * 60 * 1000);

    // 返回支付二维码URL
    return new Response(
      JSON.stringify({ code_url: paymentResult.code_url }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );

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