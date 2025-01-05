import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Wand2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface StyleOption {
  label: string;
  value: string;
}

const styleOptions: StyleOption[] = [
  { label: "写实", value: "realistic" },
  { label: "卡通", value: "cartoon" },
  { label: "抽象", value: "abstract" },
  { label: "极简", value: "minimalist" },
  { label: "复古", value: "vintage" },
  { label: "未来", value: "futuristic" },
];

const colorOptions: StyleOption[] = [
  { label: "明亮", value: "bright" },
  { label: "暗色", value: "dark" },
  { label: "柔和", value: "soft" },
  { label: "对比强", value: "high-contrast" },
  { label: "单色", value: "monochrome" },
  { label: "渐变", value: "gradient" },
];

const themeOptions: StyleOption[] = [
  { label: "自然", value: "nature" },
  { label: "科技", value: "tech" },
  { label: "动物", value: "animals" },
  { label: "几何", value: "geometric" },
  { label: "艺术", value: "art" },
  { label: "文字", value: "typography" },
];

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

    const combinedPrompt = [basePrompt, styleText, colorText, themeText]
      .filter(text => text)
      .join('，');

    return combinedPrompt;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>设计描述</CardTitle>
        <CardDescription>
          选择设计风格和元素，或直接描述你的创意想法。可以选择只设计一面，也可以两面都设计
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">设计风格</h3>
            <div className="flex flex-wrap gap-2">
              {styleOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant={selectedStyles.includes(option.value) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/90"
                  onClick={() => toggleOption(option.value, selectedStyles, setSelectedStyles)}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">色调选择</h3>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant={selectedColors.includes(option.value) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/90"
                  onClick={() => toggleOption(option.value, selectedColors, setSelectedColors)}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">主题元素</h3>
            <div className="flex flex-wrap gap-2">
              {themeOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant={selectedThemes.includes(option.value) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/90"
                  onClick={() => toggleOption(option.value, selectedThemes, setSelectedThemes)}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="front" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="front">正面设计</TabsTrigger>
            <TabsTrigger value="back">背面设计</TabsTrigger>
          </TabsList>
          <TabsContent value="front" className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="描述正面设计，例如：一个充满未来感的机器人，使用蓝色和紫色的渐变色调..."
                value={frontPrompt}
                onChange={(e) => onFrontPromptChange(e.target.value)}
                className="h-32"
              />
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => onGenerate("front")}
                className="bg-[#3B82F6] hover:bg-[#2563EB] transition-colors shadow-lg px-8 py-4 h-auto text-lg rounded-full"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-6 w-6" />
                    生成正面设计
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="back" className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="描述背面设计，例如：简约的几何图案，搭配品牌标志..."
                value={backPrompt}
                onChange={(e) => onBackPromptChange(e.target.value)}
                className="h-32"
              />
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => onGenerate("back")}
                className="bg-[#3B82F6] hover:bg-[#2563EB] transition-colors shadow-lg px-8 py-4 h-auto text-lg rounded-full"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-6 w-6" />
                    生成背面设计
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};