import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
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
  onPreviewCapture?: (previewUrl: string) => void;
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
  position = "front",
  onPreviewCapture
}: TShirtColorPreviewProps) => {
  const [settings, setSettings] = useState<DesignSettings>({
    scale: 0.8,
    rotation: 0,
    opacity: 1,
    position: position,
    offsetX: 0,
    offsetY: position === "front" ? 30 : 10
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const handleSettingChange = (key: keyof DesignSettings, value: number | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  useEffect(() => {
    if (previewRef.current && onPreviewCapture) {
      const capturePreview = async () => {
        try {
          const canvas = await html2canvas(previewRef.current!, {
            useCORS: true,
            backgroundColor: null,
            scale: 2,
          });
          const previewUrl = canvas.toDataURL('image/png');
          onPreviewCapture(previewUrl);
        } catch (error) {
          console.error('预览图片捕获失败:', error);
        }
      };
      
      // 当设计图或设置发生变化时捕获预览
      if (designImage) {
        capturePreview();
      }
    }
  }, [designImage, settings, onPreviewCapture]);

  return (
    <Card>
      <CardHeader>
        <CardDescription className="text-center">
          调整设计图在T恤上的效果
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <DesignControls 
            settings={settings}
            onSettingChange={handleSettingChange}
          />
          <div ref={previewRef}>
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