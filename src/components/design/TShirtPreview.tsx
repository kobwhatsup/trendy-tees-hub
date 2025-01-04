import React from "react";

interface TShirtPreviewProps {
  color: string;
  style: string;
  gender: string;
  designImage: string;
  settings?: {
    scale: number;
    rotation: number;
    opacity: number;
    position: "front" | "back";
  };
}

export const TShirtPreview = ({ 
  color, 
  style,
  gender,
  designImage, 
  settings = {
    scale: 1,
    rotation: 0,
    opacity: 1,
    position: "front"
  }
}: TShirtPreviewProps) => {
  // 根据款式、性别和位置选择对应的T恤模板
  const getTemplateUrl = () => {
    const baseUrl = '';
    if (gender === 'male') {
      if (style === 'short') {
        return settings.position === 'front' 
          ? '/01男士短款正面.jpeg'  // 男士短袖正面
          : '/02男士短款背面.jpeg'; // 男士短袖背面
      } else {
        return settings.position === 'front'
          ? '/03男士长款正面.jpeg'  // 男士长袖正面
          : '/04男士长款背面.jpeg'; // 男士长袖背面
      }
    } else {
      if (style === 'short') {
        return settings.position === 'front'
          ? '/05女款短袖正面.jpeg'  // 女士短袖正面
          : '/06女士短款背面.jpeg'; // 女士短袖背面
      } else {
        return settings.position === 'front'
          ? '/07女士长款正面.jpeg'  // 女士长袖正面
          : '/08女士长款背面.jpeg'; // 女士长袖背面
      }
    }
  };

  // 根据颜色应用不同的滤镜效果
  const getColorFilter = () => {
    switch (color) {
      case 'black':
        return 'brightness(0.2) contrast(1.2)';
      case 'white':
        return 'brightness(1) contrast(1)';
      case 'red':
        return 'brightness(0.8) contrast(1.1) sepia(0.3) saturate(5) hue-rotate(320deg)';
      case 'blue':
        return 'brightness(0.8) contrast(1.1) sepia(0.3) saturate(5) hue-rotate(180deg)';
      default:
        return 'brightness(1) contrast(1)';
    }
  };

  return (
    <div className="relative w-full aspect-[3/4] bg-white rounded-lg shadow-md overflow-hidden">
      {/* T恤背景图片 */}
      <img 
        src={getTemplateUrl()}
        alt="T恤模板"
        className="absolute inset-0 w-full h-full object-contain"
        style={{ 
          filter: getColorFilter()
        }}
      />
      
      {/* 设计图案 */}
      {designImage && (
        <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/2 flex items-center justify-center">
          <img
            src={designImage}
            alt="T恤设计"
            className="max-w-full max-h-full object-contain transition-all duration-200"
            style={{
              transform: `scale(${settings.scale}) rotate(${settings.rotation}deg)`,
              opacity: settings.opacity,
            }}
          />
        </div>
      )}
    </div>
  );
};