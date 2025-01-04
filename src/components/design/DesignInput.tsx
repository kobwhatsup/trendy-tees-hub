import React from "react";
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

interface DesignInputProps {
  prompt: string;
  isGenerating: boolean;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
}

export const DesignInput = ({
  prompt,
  isGenerating,
  onPromptChange,
  onGenerate,
}: DesignInputProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>设计描述</CardTitle>
        <CardDescription>
          详细描述你想要的设计风格、元素和主题
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            id="prompt"
            placeholder="例如：一个充满未来感的机器人，使用蓝色和紫色的渐变色调..."
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            className="h-32"
          />
        </div>
        <Button
          onClick={onGenerate}
          className="w-full"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              生成设计
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};