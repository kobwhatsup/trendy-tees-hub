import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface DesignSettings {
  scale: number;
  rotation: number;
  opacity: number;
  position: "front" | "back";
  offsetX: number;
  offsetY: number;
}

interface DesignControlsProps {
  settings: DesignSettings;
  onSettingChange: (key: keyof DesignSettings, value: number | string) => void;
}

export const DesignControls = ({
  settings,
  onSettingChange,
}: DesignControlsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>大小</Label>
          <span className="text-sm text-gray-500">{Math.round(settings.scale * 100)}%</span>
        </div>
        <Slider
          value={[settings.scale * 100]}
          onValueChange={([value]) => onSettingChange("scale", value / 100)}
          min={50}
          max={150}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>旋转角度</Label>
          <span className="text-sm text-gray-500">{Math.round(settings.rotation)}°</span>
        </div>
        <Slider
          value={[settings.rotation]}
          onValueChange={([value]) => onSettingChange("rotation", value)}
          min={-180}
          max={180}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>透明度</Label>
          <span className="text-sm text-gray-500">{Math.round(settings.opacity * 100)}%</span>
        </div>
        <Slider
          value={[settings.opacity * 100]}
          onValueChange={([value]) => onSettingChange("opacity", value / 100)}
          min={20}
          max={100}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>水平位置</Label>
          <span className="text-sm text-gray-500">{settings.offsetX}</span>
        </div>
        <Slider
          value={[settings.offsetX]}
          onValueChange={([value]) => onSettingChange("offsetX", value)}
          min={-100}
          max={100}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>垂直位置</Label>
          <span className="text-sm text-gray-500">{settings.offsetY}</span>
        </div>
        <Slider
          value={[settings.offsetY]}
          onValueChange={([value]) => onSettingChange("offsetY", value)}
          min={-100}
          max={100}
          step={1}
        />
      </div>
    </div>
  );
};