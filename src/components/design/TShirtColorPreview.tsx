import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { TShirtPreview } from "./TShirtPreview";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TShirtColorPreviewProps {
  designImage: string;
}

interface DesignSettings {
  scale: number;
  rotation: number;
  opacity: number;
  position: "front" | "back";
}

export const TShirtColorPreview = ({ designImage }: TShirtColorPreviewProps) => {
  const [settings, setSettings] = useState<DesignSettings>({
    scale: 1,
    rotation: 0,
    opacity: 1,
    position: "front"
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
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>位置</Label>
            <RadioGroup
              defaultValue="front"
              onValueChange={(value) => handleSettingChange("position", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="front" id="front" />
                <Label htmlFor="front">正面</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="back" id="back" />
                <Label htmlFor="back">背面</Label>
              </div>
            </RadioGroup>
          </div>

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
        </div>

        <Tabs defaultValue="white" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="white">白色</TabsTrigger>
            <TabsTrigger value="black">黑色</TabsTrigger>
            <TabsTrigger value="navy">藏青</TabsTrigger>
            <TabsTrigger value="gray">灰色</TabsTrigger>
          </TabsList>
          <TabsContent value="white">
            <TShirtPreview color="#ffffff" designImage={designImage} settings={settings} />
          </TabsContent>
          <TabsContent value="black">
            <TShirtPreview color="#000000" designImage={designImage} settings={settings} />
          </TabsContent>
          <TabsContent value="navy">
            <TShirtPreview color="#1B365D" designImage={designImage} settings={settings} />
          </TabsContent>
          <TabsContent value="gray">
            <TShirtPreview color="#808080" designImage={designImage} settings={settings} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};