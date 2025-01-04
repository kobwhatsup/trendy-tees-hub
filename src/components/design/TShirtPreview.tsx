import React from "react";

interface TShirtPreviewProps {
  color: string;
  style: string;
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
  designImage, 
  settings = {
    scale: 1,
    rotation: 0,
    opacity: 1,
    position: "front"
  }
}: TShirtPreviewProps) => {
  // 根据款式和位置选择对应的T恤模板
  const getTemplateUrl = () => {
    if (style === 'short') {
      return settings.position === 'front' 
        ? '/01男士短款正面.jpeg'  // 短袖正面
        : '/02男士短款背面.jpeg'; // 短袖背面
    } else {
      return settings.position === 'front'
        ? '/03男士长款正面.jpeg'  // 长袖正面
        : '/04男士长款背面.jpeg'; // 长袖背面
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
          filter: `brightness(${color === 'white' ? 1 : 0.8}) 
                  contrast(${color === 'white' ? 1 : 0.9})
                  saturate(${color === 'white' ? 1 : 0.8})`
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