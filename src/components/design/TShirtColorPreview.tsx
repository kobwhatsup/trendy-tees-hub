import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { TShirtPreview } from "./TShirtPreview";
import { DesignControls } from "./DesignControls";

interface TShirtColorPreviewProps {
  designImage: string;
  tshirtStyle: string;
  tshirtColor: string;
  tshirtGender: string;
  position?: "front" | "back";
}

interface DesignSettings {
  scale: number;
  rotation: number;
  opacity: number;
  position: "front" | "back";
  offsetX: number;
  offsetY: number;
}

export const TShirtColorPreview = ({ 
  designImage,
  tshirtStyle,
  tshirtColor,
  tshirtGender,
  position = "front"
}: TShirtColorPreviewProps) => {
  const [settings, setSettings] = useState<DesignSettings>({
    scale: 0.8, // 80%
    rotation: 0,
    opacity: 1, // 100%
    position: position,
    offsetX: 0,
    offsetY: position === "front" ? 30 : 10 // 根据正面/背面设置不同的垂直位置
  });

  const handleSettingChange = (key: keyof DesignSettings, value: number | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription className="text-center">
          调整设计图在T恤上的效果
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* 控制面板 */}
          <DesignControls 
            settings={settings}
            onSettingChange={handleSettingChange}
          />

          {/* 预览区域 */}
          <div>
            <TShirtPreview 
              color={tshirtColor} 
              designImage={designImage} 
              settings={settings}
              style={tshirtStyle}
              gender={tshirtGender}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};