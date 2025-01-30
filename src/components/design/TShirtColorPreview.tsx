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
  onSettingsChange?: (settings: DesignSettings) => void;
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
  onPreviewCapture,
  onSettingsChange
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
    const newSettings = {
      ...settings,
      [key]: value
    };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  useEffect(() => {
    if (previewRef.current && onPreviewCapture && designImage) {
      const capturePreview = async () => {
        try {
          console.log(`开始捕获${position}面预览图...`);
          
          // 确保所有图片都已加载
          const previewElement = previewRef.current!;
          const images = previewElement.getElementsByTagName('img');
          
          // 等待所有图片加载完成
          await Promise.all(Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
            });
          }));
          
          console.log('所有图片加载完成，开始生成预览图');
          
          const canvas = await html2canvas(previewRef.current!, {
            useCORS: true,
            backgroundColor: null,
            scale: 2,
            logging: true,
          });
          
          console.log(`${position}面预览图捕获成功，转换为base64...`);
          const previewUrl = canvas.toDataURL('image/png');
          console.log(`${position}面预览图base64转换完成，长度: ${previewUrl.length}`);
          onPreviewCapture(previewUrl);
          console.log(`${position}面预览图已成功发送到父组件`);
        } catch (error) {
          console.error(`${position}面预览图捕获失败:`, error);
        }
      };
      
      // 添加延迟以确保T恤模板图片完全加载
      console.log(`准备捕获${position}面预览图，等待1000ms...`);
      const timer = setTimeout(capturePreview, 1000);
      return () => clearTimeout(timer);
    }
  }, [designImage, settings, onPreviewCapture, position]);

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
          <div ref={previewRef} className="relative bg-white rounded-lg overflow-hidden">
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