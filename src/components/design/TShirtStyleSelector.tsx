import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { GenderSelector } from "./style-selector/GenderSelector";
import { SleeveSelector } from "./style-selector/SleeveSelector";
import { MaterialSelector } from "./style-selector/MaterialSelector";
import { SizeSelector } from "./style-selector/SizeSelector";
import { ColorSelector } from "./style-selector/ColorSelector";

interface TShirtStyleSelectorProps {
  style: string;
  color: string;
  gender: string;
  size: string;
  material: string;
  onStyleChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onMaterialChange: (value: string) => void;
}

export const TShirtStyleSelector = ({
  style,
  color,
  gender,
  size,
  material,
  onStyleChange,
  onColorChange,
  onGenderChange,
  onSizeChange,
  onMaterialChange,
}: TShirtStyleSelectorProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <GenderSelector gender={gender} onGenderChange={onGenderChange} />
          <SleeveSelector style={style} onStyleChange={onStyleChange} />
          <MaterialSelector material={material} onMaterialChange={onMaterialChange} />
          <SizeSelector size={size} onSizeChange={onSizeChange} />
          <ColorSelector color={color} onColorChange={onColorChange} />
        </div>
      </CardContent>
    </Card>
  );
};