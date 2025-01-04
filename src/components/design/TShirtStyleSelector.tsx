import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
    { label: "白色", value: "white", class: "bg-white border-2 border-gray-200" },
    { label: "黑色", value: "black", class: "bg-black" },
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center">
          {/* 性别选择 */}
          <div className="flex-1 flex flex-col items-center px-4 py-2 border-r border-border">
            <span className="text-sm font-medium mb-2 text-muted-foreground">款式性别:</span>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant={gender === "male" ? "default" : "outline"}
                onClick={() => onGenderChange("male")}
              >
                男款
              </Button>
              <Button
                size="sm"
                variant={gender === "female" ? "default" : "outline"}
                onClick={() => onGenderChange("female")}
              >
                女款
              </Button>
            </div>
          </div>

          {/* 袖长选择 */}
          <div className="flex-1 flex flex-col items-center px-4 py-2 border-r border-border">
            <span className="text-sm font-medium mb-2 text-muted-foreground">袖长:</span>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant={style === "short" ? "default" : "outline"}
                onClick={() => onStyleChange("short")}
              >
                短袖
              </Button>
              <Button
                size="sm"
                variant={style === "long" ? "default" : "outline"}
                onClick={() => onStyleChange("long")}
              >
                长袖
              </Button>
            </div>
          </div>

          {/* 颜色选择 */}
          <div className="flex-1 flex flex-col items-center px-4 py-2">
            <span className="text-sm font-medium mb-2 text-muted-foreground">颜色:</span>
            <div className="flex gap-4 items-center justify-center">
              {colors.map((colorOption) => (
                <button
                  key={colorOption.value}
                  onClick={() => onColorChange(colorOption.value)}
                  className={cn(
                    "w-8 h-8 rounded-lg transition-all flex items-center justify-center",
                    colorOption.class,
                    color === colorOption.value
                      ? "ring-2 ring-primary ring-offset-2 scale-95"
                      : "hover:scale-105"
                  )}
                  title={colorOption.label}
                >
                  {color === colorOption.value && (
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      colorOption.value === "white" ? "bg-black" : "bg-white"
                    )} />
                  )}
                  <span className="sr-only">{colorOption.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};