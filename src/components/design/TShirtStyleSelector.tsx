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
import { Separator } from "@/components/ui/separator";

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
        <div className="grid grid-cols-3 gap-0 items-center">
          {/* 性别选择 */}
          <div className="flex flex-col items-center px-4 py-2">
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

          <Separator orientation="vertical" className="h-20" />

          {/* 袖长选择 */}
          <div className="flex flex-col items-center px-4 py-2">
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

          <Separator orientation="vertical" className="h-20" />

          {/* 颜色选择 */}
          <div className="flex flex-col items-center px-4 py-2">
            <span className="text-sm font-medium mb-2 text-muted-foreground">颜色:</span>
            <div className="flex gap-4 items-center justify-center">
              {colors.map((colorOption) => (
                <button
                  key={colorOption.value}
                  onClick={() => onColorChange(colorOption.value)}
                  className={cn(
                    "w-8 h-8 rounded-lg border-2 transition-all flex items-center justify-center",
                    colorOption.class,
                    color === colorOption.value
                      ? "border-primary scale-95"
                      : "border-transparent hover:scale-105"
                  )}
                  title={colorOption.label}
                >
                  {color === colorOption.value && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
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