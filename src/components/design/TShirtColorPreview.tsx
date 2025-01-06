import React, { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

interface TShirtColorPreviewProps {
  designImage?: string;
  tshirtStyle: string;
  tshirtColor: string;
  tshirtGender: string;
  position: "front" | "back";
  onPreviewUpdate?: (imageUrl: string) => void;
}

export const TShirtColorPreview = ({
  designImage,
  tshirtStyle,
  tshirtColor,
  tshirtGender,
  position,
  onPreviewUpdate
}: TShirtColorPreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);

  // 获取T恤图片路径
  const getTshirtImage = () => {
    const style = tshirtStyle === "short" ? "short" : "long";
    const gender = tshirtGender === "male" ? "man" : "women";
    const pos = position === "front" ? "front" : "back";
    const color = tshirtColor.toLowerCase();
    
    return `/${gender}${style}${pos}${color}.jpeg`;
  };

  useEffect(() => {
    const capturePreview = async () => {
      if (previewRef.current && onPreviewUpdate) {
        try {
          const canvas = await html2canvas(previewRef.current, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: null
          });
          const imageUrl = canvas.toDataURL('image/png');
          onPreviewUpdate(imageUrl);
        } catch (error) {
          console.error('Error capturing preview:', error);
        }
      }
    };

    capturePreview();
  }, [designImage, tshirtStyle, tshirtColor, tshirtGender, position, onPreviewUpdate]);

  return (
    <div ref={previewRef} className="relative w-full aspect-[3/4] bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={getTshirtImage()}
        alt={`${position} view`}
        className="w-full h-full object-contain"
        crossOrigin="anonymous"
      />
      {designImage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={designImage}
            alt="design"
            className="w-1/2 h-auto object-contain"
            style={{
              filter: tshirtColor === 'black' ? 'invert(1)' : 'none'
            }}
            crossOrigin="anonymous"
          />
        </div>
      )}
    </div>
  );
};