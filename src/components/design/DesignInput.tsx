import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { PromptInput } from "./options/PromptInput";
import { DESIGN_GUIDELINES } from "./constants/designGuidelines";

interface DesignInputProps {
  frontPrompt: string;
  backPrompt: string;
  isGenerating: boolean;
  onFrontPromptChange: (value: string) => void;
  onBackPromptChange: (value: string) => void;
  onGenerate: (position: "front" | "back") => void;
}

export const DesignInput = ({
  frontPrompt,
  backPrompt,
  isGenerating,
  onFrontPromptChange,
  onBackPromptChange,
  onGenerate,
}: DesignInputProps) => {
  const generatePrompt = (basePrompt: string) => {
    const combinedPrompt = [basePrompt, DESIGN_GUIDELINES]
      .filter(text => text)
      .join('，');

    console.log('最终发送的提示词:', combinedPrompt);
    return combinedPrompt;
  };

  const handleGenerate = (position: "front" | "back") => {
    const prompt = position === "front" ? frontPrompt : backPrompt;
    const finalPrompt = generatePrompt(prompt);
    onGenerate(position);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <CardDescription className="text-center mb-8 text-base">
          描述你的创意想法，可以选择只设计一面，也可以两面都设计
        </CardDescription>
        
        <PromptInput 
          frontPrompt={frontPrompt}
          backPrompt={backPrompt}
          isGenerating={isGenerating}
          onFrontPromptChange={onFrontPromptChange}
          onBackPromptChange={onBackPromptChange}
          onGenerate={handleGenerate}
        />
      </CardContent>
    </Card>
  );
};