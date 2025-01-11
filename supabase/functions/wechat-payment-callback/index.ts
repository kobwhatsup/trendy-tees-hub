import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// 解密回调数据
async function decryptResource(ciphertext: string, associatedData: string, nonce: string, apiV3Key: string) {
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(apiV3Key),
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );

    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: new TextEncoder().encode(nonce),
        additionalData: new TextEncoder().encode(associatedData),
      },
      key,
      new TextEncoder().encode(ciphertext)
    );

    return new TextDecoder().decode(decrypted);
  } catch (error) {
    console.error('解密回调数据失败:', error);
    throw new Error('解密回调数据失败');
  }
}

// 验证签名
async function verifySignature(headers: Headers, body: string, publicKey: string) {
  try {
    const timestamp = headers.get('Wechatpay-Timestamp');
    const nonce = headers.get('Wechatpay-Nonce');
    const signature = headers.get('Wechatpay-Signature');
    const serial = headers.get('Wechatpay-Serial');

    if (!timestamp || !nonce || !signature || !serial) {
      throw new Error('缺少必要的请求头');
    }

    // 验证证书序列号
    if (serial !== Deno.env.get('WECHAT_PAY_CERT_SERIAL_NO')) {
      throw new Error('证书序列号不匹配');
    }

    // 构造签名字符串
    const message = `${timestamp}\n${nonce}\n${body}\n`;

    // 使用微信支付平台证书公钥验证签名
    const key = await crypto.subtle.importKey(
      "spki",
      new TextEncoder().encode(publicKey),
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256",
      },
      false,
      ["verify"]
    );

    const signatureBytes = new Uint8Array(
      signature.match(/.{2}/g)!.map(byte => parseInt(byte, 16))
    );

    const isValid = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      signatureBytes,
      new TextEncoder().encode(message)
    );

    if (!isValid) {
      throw new Error('签名验证失败');
    }

    return true;
  } catch (error) {
    console.error('签名验证失败:', error);
    throw error;
  }
}

serve(async (req) => {
  // 处理 CORS 预检请求
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('收到微信支付回调');
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 获取原始请求体
    const rawBody = await req.text();
    console.log('回调原始数据:', rawBody);

    // 验证签名
    const publicKey = Deno.env.get('WECHAT_PAY_PUBLIC_KEY') ?? '';
    await verifySignature(req.headers, rawBody, publicKey);
    console.log('签名验证通过');

    // 解析回调数据
    const callbackData = JSON.parse(rawBody);
    console.log('解析后的回调数据:', callbackData);

    // 验证通知数据
    const { resource } = callbackData;
    if (!resource || !resource.ciphertext) {
      throw new Error('回调数据格式错误');
    }

    // 解密通知数据
    const apiV3Key = Deno.env.get('WECHAT_PAY_API_V3_KEY') ?? '';
    const decryptedData = await decryptResource(
      resource.ciphertext,
      resource.associated_data,
      resource.nonce,
      apiV3Key
    );
    console.log('解密后的数据:', decryptedData);

    const paymentInfo = JSON.parse(decryptedData);

    // 验证支付状态
    if (paymentInfo.trade_state !== 'SUCCESS') {
      console.log(`支付状态不是成功: ${paymentInfo.trade_state}`);
      
      // 处理特定的失败状态
      if (['CLOSED', 'PAYERROR', 'REVOKED'].includes(paymentInfo.trade_state)) {
        const { data: order } = await supabaseClient
          .from('orders')
          .select('id')
          .eq('order_number', paymentInfo.out_trade_no)
          .single();

        if (order) {
          // 更新订单状态
          await supabaseClient
            .from('orders')
            .update({ 
              status: 'payment_timeout',
              updated_at: new Date().toISOString()
            })
            .eq('id', order.id);

          // 更新支付记录
          await supabaseClient
            .from('payment_records')
            .update({ 
              status: 'failed',
              updated_at: new Date().toISOString()
            })
            .eq('order_id', order.id);
        }
      }
      
      throw new Error(`支付未成功: ${paymentInfo.trade_state}`);
    }

    // 更新订单状态
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .update({ 
        status: 'paid',
        paid_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('order_number', paymentInfo.out_trade_no)
      .select()
      .single();

    if (orderError) {
      console.error('更新订单状态失败:', orderError);
      throw orderError;
    }

    // 更新支付记录
    const { error: paymentError } = await supabaseClient
      .from('payment_records')
      .update({ 
        status: 'success',
        transaction_id: paymentInfo.transaction_id,
        updated_at: new Date().toISOString()
      })
      .eq('order_id', order.id);

    if (paymentError) {
      console.error('更新支付记录失败:', paymentError);
      throw paymentError;
    }

    console.log('成功处理支付回调，订单号:', order.order_number);

    // 返回成功响应
    return new Response(
      JSON.stringify({
        code: "SUCCESS",
        message: "成功"
      }), 
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('处理支付回调失败:', error);
    return new Response(
      JSON.stringify({ 
        code: "FAIL",
        message: error.message 
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