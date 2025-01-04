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
    offsetX: number;  
    offsetY: number;  
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
    position: "front",
    offsetX: 0,
    offsetY: 0
  }
}: TShirtPreviewProps) => {
  const getTemplateUrl = () => {
    // 构建完整的图片URL路径
    const basePath = window.location.origin + '/';
    
    if (gender === 'male') {
      if (style === 'short') {
        return settings.position === 'front' 
          ? basePath + '01男士短款正面.jpeg'  // 男士短袖正面
          : basePath + '02男士短款背面.jpeg'; // 男士短袖背面
      } else {
        return settings.position === 'front'
          ? basePath + '03男士长款正面.jpeg'  // 男士长袖正面
          : basePath + '04男士长款背面.jpeg'; // 男士长袖背面
      }
    } else {
      if (style === 'short') {
        return settings.position === 'front'
          ? basePath + '05女款短袖正面.jpeg'  // 女士短袖正面
          : basePath + '06女士短款背面.jpeg'; // 女士短袖背面
      } else {
        return settings.position === 'front'
          ? basePath + '07女士长款正面.jpeg'  // 女士长袖正面
          : basePath + '08女士长款背面.jpeg'; // 女士长袖背面
      }
    }
  };

  // 添加调试日志
  console.log('Template URL:', getTemplateUrl());
  console.log('Current origin:', window.location.origin);

  return (
    <div className="relative w-full aspect-[3/4] bg-white rounded-lg shadow-md overflow-hidden">
      {/* T恤背景图片 */}
      <img 
        src={getTemplateUrl()}
        alt="T恤模板"
        className="absolute inset-0 w-full h-full object-contain"
        style={{ 
          filter: `brightness(${color === 'white' ? 1 : 0.8}) 
                  contrast(${color === 'white' ? 1 : 0.9})
                  saturate(${color === 'white' ? 1 : 0.8})`
        }}
      />
      
      {/* 设计图案 */}
      {designImage && (
        <div 
          className="absolute top-1/4 left-1/4 right-1/4 bottom-1/2 flex items-center justify-center"
          style={{
            transform: `translateX(${settings.offsetX}px) translateY(${settings.offsetY}px)`
          }}
        >
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