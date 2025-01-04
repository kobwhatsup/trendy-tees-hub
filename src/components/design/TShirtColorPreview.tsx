import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { TShirtPreview } from "./TShirtPreview";

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
    scale: 1,
    rotation: 0,
    opacity: 1,
    position: position,
    offsetX: 0,
    offsetY: 0
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
        <CardTitle>T恤效果</CardTitle>
        <CardDescription>
          调整设计在T恤上的效果
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* 控制面板 */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>大小</Label>
              <Slider
                value={[settings.scale * 100]}
                onValueChange={([value]) => handleSettingChange("scale", value / 100)}
                min={50}
                max={150}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label>旋转角度</Label>
              <Slider
                value={[settings.rotation]}
                onValueChange={([value]) => handleSettingChange("rotation", value)}
                min={-180}
                max={180}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label>透明度</Label>
              <Slider
                value={[settings.opacity * 100]}
                onValueChange={([value]) => handleSettingChange("opacity", value / 100)}
                min={20}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label>水平位置</Label>
              <Slider
                value={[settings.offsetX]}
                onValueChange={([value]) => handleSettingChange("offsetX", value)}
                min={-100}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label>垂直位置</Label>
              <Slider
                value={[settings.offsetY]}
                onValueChange={([value]) => handleSettingChange("offsetY", value)}
                min={-100}
                max={100}
                step={1}
              />
            </div>
          </div>

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