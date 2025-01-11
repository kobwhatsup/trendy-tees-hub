import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createHash, createSign } from "https://deno.land/std@0.218.2/crypto/mod.ts"

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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { orderId, amount, description }: WechatPayRequestBody = await req.json();

    // 获取微信支付所需的配置
    const mchid = Deno.env.get('WECHAT_PAY_MCH_ID');
    const serialNo = Deno.env.get('WECHAT_PAY_CERT_SERIAL_NO');
    const privateKey = Deno.env.get('WECHAT_PAY_PRIVATE_KEY');

    if (!mchid || !serialNo || !privateKey) {
      throw new Error('Missing WeChat Pay configuration');
    }

    // 生成随机字符串
    const nonceStr = crypto.randomUUID();
    const timestamp = Math.floor(Date.now() / 1000).toString();
    
    // 构建请求参数
    const requestBody = {
      appid: Deno.env.get('WECHAT_PAY_APP_ID'),
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
    
    const sign = createSign('ECDSA');
    sign.update(signStr);
    const signature = sign.sign(privateKey, 'base64');

    // 构建认证头
    const authorization = `WECHATPAY2-SHA256-RSA2048 mchid="${mchid}",nonce_str="${nonceStr}",signature="${signature}",timestamp="${timestamp}",serial_no="${serialNo}"`;

    // 调用微信支付API
    const response = await fetch('https://api.mch.weixin.qq.com/v3/pay/transactions/native', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authorization,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`WeChat Pay API error: ${response.statusText}`);
    }

    const paymentResult = await response.json();

    // 创建支付记录
    const { error: paymentError } = await supabaseClient
      .from('payment_records')
      .insert({
        order_id: orderId,
        amount: amount,
        status: 'pending'
      });

    if (paymentError) {
      throw paymentError;
    }

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
