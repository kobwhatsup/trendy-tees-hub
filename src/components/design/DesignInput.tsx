import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { StyleOptions, styleOptions } from "./options/StyleOptions";
import { ColorOptions, colorOptions } from "./options/ColorOptions";
import { ThemeOptions, themeOptions } from "./options/ThemeOptions";
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
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  const toggleOption = (
    option: string,
    selectedOptions: string[],
    setSelectedOptions: (options: string[]) => void
  ) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const generatePrompt = (basePrompt: string) => {
    const styleText = selectedStyles.length > 0
      ? `风格：${selectedStyles.map(style => 
          styleOptions.find(opt => opt.value === style)?.label
        ).join('、')}`
      : '';
    
    const colorText = selectedColors.length > 0
      ? `色调：${selectedColors.map(color => 
          colorOptions.find(opt => opt.value === color)?.label
        ).join('、')}`
      : '';
    
    const themeText = selectedThemes.length > 0
      ? `主题：${selectedThemes.map(theme => 
          themeOptions.find(opt => opt.value === theme)?.label
        ).join('、')}`
      : '';

    const designRules = "设计要求：图案要简洁清晰,避免大面积填充和复杂渐变,主体元素突出,细节适中,适合T恤印制工艺,确保印刷效果持久";

    const combinedPrompt = [basePrompt, styleText, colorText, themeText, designRules]
      .filter(text => text)
      .join('，');

    return combinedPrompt;
  };

  const handleGenerate = (position: "front" | "back") => {
    const prompt = position === "front" ? frontPrompt : backPrompt;
    const finalPrompt = generatePrompt(prompt);
    console.log('最终发送的提示词:', finalPrompt);
    onGenerate(position);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <CardDescription className="text-center mb-8 text-base">
          选择设计风格和元素，或直接描述你的创意想法。可以选择只设计一面，也可以两面都设计
        </CardDescription>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-8">
            <StyleOptions 
              selectedStyles={selectedStyles}
              onToggleStyle={(style) => toggleOption(style, selectedStyles, setSelectedStyles)}
            />
            
            <ColorOptions 
              selectedColors={selectedColors}
              onToggleColor={(color) => toggleOption(color, selectedColors, setSelectedColors)}
            />
            
            <ThemeOptions 
              selectedThemes={selectedThemes}
              onToggleTheme={(theme) => toggleOption(theme, selectedThemes, setSelectedThemes)}
            />
          </div>

          <PromptInput 
            frontPrompt={frontPrompt}
            backPrompt={backPrompt}
            isGenerating={isGenerating}
            onFrontPromptChange={onFrontPromptChange}
            onBackPromptChange={onBackPromptChange}
            onGenerate={handleGenerate}
          />
        </div>
      </CardContent>
    </Card>
  );
};