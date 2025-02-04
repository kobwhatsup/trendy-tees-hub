import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export const CartAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const { toast } = useToast();

  // 播放添加到购物车的声音
  const playAddToCartSound = () => {
    const audio = new Audio('/cart-sound.mp3');
    audio.play().catch(() => {
      console.log('Sound autoplay blocked');
    });
  };

  // 显示动画和提示
  const showAddToCartAnimation = () => {
    setShowAnimation(true);
    playAddToCartSound();
    
    // 显示成功提示，使用渐变背景
    toast({
      title: "添加成功",
      description: "商品已成功添加到购物车",
      className: "bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] text-white border-none animate-in slide-in-from-bottom-2",
    });
    
    // 1秒后隐藏动画
    setTimeout(() => setShowAnimation(false), 1000);
  };

  // 暴露全局方法供其他组件调用
  useEffect(() => {
    (window as any).showAddToCartAnimation = showAddToCartAnimation;
    return () => {
      (window as any).showAddToCartAnimation = undefined;
    };
  }, []);

  if (!showAnimation) return null;

  return (
    <div className="fixed z-50 animate-cart-item">
      <div className="w-4 h-4 bg-primary rounded-full shadow-lg animate-pulse" />
    </div>
  );
};