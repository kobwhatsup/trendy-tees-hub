import React from "react";
import { Card } from "@/components/ui/card";

interface DesignPreviewProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  isGenerating?: boolean;
  isAuthenticated?: boolean;
}

export const DesignPreview = ({ 
  title, 
  subtitle, 
  imageUrl,
  isGenerating,
  isAuthenticated 
}: DesignPreviewProps) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-sm text-gray-500">{subtitle}</div>
      
      <Card className="relative w-full aspect-square flex items-center justify-center border-2 border-dashed p-2">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            {isGenerating ? (
              <div className="animate-pulse text-gray-400">生成中...</div>
            ) : !isAuthenticated ? (
              <div className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md text-sm">
                建议先登录，以免设计丢失或不能关联到您的账号
              </div>
            ) : null}
          </div>
        )}
      </Card>
    </div>
  );
};