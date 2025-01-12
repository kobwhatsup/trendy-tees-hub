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
    console.log('开始处理支付请求...');
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

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

    console.log('请求体:', JSON.stringify(requestBody, null, 2));

    // 生成签名
    const method = 'POST';
    const url = '/v3/pay/transactions/native';
    const signStr = `${method}\n${url}\n${timestamp}\n${nonceStr}\n${JSON.stringify(requestBody)}\n`;
    
    console.log('签名字符串:', signStr);

    try {
      // 处理私钥格式
      let formattedPrivateKey = privateKey;
      if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
        formattedPrivateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
      }
      console.log('私钥格式化完成');

      // 将私钥转换为二进制格式
      const binaryKey = new TextEncoder().encode(formattedPrivateKey);
      console.log('私钥转换为二进制完成');

      // 导入私钥
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
      console.log('私钥导入完成');

      // 签名
      const signatureBytes = await crypto.subtle.sign(
        "RSASSA-PKCS1-v1_5",
        key,
        new TextEncoder().encode(signStr)
      );
      console.log('签名生成完成');

      const base64Signature = btoa(String.fromCharCode(...new Uint8Array(signatureBytes)));
      console.log('签名Base64编码完成');

      // 构建认证头
      const authorization = `WECHATPAY2-SHA256-RSA2048 mchid="${mchid}",nonce_str="${nonceStr}",signature="${base64Signature}",timestamp="${timestamp}",serial_no="${serialNo}"`;
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
      const { error: paymentError } = await supabaseClient
        .from('payment_records')
        .insert({
          order_id: orderId,
          amount: amount / 100, // 转换回元
          status: 'pending'
        });

      if (paymentError) {
        console.error('创建支付记录失败:', paymentError);
        throw new Error('创建支付记录失败');
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