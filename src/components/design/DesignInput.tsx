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
1. 图案要简洁大方，避免复杂和细小的图案元素
2. 设计必须具有完全透明的背景，不要带有任何背景色或方形边框
3. 如果设计包含文字，只生成文字本身的设计，不要添加任何装饰性背景
4. 使用2-3种主要颜色，避免过多色彩
5. 图案边缘要清晰，避免模糊效果
6. 主体元素要突出且居中
7. 避免过于密集或凌乱的排列
8. 图案大小适中，建议不超过25x30厘米
9. 线条粗细要适中，最小线条粗度不低于0.5mm
10. 确保设计适合T恤印刷工艺，生成的图案要能直接印在T恤上`;

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