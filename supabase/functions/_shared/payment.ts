import { createClient } from '@supabase/supabase-js';

// 创建支付记录
export const createPaymentRecord = async (
  supabaseUrl: string,
  supabaseKey: string,
  orderId: string,
  amount: number
) => {
  const supabaseClient = createClient(supabaseUrl, supabaseKey);
  
  const { error } = await supabaseClient
    .from('payment_records')
    .insert({
      order_id: orderId,
      amount: amount / 100, // 转换回元
      status: 'pending'
    });

  if (error) {
    console.error('创建支付记录失败:', error);
    throw new Error('创建支付记录失败');
  }
};