import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { SizeGuideDialog } from "./SizeGuideDialog";

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
  
  const colors = [
    { label: "白色", value: "white", class: "bg-white border-2 border-gray-200" },
    { label: "黑色", value: "black", class: "bg-black" },
  ];

  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* 性别选择 */}
          <div className="flex flex-col space-y-3">
            <span className="text-sm font-medium text-muted-foreground text-center">款式性别:</span>
            <div className="flex flex-col gap-2">
              <Button
                size="lg"
                variant={gender === "male" ? "default" : "outline"}
                onClick={() => onGenderChange("male")}
                className={cn(
                  "w-full rounded-md transition-all",
                  gender === "male" ? "bg-[#0EA5E9] hover:bg-[#0EA5E9]/90" : ""
                )}
              >
                男款
              </Button>
              <Button
                size="lg"
                variant={gender === "female" ? "default" : "outline"}
                onClick={() => onGenderChange("female")}
                className={cn(
                  "w-full rounded-md transition-all",
                  gender === "female" ? "bg-[#0EA5E9] hover:bg-[#0EA5E9]/90" : ""
                )}
              >
                女款
              </Button>
            </div>
          </div>

          {/* 袖长选择 */}
          <div className="flex flex-col space-y-3">
            <span className="text-sm font-medium text-muted-foreground text-center">袖长:</span>
            <div className="flex flex-col gap-2">
              <Button
                size="lg"
                variant={style === "short" ? "default" : "outline"}
                onClick={() => onStyleChange("short")}
                className={cn(
                  "w-full rounded-md transition-all",
                  style === "short" ? "bg-[#0EA5E9] hover:bg-[#0EA5E9]/90" : ""
                )}
              >
                短袖
              </Button>
              <Button
                size="lg"
                variant={style === "long" ? "default" : "outline"}
                onClick={() => onStyleChange("long")}
                className={cn(
                  "w-full rounded-md transition-all",
                  style === "long" ? "bg-[#0EA5E9] hover:bg-[#0EA5E9]/90" : ""
                )}
              >
                长袖
              </Button>
            </div>
          </div>

          {/* 材质选择 */}
          <div className="flex flex-col space-y-3">
            <span className="text-sm font-medium text-muted-foreground text-center">材质:</span>
            <div className="flex flex-col gap-2">
              <Button
                size="lg"
                variant={material === "cotton" ? "default" : "outline"}
                onClick={() => onMaterialChange("cotton")}
                className={cn(
                  "w-full rounded-md transition-all",
                  material === "cotton" ? "bg-[#0EA5E9] hover:bg-[#0EA5E9]/90" : ""
                )}
              >
                纯棉标准款
              </Button>
            </div>
          </div>

          {/* 尺码选择 */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">尺码:</span>
              <SizeGuideDialog />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((sizeOption) => (
                <Button
                  key={sizeOption}
                  size="lg"
                  variant={size === sizeOption ? "default" : "outline"}
                  onClick={() => onSizeChange(sizeOption)}
                  className={cn(
                    "w-full rounded-md transition-all",
                    size === sizeOption ? "bg-[#0EA5E9] hover:bg-[#0EA5E9]/90" : ""
                  )}
                >
                  {sizeOption}
                </Button>
              ))}
            </div>
          </div>

          {/* 颜色选择 */}
          <div className="flex flex-col space-y-3">
            <span className="text-sm font-medium text-muted-foreground text-center">颜色:</span>
            <div className="flex flex-col items-center gap-3">
              {colors.map((colorOption) => (
                <button
                  key={colorOption.value}
                  onClick={() => onColorChange(colorOption.value)}
                  className={cn(
                    "h-12 w-20 rounded-md transition-all flex items-center justify-center",
                    colorOption.class,
                    color === colorOption.value
                      ? "ring-2 ring-[#0EA5E9] ring-offset-2"
                      : "hover:opacity-90"
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