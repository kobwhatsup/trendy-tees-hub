import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CartItemType } from "@/types/cart";
import { AddressType } from "../../address/types";
import { generateOrderNumber } from "../utils/orderNumber";

export const useOrderCreation = (items: CartItemType[], total: number) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const createOrder = async (addressInfo: AddressType | null) => {
    if (!addressInfo) return;
    
    try {
      setIsProcessing(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("用户未登录");

      const orderNumber = generateOrderNumber();
      console.log('生成的订单号:', orderNumber);

      // 创建订单，包含收货地址信息
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          total_amount: total,
          status: 'pending_payment',
          shipping_address: addressInfo.address,
          recipient_name: addressInfo.recipient_name,
          recipient_phone: addressInfo.phone
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 创建订单项
      const orderItems = items.map(item => ({
        order_id: order.id,
        design_front: item.design_front,
        design_back: item.design_back,
        preview_front: item.preview_front,
        preview_back: item.preview_back,
        tshirt_style: item.tshirt_style,
        tshirt_color: item.tshirt_color,
        tshirt_gender: item.tshirt_gender,
        tshirt_size: item.tshirt_size,
        quantity: item.quantity,
        unit_price: 0.01
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 删除已购买的购物车商品
      const cartItemIds = items.map(item => item.id);
      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .in('id', cartItemIds);

      if (deleteError) throw deleteError;

      // 触发购物车更新事件
      window.dispatchEvent(new Event('cart-updated'));

      // 创建支付
      try {
        console.log('开始创建支付，参数:', {
          orderId: order.id,
          orderNumber: orderNumber,
          amount: Math.round(total * 100),
          description: `订单支付 #${orderNumber}`
        });

        const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-wechat-payment', {
          body: {
            orderId: order.id,
            orderNumber: orderNumber,
            amount: Math.round(total * 100), // 转换为分
            description: `订单支付 #${orderNumber}`,
            out_trade_no: orderNumber // 确保传递商户订单号
          }
        });

        if (paymentError) throw paymentError;

        console.log('支付创建成功，返回数据:', paymentData);

        setOrderId(order.id);
        setQrCodeUrl(paymentData.code_url);
        return { orderId: order.id, qrCodeUrl: paymentData.code_url };

      } catch (error) {
        console.error('创建支付失败:', error);
        navigate('/orders');
        toast({
          title: "创建支付失败",
          description: "订单已创建，请在订单页面重新发起支付",
          variant: "destructive",
        });
        return null;
      }

    } catch (error) {
      console.error('创建订单失败:', error);
      toast({
        title: "创建订单失败",
        description: "请稍后重试",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    orderId,
    qrCodeUrl,
    createOrder
  };
};