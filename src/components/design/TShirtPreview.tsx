import React from "react";

interface TShirtPreviewProps {
  color: string;
  designImage: string;
}

export const TShirtPreview = ({ color, designImage }: TShirtPreviewProps) => (
  <div className="relative w-full aspect-[3/4] bg-white rounded-lg shadow-md overflow-hidden">
    <div 
      className="absolute inset-0 transition-colors"
      style={{ backgroundColor: color }}
    >
      {/* T恤轮廓 */}
      <div className="absolute inset-0 bg-[url('/t-shirt-template.png')] bg-contain bg-center bg-no-repeat opacity-10" />
      
      {/* 设计图案 */}
      {designImage && (
        <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/2 flex items-center justify-center">
          <img
            src={designImage}
            alt="T恤设计"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  </div>
);