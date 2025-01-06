import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface TShirtStyleSelectorProps {
  style: string;
  color: string;
  gender: string;
  size: string;
  onStyleChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onSizeChange: (value: string) => void;
}

export const TShirtStyleSelector = ({
  style,
  color,
  gender,
  size,
  onStyleChange,
  onColorChange,
  onGenderChange,
  onSizeChange,
}: TShirtStyleSelectorProps) => {
  const isMobile = useIsMobile();
  
  const colors = [
    { label: "白色", value: "white", class: "bg-white border-2 border-gray-200" },
    { label: "黑色", value: "black", class: "bg-black" },
  ];

  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 性别选择 */}
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-muted-foreground text-center">款式性别:</span>
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                variant={gender === "male" ? "default" : "outline"}
                onClick={() => onGenderChange("male")}
                className="w-full"
              >
                男款
              </Button>
              <Button
                size="sm"
                variant={gender === "female" ? "default" : "outline"}
                onClick={() => onGenderChange("female")}
                className="w-full"
              >
                女款
              </Button>
            </div>
          </div>

          {/* 袖长选择 */}
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-muted-foreground text-center">袖长:</span>
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                variant={style === "short" ? "default" : "outline"}
                onClick={() => onStyleChange("short")}
                className="w-full"
              >
                短袖
              </Button>
              <Button
                size="sm"
                variant={style === "long" ? "default" : "outline"}
                onClick={() => onStyleChange("long")}
                className="w-full"
              >
                长袖
              </Button>
            </div>
          </div>

          {/* 尺码选择 */}
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-muted-foreground text-center">尺码:</span>
            <div className="grid grid-cols-2 gap-2">
              {sizes.map((sizeOption) => (
                <Button
                  key={sizeOption}
                  size="sm"
                  variant={size === sizeOption ? "default" : "outline"}
                  onClick={() => onSizeChange(sizeOption)}
                  className="w-full"
                >
                  {sizeOption}
                </Button>
              ))}
            </div>
          </div>

          {/* 颜色选择 */}
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-muted-foreground text-center">颜色:</span>
            <div className="flex flex-col gap-2">
              {colors.map((colorOption) => (
                <button
                  key={colorOption.value}
                  onClick={() => onColorChange(colorOption.value)}
                  className={cn(
                    "h-9 rounded-md transition-all flex items-center justify-center",
                    colorOption.class,
                    color === colorOption.value
                      ? "ring-2 ring-primary ring-offset-2"
                      : "hover:opacity-90"
                  )}
                  style={{ width: '64px', margin: '0 auto' }}
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