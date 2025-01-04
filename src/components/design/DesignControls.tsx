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
        <Label>大小</Label>
        <Slider
          value={[settings.scale * 100]}
          onValueChange={([value]) => onSettingChange("scale", value / 100)}
          min={50}
          max={150}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <Label>旋转角度</Label>
        <Slider
          value={[settings.rotation]}
          onValueChange={([value]) => onSettingChange("rotation", value)}
          min={-180}
          max={180}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <Label>透明度</Label>
        <Slider
          value={[settings.opacity * 100]}
          onValueChange={([value]) => onSettingChange("opacity", value / 100)}
          min={20}
          max={100}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <Label>水平位置</Label>
        <Slider
          value={[settings.offsetX]}
          onValueChange={([value]) => onSettingChange("offsetX", value)}
          min={-100}
          max={100}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <Label>垂直位置</Label>
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