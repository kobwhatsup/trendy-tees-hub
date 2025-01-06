import React from "react";
import { TShirtColorPreview } from "../TShirtColorPreview";

interface TShirtEffectStepProps {
  frontDesignImage: string;
  backDesignImage: string;
  tshirtStyle: string;
  tshirtColor: string;
  tshirtGender: string;
  onFrontPreviewCapture: (url: string) => void;
  onBackPreviewCapture: (url: string) => void;
}

export const TShirtEffectStep = ({
  frontDesignImage,
  backDesignImage,
  tshirtStyle,
  tshirtColor,
  tshirtGender,
  onFrontPreviewCapture,
  onBackPreviewCapture
}: TShirtEffectStepProps) => {
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
            onPreviewCapture={onFrontPreviewCapture}
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
            onPreviewCapture={onBackPreviewCapture}
          />
        </div>
      </div>
    </section>
  );
};