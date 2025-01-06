import React from "react";
import { TShirtStyleSelector } from "../TShirtStyleSelector";

interface TShirtStyleStepProps {
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

export const TShirtStyleStep = ({
  style,
  color,
  gender,
  size,
  material,
  onStyleChange,
  onColorChange,
  onGenderChange,
  onSizeChange,
  onMaterialChange
}: TShirtStyleStepProps) => {
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 w-full text-center py-2 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] text-white">
        第三步 T恤款式
      </h2>
      <div className="w-full">
        <TShirtStyleSelector
          style={style}
          color={color}
          gender={gender}
          size={size}
          material={material}
          onStyleChange={onStyleChange}
          onColorChange={onColorChange}
          onGenderChange={onGenderChange}
          onSizeChange={onSizeChange}
          onMaterialChange={onMaterialChange}
        />
      </div>
    </section>
  );
};