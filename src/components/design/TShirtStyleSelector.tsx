import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TShirtStyleSelectorProps {
  style: string;
  color: string;
  gender: string;
  onStyleChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onGenderChange: (value: string) => void;
}

export const TShirtStyleSelector = ({
  style,
  color,
  gender,
  onStyleChange,
  onColorChange,
  onGenderChange,
}: TShirtStyleSelectorProps) => {
  const colors = [
    { label: "白色", value: "white", class: "bg-white" },
    { label: "黑色", value: "black", class: "bg-black" },
    { label: "藏青", value: "navy", class: "bg-navy-600" },
    { label: "红色", value: "red", class: "bg-red-500" },
    { label: "绿色", value: "green", class: "bg-green-500" },
    { label: "粉色", value: "pink", class: "bg-pink-400" },
    { label: "灰色", value: "gray", class: "bg-gray-400" },
    { label: "米色", value: "beige", class: "bg-[#F5F5DC]" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>T恤款式</CardTitle>
        <CardDescription>
          选择T恤的款式和颜色
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 性别选择 */}
        <div className="space-y-2">
          <Label>款式性别</Label>
          <RadioGroup
            defaultValue={gender}
            onValueChange={onGenderChange}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">男款</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">女款</Label>
            </div>
          </RadioGroup>
        </div>

        {/* 袖长选择 */}
        <div className="space-y-2">
          <Label>袖长</Label>
          <RadioGroup
            defaultValue={style}
            onValueChange={onStyleChange}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="short" id="short" />
              <Label htmlFor="short">短袖</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="long" id="long" />
              <Label htmlFor="long">长袖</Label>
            </div>
          </RadioGroup>
        </div>

        {/* 颜色选择 */}
        <div className="space-y-2">
          <Label>颜色</Label>
          <div className="grid grid-cols-4 gap-4">
            {colors.map((colorOption) => (
              <button
                key={colorOption.value}
                onClick={() => onColorChange(colorOption.value)}
                className={cn(
                  "w-full aspect-square rounded-lg border-2 transition-all",
                  colorOption.class,
                  color === colorOption.value
                    ? "border-primary scale-95"
                    : "border-transparent hover:scale-105"
                )}
                title={colorOption.label}
              >
                <span className="sr-only">{colorOption.label}</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};