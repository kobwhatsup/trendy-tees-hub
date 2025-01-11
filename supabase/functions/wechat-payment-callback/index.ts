import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // 解析回调数据
    const callbackData = await req.json();
    console.log('Callback data:', callbackData);

    // 验证通知数据
    const { resource } = callbackData;
    if (!resource || !resource.ciphertext) {
      throw new Error('Invalid callback data format');
    }

    // 解密通知数据
    // TODO: 实现解密逻辑，需要使用商户API证书中的密钥

    // 更新订单状态
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .update({ 
        status: 'paid',
        paid_at: new Date().toISOString()
      })
      .eq('order_number', resource.out_trade_no)
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
        transaction_id: resource.transaction_id,
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