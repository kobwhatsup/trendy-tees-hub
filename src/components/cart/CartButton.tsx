import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const CartButton = () => {
  const navigate = useNavigate();
  const [itemCount, setItemCount] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  
  // 监听购物车数量变化
  useEffect(() => {
    const fetchCartItems = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: cartItems } = await supabase
          .from('cart_items')
          .select('id')
          .eq('user_id', user.id);
        setItemCount(cartItems?.length || 0);
      }
    };

    fetchCartItems();

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
      channel.unsubscribe();
    };
  }, []);

  // 播放添加到购物车的声音
  const playAddToCartSound = () => {
    const audio = new Audio('/cart-sound.mp3');
    audio.play();
  };

  // 显示动画
  const showAddToCartAnimation = () => {
    setShowAnimation(true);
    playAddToCartSound();
    setTimeout(() => setShowAnimation(false), 1000);
  };

  // 暴露全局方法供其他组件调用
  useEffect(() => {
    window.showAddToCartAnimation = showAddToCartAnimation;
  }, []);
  
  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon"
        className="relative"
        onClick={() => navigate("/cart")}
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>
      
      {/* 添加到购物车的动画元素 */}
      {showAnimation && (
        <div className="fixed z-50 animate-cart-item">
          <div className="w-3 h-3 bg-secondary rounded-full" />
        </div>
      )}
    </div>
  );
};