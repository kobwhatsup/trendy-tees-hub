import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    if (gender === 'male') {
      if (style === 'short') {
        return settings.position === 'front' 
          ? '/01manshortfront.jpeg'  // 男士短袖正面
          : '/02manshortback.jpeg';  // 男士短袖背面
      } else {
        return settings.position === 'front'
          ? '/03manlongfront.jpeg'   // 男士长袖正面
          : '/04manlongback.jpeg';   // 男士长袖背面
      }
    } else {
      if (style === 'short') {
        return settings.position === 'front'
          ? '/05womenshortfront.jpeg'  // 女士短袖正面
          : '/06womenshortback.jpeg';  // 女士短袖背面
      } else {
        return settings.position === 'front'
          ? '/07womenlongfront.jpeg'   // 女士长袖正面
          : '/08womenlongback.jpeg';   // 女士长袖背面
      }
    }
  };

  const PreviewContent = () => (
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full cursor-zoom-in">
          <PreviewContent />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-[90vw] max-h-[90vh] p-4">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full max-h-full overflow-hidden">
            <PreviewContent />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};