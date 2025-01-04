import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
          <p className="text-sm font-medium mb-2">款式性别</p>
          <div className="flex gap-2">
            <Button
              variant={gender === "male" ? "default" : "outline"}
              onClick={() => onGenderChange("male")}
              className="flex-1"
            >
              男款
            </Button>
            <Button
              variant={gender === "female" ? "default" : "outline"}
              onClick={() => onGenderChange("female")}
              className="flex-1"
            >
              女款
            </Button>
          </div>
        </div>

        {/* 袖长选择 */}
        <div className="space-y-2">
          <p className="text-sm font-medium mb-2">袖长</p>
          <div className="flex gap-2">
            <Button
              variant={style === "short" ? "default" : "outline"}
              onClick={() => onStyleChange("short")}
              className="flex-1"
            >
              短袖
            </Button>
            <Button
              variant={style === "long" ? "default" : "outline"}
              onClick={() => onStyleChange("long")}
              className="flex-1"
            >
              长袖
            </Button>
          </div>
        </div>

        {/* 颜色选择 */}
        <div className="space-y-2">
          <p className="text-sm font-medium mb-2">颜色</p>
          <div className="flex gap-2 items-center">
            {colors.map((colorOption) => (
              <div key={colorOption.value} className="text-center">
                <button
                  onClick={() => onColorChange(colorOption.value)}
                  className={cn(
                    "w-8 h-8 rounded-lg border-2 transition-all mx-auto block",
                    colorOption.class,
                    color === colorOption.value
                      ? "border-primary scale-95"
                      : "border-transparent hover:scale-105"
                  )}
                  title={colorOption.label}
                >
                  <span className="sr-only">{colorOption.label}</span>
                </button>
                {color === colorOption.value && (
                  <span className="text-xs mt-1 block text-muted-foreground">
                    {colorOption.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};