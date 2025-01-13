import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders, generateSignString, generateSignature, buildAuthorizationHeader, buildRequestBody } from '../_shared/wechat.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { createHash } from "https://deno.land/std@0.168.0/hash/mod.ts";

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
    console.log('开始处理支付请求...');

    const { orderId, amount, description }: WechatPayRequestBody = await req.json();
    console.log('请求参数:', { orderId, amount, description });

    // 获取微信支付配置
    const mchid = Deno.env.get('WECHAT_PAY_MCH_ID');
    const serialNo = Deno.env.get('WECHAT_PAY_CERT_SERIAL_NO');
    const privateKey = Deno.env.get('WECHAT_PAY_PRIVATE_KEY');
    const appId = Deno.env.get('WECHAT_PAY_APP_ID');

    if (!mchid || !serialNo || !privateKey || !appId) {
      console.error('缺少微信支付配置');
      throw new Error('缺少微信支付配置');
    }

    console.log('配置检查完成');

    // 生成随机字符串和时间戳
    const nonceStr = crypto.randomUUID();
    const timestamp = Math.floor(Date.now() / 1000).toString();

    // 构建请求体
    const requestBody = buildRequestBody(
      appId,
      mchid,
      description,
      orderId,
      amount,
      `${Deno.env.get('SUPABASE_URL')}/functions/v1/wechat-payment-callback`,
      req.headers.get('x-real-ip') || '127.0.0.1'
    );

    // 生成签名字符串
    const signStr = generateSignString(
      'POST',
      '/v3/pay/transactions/native',
      timestamp,
      nonceStr,
      JSON.stringify(requestBody)
    );

    console.log('开始生成签名...');
    const signature = await generateSignature(signStr, privateKey);
    console.log('签名生成完成');

    // 构建认证头
    const authorization = buildAuthorizationHeader(
      mchid,
      nonceStr,
      signature,
      timestamp,
      serialNo
    );

    // 调用微信支付API
    console.log('开始调用微信支付API...');
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
    console.log('微信支付API响应:', responseData);

    if (!response.ok) {
      console.error('微信支付API错误:', responseData);
      throw new Error(`微信支付API错误: ${JSON.stringify(responseData)}`);
    }

    // 创建支付记录
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: paymentError } = await supabase
      .from('payment_records')
      .insert({
        order_id: orderId,
        amount: amount / 100, // 转换为元
        status: 'pending'
      });

    if (paymentError) {
      console.error('创建支付记录失败:', paymentError);
      throw paymentError;
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
    console.error('创建微信支付失败:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || '创建支付失败',
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