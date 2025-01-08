import { useState, useEffect } from "react";

export const CartAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(false);

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
    (window as any).showAddToCartAnimation = showAddToCartAnimation;
  }, []);

  return (
    <>
      {/* 添加到购物车的动画元素 */}
      {showAnimation && (
        <div className="fixed z-50 animate-cart-item">
          <div className="w-3 h-3 bg-secondary rounded-full" />
        </div>
      )}
    </>
  );
};