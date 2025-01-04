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
}

export const DesignPreview = ({ designImage }: DesignPreviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>设计预览</CardTitle>
        <CardDescription>
          实时查看AI生成的设计效果
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden">
          {designImage ? (
            <img
              src={designImage}
              alt="AI生成的设计"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-muted-foreground text-center p-4">
              <Wand2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>AI生成的设计将在这里显示</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};