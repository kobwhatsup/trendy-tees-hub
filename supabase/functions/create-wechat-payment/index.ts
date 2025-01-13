import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { generateSignature, createPaymentRecord } from '../_shared/wechat.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, amount, description } = await req.json();
    console.log('收到支付请求:', { orderId, amount, description });

    const mchid = Deno.env.get('WECHAT_PAY_MCH_ID');
    const appid = Deno.env.get('WECHAT_PAY_APP_ID');
    const privateKey = Deno.env.get('WECHAT_PAY_PRIVATE_KEY');
    const serialNo = Deno.env.get('WECHAT_PAY_CERT_SERIAL_NO');

    if (!mchid || !appid || !privateKey || !serialNo) {
      throw new Error('缺少必要的配置参数');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select('order_number')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      throw new Error('获取订单信息失败');
    }

    console.log('获取到的订单号:', order.order_number);

    // 准备请求数据
    const url = '/v3/pay/transactions/native';
    const host = 'api.mch.weixin.qq.com';
    const method = 'POST';
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonce = crypto.randomUUID();

    // 确保回调URL使用完整的域名
    const callbackUrl = `https://gfraqpwyfxmpzdllsfoc.supabase.co/functions/v1/wechat-payment-callback`;
    console.log('回调URL:', callbackUrl);

    const requestBody = JSON.stringify({
      mchid,
      appid,
      description,
      out_trade_no: order.order_number,
      notify_url: callbackUrl,
      amount: {
        total: amount,
        currency: 'CNY'
      }
    });

    console.log('请求参数:', requestBody);

    const signature = await generateSignature(
      method,
      url,
      timestamp,
      nonce,
      requestBody,
      privateKey
    );

    const token = `WECHATPAY2-SHA256-RSA2048 mchid="${mchid}",nonce_str="${nonce}",timestamp="${timestamp}",serial_no="${serialNo}",signature="${signature}"`;

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