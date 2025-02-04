import React from "react";
import { TShirtColorPreview } from "../TShirtColorPreview";

interface DesignSettings {
  scale: number;
  rotation: number;
  opacity: number;
  position: "front" | "back";
  offsetX: number;
  offsetY: number;
}

interface TShirtEffectStepProps {
  frontDesignImage: string;
  backDesignImage: string;
  tshirtStyle: string;
  tshirtColor: string;
  tshirtGender: string;
  onFrontPreviewCapture: (url: string) => void;
  onBackPreviewCapture: (url: string) => void;
  onFrontSettingsChange?: (settings: DesignSettings) => void;
  onBackSettingsChange?: (settings: DesignSettings) => void;
}

export const TShirtEffectStep = ({
  frontDesignImage,
  backDesignImage,
  tshirtStyle,
  tshirtColor,
  tshirtGender,
  onFrontPreviewCapture,
  onBackPreviewCapture,
  onFrontSettingsChange,
  onBackSettingsChange
}: TShirtEffectStepProps) => {
  console.log('TShirtEffectStep - 正面设计图:', frontDesignImage);
  console.log('TShirtEffectStep - T恤样式:', tshirtStyle);
  console.log('TShirtEffectStep - T恤颜色:', tshirtColor);
  console.log('TShirtEffectStep - T恤性别:', tshirtGender);

  return (
    <section className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 w-full text-center py-2 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] text-white">
        第四步 T恤效果
      </h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4 text-center">正面效果</h3>
          <TShirtColorPreview 
            designImage={frontDesignImage}
            tshirtStyle={tshirtStyle}
            tshirtColor={tshirtColor}
            tshirtGender={tshirtGender}
            position="front"
            onPreviewCapture={(url) => {
              console.log('正面效果图生成完成:', url);
              onFrontPreviewCapture(url);
            }}
            onSettingsChange={onFrontSettingsChange}
          />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4 text-center">背面效果</h3>
          <TShirtColorPreview 
            designImage={backDesignImage}
            tshirtStyle={tshirtStyle}
            tshirtColor={tshirtColor}
            tshirtGender={tshirtGender}
            position="back"
            onPreviewCapture={(url) => {
              console.log('背面效果图生成完成:', url);
              onBackPreviewCapture(url);
            }}
            onSettingsChange={onBackSettingsChange}
          />
        </div>
      </div>
    </section>
  );
};