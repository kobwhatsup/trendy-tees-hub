import React, { useState } from "react";
import { Wand2, Eraser } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { removeBackground, loadImage } from "@/utils/imageProcessing";

interface DesignPreviewProps {
  designImage: string;
  title: string;
}

export const DesignPreview = ({ designImage, title }: DesignPreviewProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleRemoveBackground = async () => {
    if (!designImage || isProcessing) return;

    setIsProcessing(true);
    try {
      // 从URL加载图片
      const response = await fetch(designImage);
      const blob = await response.blob();
      const img = await loadImage(blob);
      
      // 去除背景
      const processedBlob = await removeBackground(img);
      
      // 创建新的URL
      const processedUrl = URL.createObjectURL(processedBlob);
      
      // 更新图片URL (这里需要通过父组件的回调来更新)
      // onImageUpdate(processedUrl);
      
      toast({
        title: "背景去除成功",
        description: "图片已优化,更适合T恤印制",
      });
    } catch (error) {
      console.error('去除背景失败:', error);
      toast({
        title: "处理失败",
        description: "去除背景时出现错误,请重试",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription>
          实时查看AI生成的设计效果
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden">
          {designImage ? (
            <div className="relative w-full h-full">
              <img
                src={designImage}
                alt="AI生成的设计"
                className="w-full h-full object-contain p-4"
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-2 right-2"
                onClick={handleRemoveBackground}
                disabled={isProcessing}
              >
                <Eraser className="mr-2 h-4 w-4" />
                {isProcessing ? "处理中..." : "去除背景"}
              </Button>
            </div>
          ) : (
            <div className="text-muted-foreground text-center p-4">
              <Wand2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>AI生成的{title}将在这里显示</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};