import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useCartCounter = () => {
  const [itemCount, setItemCount] = useState(0);

  const fetchCartItems = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: cartItems, error } = await supabase
          .from('cart_items')
          .select('quantity')
          .eq('user_id', user.id);
        
        if (error) throw error;
        
        const totalQuantity = cartItems?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
        setItemCount(totalQuantity);
      }
    } catch (error) {
      console.error('获取购物车数量失败:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();

    // 监听自定义事件
    const handleCartUpdate = () => {
      fetchCartItems();
    };
    window.addEventListener('cart-updated', handleCartUpdate);

    // 订阅购物车变化
    const channel = supabase
      .channel('cart_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cart_items'
        },
        () => {
          fetchCartItems();
        }
      )
      .subscribe();

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      channel.unsubscribe();
    };
  }, []);

  return itemCount;
};