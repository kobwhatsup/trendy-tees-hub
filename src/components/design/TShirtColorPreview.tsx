import { useState, useEffect } from "react";
import { TShirtImage } from "./preview/TShirtImage";
import { DesignOverlay } from "./preview/DesignOverlay";
import { PreviewDialog } from "./preview/PreviewDialog";
import html2canvas from "html2canvas";

interface TShirtColorPreviewProps {
  designImage: string;
  tshirtStyle: string;
  tshirtColor: string;
  tshirtGender: string;
  position: "front" | "back";
  onPreviewImageChange?: (imageUrl: string) => void;
}

export const TShirtColorPreview = ({
  designImage,
  tshirtStyle,
  tshirtColor,
  tshirtGender,
  position,
  onPreviewImageChange
}: TShirtColorPreviewProps) => {
  const [settings, setSettings] = useState({
    scale: 0.8,
    rotation: 0,
    opacity: 0.9,
    offsetX: 0,
    offsetY: 0,
    position
  });

  const handleSettingChange = (key: keyof typeof settings, value: number | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  useEffect(() => {
    if (designImage && onPreviewImageChange) {
      const previewContainer = document.getElementById(`preview-container-${position}`);
      if (previewContainer) {
        html2canvas(previewContainer).then(canvas => {
          const imageUrl = canvas.toDataURL('image/png');
          onPreviewImageChange(imageUrl);
        });
      }
    }
  }, [designImage, tshirtStyle, tshirtColor, tshirtGender, position, onPreviewImageChange]);

  return (
    <PreviewDialog
      color={tshirtColor}
      style={tshirtStyle}
      gender={tshirtGender}
      designImage={designImage}
      settings={settings}
      onSettingChange={handleSettingChange}
    >
      <div id={`preview-container-${position}`} className="relative w-full aspect-[3/4] bg-white rounded-lg shadow-md overflow-hidden">
        <TShirtImage 
          color={tshirtColor}
          style={tshirtStyle}
          gender={tshirtGender}
          position={position}
        />
        <DesignOverlay 
          designImage={designImage}
          settings={settings}
        />
      </div>
    </PreviewDialog>
  );
};