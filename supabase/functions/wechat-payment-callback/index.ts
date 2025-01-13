import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function decryptResource(ciphertext: string, associatedData: string, nonce: string, apiV3Key: string) {
  try {
    console.log('开始解密回调数据');
    console.log('密文:', ciphertext);
    console.log('关联数据:', associatedData);
    console.log('随机数:', nonce);
    
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

    const decryptedText = new TextDecoder().decode(decrypted);
    console.log('解密后的数据:', decryptedText);
    return decryptedText;
  } catch (error) {
    console.error('解密回调数据失败:', error);
    throw error;
  }
}

serve(async (req) => {
  console.log('收到微信支付回调请求');
  console.log('请求方法:', req.method);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const WECHAT_PAY_API_V3_KEY = Deno.env.get('WECHAT_PAY_API_V3_KEY') || '';

    console.log('初始化 Supabase 客户端');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // 获取回调数据
    const payload = await req.json();
    console.log('收到微信支付回调数据:', JSON.stringify(payload));

    // 解密回调数据
    const decryptedData = await decryptResource(
      payload.resource.ciphertext,
      payload.resource.associated_data,
      payload.resource.nonce,
      WECHAT_PAY_API_V3_KEY
    );

    const callbackData = JSON.parse(decryptedData);
    console.log('解密后的回调数据:', JSON.stringify(callbackData));

    if (callbackData.trade_state === 'SUCCESS') {
      console.log('支付状态为成功，开始更新订单状态');
      console.log('商户订单号:', callbackData.out_trade_no);
      
      // 更新订单状态为已支付
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .update({ 
          status: 'processing',  // 更新状态为待发货
          paid_at: new Date().toISOString()
        })
        .eq('order_number', callbackData.out_trade_no)
        .select()
        .single();

      if (orderError) {
        console.error('更新订单状态失败:', orderError);
        throw orderError;
      }

      console.log('订单状态更新成功:', order);

      // 更新支付记录状态
      const { error: paymentError } = await supabase
        .from('payment_records')
        .update({ 
          status: 'success',
          transaction_id: callbackData.transaction_id,
          updated_at: new Date().toISOString()
        })
        .eq('order_id', order.id);

      if (paymentError) {
        console.error('更新支付记录失败:', paymentError);
        throw paymentError;
      }

      console.log('支付记录更新成功');
    } else {
      console.log('支付状态不是成功:', callbackData.trade_state);
    }

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