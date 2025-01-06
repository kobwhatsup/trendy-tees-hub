import React from "react";
import { DesignPreview } from "../DesignPreview";

interface DesignPreviewStepProps {
  frontDesignImage: string;
  backDesignImage: string;
}

export const DesignPreviewStep = ({
  frontDesignImage,
  backDesignImage
}: DesignPreviewStepProps) => {
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