import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// 解密回调数据
async function decryptResource(ciphertext: string, associatedData: string, nonce: string) {
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(Deno.env.get('WECHAT_PAY_API_V2_KEY')),
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
    console.error('Error decrypting resource:', error);
    throw new Error('Failed to decrypt callback data');
  }
}

// 验证签名
async function verifySignature(headers: Headers, body: string) {
  try {
    const timestamp = headers.get('Wechatpay-Timestamp');
    const nonce = headers.get('Wechatpay-Nonce');
    const signature = headers.get('Wechatpay-Signature');
    const serial = headers.get('Wechatpay-Serial');

    if (!timestamp || !nonce || !signature || !serial) {
      throw new Error('Missing required headers');
    }

    // 验证证书序列号
    if (serial !== Deno.env.get('WECHAT_PAY_CERT_SERIAL_NO')) {
      throw new Error('Invalid certificate serial number');
    }

    // 构造签名字符串
    const message = `${timestamp}\n${nonce}\n${body}\n`;

    // 使用微信支付平台证书公钥验证签名
    const publicKey = await crypto.subtle.importKey(
      "spki",
      new TextEncoder().encode(Deno.env.get('WECHAT_PAY_PUBLIC_KEY')),
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
      publicKey,
      signatureBytes,
      new TextEncoder().encode(message)
    );

    if (!isValid) {
      throw new Error('Invalid signature');
    }

    return true;
  } catch (error) {
    console.error('Error verifying signature:', error);
    throw new Error('Signature verification failed');
  }
}

// 处理支付超时
async function handlePaymentTimeout(supabaseClient: any, orderId: string) {
  try {
    // 更新订单状态为支付超时
    const { error: orderError } = await supabaseClient
      .from('orders')
      .update({ 
        status: 'payment_timeout',
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId);

    if (orderError) throw orderError;

    // 更新支付记录状态
    const { error: paymentError } = await supabaseClient
      .from('payment_records')
      .update({ 
        status: 'timeout',
        updated_at: new Date().toISOString()
      })
      .eq('order_id', orderId);

    if (paymentError) throw paymentError;

    console.log('Payment timeout handled for order:', orderId);
  } catch (error) {
    console.error('Error handling payment timeout:', error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received WeChat payment callback');
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 获取原始请求体
    const rawBody = await req.text();
    console.log('Raw callback body:', rawBody);

    // 验证签名
    await verifySignature(req.headers, rawBody);

    // 解析回调数据
    const callbackData = JSON.parse(rawBody);
    console.log('Parsed callback data:', callbackData);

    // 验证通知数据
    const { resource } = callbackData;
    if (!resource || !resource.ciphertext) {
      throw new Error('Invalid callback data format');
    }

    // 解密通知数据
    const decryptedData = await decryptResource(
      resource.ciphertext,
      resource.associated_data,
      resource.nonce
    );
    console.log('Decrypted data:', decryptedData);

    const paymentInfo = JSON.parse(decryptedData);

    // 验证支付状态
    if (paymentInfo.trade_state !== 'SUCCESS') {
      // 如果支付失败且超时，则处理支付超时
      if (paymentInfo.trade_state === 'CLOSED' || paymentInfo.trade_state === 'PAYERROR') {
        const { data: order } = await supabaseClient
          .from('orders')
          .select('id')
          .eq('order_number', paymentInfo.out_trade_no)
          .single();

        if (order) {
          await handlePaymentTimeout(supabaseClient, order.id);
        }
      }
      throw new Error(`Payment not successful: ${paymentInfo.trade_state}`);
    }

    // 更新订单状态
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .update({ 
        status: 'paid',
        paid_at: new Date().toISOString()
      })
      .eq('order_number', paymentInfo.out_trade_no)
      .select()
      .single();

    if (orderError) {
      console.error('Error updating order:', orderError);
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
      console.error('Error updating payment record:', paymentError);
      throw paymentError;
    }

    console.log('Successfully processed payment callback for order:', order.order_number);

    // 返回成功响应
    return new Response(
      JSON.stringify({ code: "SUCCESS", message: "成功" }), 
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error processing payment callback:', error);
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