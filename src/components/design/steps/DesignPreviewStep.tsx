import React, { useEffect } from "react";
import { DesignPreview } from "../DesignPreview";

interface DesignPreviewStepProps {
  frontDesignImage: string;
  backDesignImage: string;
  onDesignImagesChange?: (frontImage: string, backImage: string) => void;
}

export const DesignPreviewStep = ({
  frontDesignImage,
  backDesignImage,
  onDesignImagesChange
}: DesignPreviewStepProps) => {
  useEffect(() => {
    // 检查是否有重用的设计图
    const reusedDesignStr = localStorage.getItem('reusedDesign');
    if (reusedDesignStr && onDesignImagesChange) {
      const reusedDesign = JSON.parse(reusedDesignStr);
      onDesignImagesChange(reusedDesign.design_front, reusedDesign.design_back);
      // 使用后清除localStorage中的数据
      localStorage.removeItem('reusedDesign');
    }
  }, [onDesignImagesChange]);

  return (
    <section className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 w-full text-center py-2 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] text-white">
        第二步 设计预览
      </h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <DesignPreview designImage={frontDesignImage} title="正面设计" />
        <DesignPreview designImage={backDesignImage} title="背面设计" />
      </div>
    </section>
  );
};