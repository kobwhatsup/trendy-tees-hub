import React from "react";
import { DesignInput } from "../DesignInput";

interface DesignDescriptionProps {
  frontPrompt: string;
  backPrompt: string;
  isGenerating: boolean;
  onFrontPromptChange: (value: string) => void;
  onBackPromptChange: (value: string) => void;
  onGenerate: (position: "front" | "back") => void;
}

export const DesignDescription = ({
  frontPrompt,
  backPrompt,
  isGenerating,
  onFrontPromptChange,
  onBackPromptChange,
  onGenerate
}: DesignDescriptionProps) => {
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 w-full text-center py-2 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] text-white">
        第一步 设计描述
      </h2>
      <div className="w-full">
        <DesignInput
          frontPrompt={frontPrompt}
          backPrompt={backPrompt}
          isGenerating={isGenerating}
          onFrontPromptChange={onFrontPromptChange}
          onBackPromptChange={onBackPromptChange}
          onGenerate={onGenerate}
        />
      </div>
    </section>
  );
};