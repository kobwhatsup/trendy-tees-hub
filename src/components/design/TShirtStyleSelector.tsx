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
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>T恤款式</CardTitle>
        <CardDescription>
          选择T恤的款式和颜色
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          {/* 性别选择 */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium whitespace-nowrap">款式性别:</span>
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
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium whitespace-nowrap">袖长:</span>
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
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium whitespace-nowrap">颜色:</span>
            <div className="flex gap-2 items-center">
              {colors.map((colorOption) => (
                <div key={colorOption.value} className="text-center">
                  <button
                    onClick={() => onColorChange(colorOption.value)}
                    className={cn(
                      "w-6 h-6 rounded-lg border-2 transition-all",
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
        </div>
      </CardContent>
    </Card>
  );
};