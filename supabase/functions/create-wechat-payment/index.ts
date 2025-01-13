import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { generateSignature, createPaymentRecord } from '../_shared/wechat.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // 处理 CORS 预检请求
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, amount, description } = await req.json();
    console.log('收到支付请求:', { orderId, amount, description });

    // 获取必要的配置
    const mchid = Deno.env.get('WECHAT_PAY_MCH_ID');
    const appid = Deno.env.get('WECHAT_PAY_APP_ID');
    const privateKey = Deno.env.get('WECHAT_PAY_PRIVATE_KEY');
    const serialNo = Deno.env.get('WECHAT_PAY_CERT_SERIAL_NO');

    if (!mchid || !appid || !privateKey || !serialNo) {
      throw new Error('缺少必要的配置参数');
    }

    // 准备请求数据
    const url = '/v3/pay/transactions/native';
    const host = 'api.mch.weixin.qq.com';
    const method = 'POST';
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonce = crypto.randomUUID();

    const requestBody = JSON.stringify({
      mchid,
      appid,
      description,
      out_trade_no: orderId,
      notify_url: `https://gfraqpwyfxmpzdllsfoc.supabase.co/functions/v1/wechat-payment-callback`,
      amount: {
        total: amount,
        currency: 'CNY'
      }
    });

    // 生成签名
    const signature = await generateSignature(
      method,
      url,
      timestamp,
      nonce,
      requestBody,
      privateKey
    );

    // 构造认证头
    const token = `WECHATPAY2-SHA256-RSA2048 mchid="${mchid}",nonce_str="${nonce}",timestamp="${timestamp}",serial_no="${serialNo}",signature="${signature}"`;

    // 发送请求到微信支付API
    const response = await fetch(`https://${host}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)',
      },
      body: requestBody
    });

    const responseData = await response.json();
    console.log('微信支付API响应:', responseData);

    if (!response.ok) {
      throw new Error(`微信支付API错误: ${JSON.stringify(responseData)}`);
    }

    // 创建支付记录
    await createPaymentRecord(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      orderId,
      amount
    );

    return new Response(
      JSON.stringify(responseData),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('处理支付请求失败:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
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