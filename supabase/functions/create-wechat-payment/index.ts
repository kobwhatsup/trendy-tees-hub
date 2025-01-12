import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders, generateSignString, generateSignature, buildAuthorizationHeader, buildRequestBody } from '../_shared/wechat.ts'
import { createPaymentRecord } from '../_shared/payment.ts'

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
    console.log('开始处理支付请求...');

    const { orderId, amount, description }: WechatPayRequestBody = await req.json();
    console.log('请求参数:', { orderId, amount, description });

    // 获取微信支付配置
    const mchid = Deno.env.get('WECHAT_PAY_MCH_ID');
    const serialNo = Deno.env.get('WECHAT_PAY_CERT_SERIAL_NO');
    const privateKey = Deno.env.get('WECHAT_PAY_PRIVATE_KEY');
    const appId = Deno.env.get('WECHAT_PAY_APP_ID');

    if (!mchid || !serialNo || !privateKey || !appId) {
      console.error('缺少微信支付配置:', { mchid, serialNo, appId });
      throw new Error('缺少微信支付配置');
    }

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

    console.log('请求体:', JSON.stringify(requestBody, null, 2));

    // 生成签名
    const signStr = generateSignString('POST', '/v3/pay/transactions/native', timestamp, nonceStr, requestBody);
    console.log('签名字符串:', signStr);

    try {
      // 生成签名
      const signature = await generateSignature(signStr, privateKey);
      console.log('签名生成完成');

      // 构建认证头
      const authorization = buildAuthorizationHeader(mchid, nonceStr, signature, timestamp, serialNo);
      console.log('认证头构建完成');

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
        throw new Error(`微信支付API错误: ${responseData.message || response.statusText}`);
      }

      // 创建支付记录
      await createPaymentRecord(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
        orderId,
        amount
      );

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
      console.error('处理支付请求时发生错误:', error);
      throw error;
    }

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