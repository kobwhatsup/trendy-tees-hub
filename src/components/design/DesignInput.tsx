import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { PromptInput } from "./options/PromptInput";

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
    // 优化后的设计规范
    const designRules = `
设计要求：
1. 主体图案要求：保持主体图案设计简洁大方，突出主要元素，避免复杂和细小的图案元素。避免密集或凌乱的排列。

2. 文字图案要求：只生成文字本身，文字周围的背景为纯黑色或纯白色背景，不要有复杂背景图案。

3. 色彩要求：设计图案色彩对比明显，图案中不超过3种颜色，避免过多色彩。

4. 图案线条要求：使用清晰、粗细适中的线条，最小线条粗度不低于1mm。避免模糊效果，确保图案在不同尺寸下都能清晰呈现。

5. 图案背景要求：主题图案或文字图案的背景图案和元素为纯黑色或纯白色背景，使主体图案更加突出。

6. 图像格式要求：保存图像为支持透明背景的PNG格式。

7. 印刷要求：确保设计适合T恤印刷工艺，生成的图案要能直接印在T恤上。`;

    const combinedPrompt = [basePrompt, designRules]
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