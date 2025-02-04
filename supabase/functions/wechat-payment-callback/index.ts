import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { createDecipheriv } from "https://deno.land/std@0.208.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // 解析回调数据
    const callbackData = JSON.parse(rawBody);
    console.log('解析后的回调数据:', callbackData);

    // 验证通知数据
    const { resource } = callbackData;
    if (!resource || !resource.ciphertext) {
      console.error('回调数据格式错误');
      throw new Error('回调数据格式错误');
    }

    // 解密通知数据
    const apiV3Key = Deno.env.get('WECHAT_PAY_API_V3_KEY') ?? '';
    if (!apiV3Key) {
      console.error('未找到 WECHAT_PAY_API_V3_KEY');
      throw new Error('未找到 WECHAT_PAY_API_V3_KEY');
    }

    try {
      // 将 APIv3 密钥转换为 Buffer
      const key = new TextEncoder().encode(apiV3Key);
      
      // 解密
      const algorithm = { name: "AES-GCM", iv: new TextEncoder().encode(resource.nonce) };
      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        key,
        algorithm,
        false,
        ["decrypt"]
      );
      
      const ciphertext = new TextEncoder().encode(resource.ciphertext);
      const decrypted = await crypto.subtle.decrypt(
        algorithm,
        cryptoKey,
        ciphertext
      );

      const decryptedText = new TextDecoder().decode(decrypted);
      console.log('解密后的数据:', decryptedText);
      
      const paymentInfo = JSON.parse(decryptedText);

      // 根据商户订单号查询订单
      const { data: order, error: orderError } = await supabaseClient
        .from('orders')
        .select('id, status')
        .eq('order_number', paymentInfo.out_trade_no)
        .single();

      if (orderError || !order) {
        console.error('未找到订单:', paymentInfo.out_trade_no);
        throw new Error(`未找到订单: ${paymentInfo.out_trade_no}`);
      }

      // 验证支付状态
      if (paymentInfo.trade_state === 'SUCCESS') {
        console.log('支付成功，更新订单状态');
        
        // 更新订单状态
        const { error: updateOrderError } = await supabaseClient
          .from('orders')
          .update({ 
            status: 'paid',
            paid_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', order.id);

        if (updateOrderError) {
          console.error('更新订单状态失败:', updateOrderError);
          throw updateOrderError;
        }

        // 更新支付记录
        const { error: updatePaymentError } = await supabaseClient
          .from('payment_records')
          .update({ 
            status: 'success',
            transaction_id: paymentInfo.transaction_id,
            updated_at: new Date().toISOString()
          })
          .eq('order_id', order.id);

        if (updatePaymentError) {
          console.error('更新支付记录失败:', updatePaymentError);
          throw updatePaymentError;
        }

        console.log('成功处理支付回调，订单号:', paymentInfo.out_trade_no);
      } else {
        console.log(`支付未成功: ${paymentInfo.trade_state}`);
        
        // 更新订单状态
        const { error: updateOrderError } = await supabaseClient
          .from('orders')
          .update({ 
            status: 'payment_failed',
            updated_at: new Date().toISOString()
          })
          .eq('id', order.id);

        if (updateOrderError) {
          console.error('更新订单状态失败:', updateOrderError);
          throw updateOrderError;
        }

        // 更新支付记录
        const { error: updatePaymentError } = await supabaseClient
          .from('payment_records')
          .update({ 
            status: 'failed',
            updated_at: new Date().toISOString()
          })
          .eq('order_id', order.id);

        if (updatePaymentError) {
          console.error('更新支付记录失败:', updatePaymentError);
          throw updatePaymentError;
        }
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

    } catch (decryptError) {
      console.error('解密回调数据失败:', decryptError);
      throw new Error('解密回调数据失败: ' + decryptError.message);
    }

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