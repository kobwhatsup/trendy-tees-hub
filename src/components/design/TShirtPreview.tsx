import React from "react";

interface TShirtPreviewProps {
  color: string;
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
  designImage, 
  settings = {
    scale: 1,
    rotation: 0,
    opacity: 1,
    position: "front"
  }
}: TShirtPreviewProps) => (
  <div className="relative w-full aspect-[3/4] bg-white rounded-lg shadow-md overflow-hidden">
    <div 
      className="absolute inset-0 transition-colors"
      style={{ backgroundColor: color }}
    >
      {/* T恤轮廓 */}
      <div className="absolute inset-0 bg-[url('/t-shirt-template.png')] bg-contain bg-center bg-no-repeat opacity-10" />
      
      {/* 设计图案 */}
      {designImage && settings.position === "front" && (
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
      
      {/* 背面设计 */}
      {designImage && settings.position === "back" && (
        <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/2 flex items-center justify-center">
          <img
            src={designImage}
            alt="T恤背面设计"
            className="max-w-full max-h-full object-contain transition-all duration-200"
            style={{
              transform: `scale(${settings.scale}) rotate(${settings.rotation}deg)`,
              opacity: settings.opacity,
            }}
          />
        </div>
      )}
    </div>
  </div>
);