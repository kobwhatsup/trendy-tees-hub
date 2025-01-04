import React from "react";
import { Wand2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DesignPreviewProps {
  designImage: string;
  title: string;
}

export const DesignPreview = ({ designImage, title }: DesignPreviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          实时查看AI生成的设计效果
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden bg-white">
          {designImage ? (
            <div className="w-full h-full flex items-center justify-center p-4">
              <img
                src={designImage}
                alt="AI生成的设计"
                className="max-w-full max-h-full object-contain"
                style={{
                  width: "auto",
                  height: "auto"
                }}
              />
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