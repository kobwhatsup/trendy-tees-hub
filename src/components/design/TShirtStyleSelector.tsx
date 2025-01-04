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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TShirtStyleSelectorProps {
  style: string;
  color: string;
  onStyleChange: (value: string) => void;
  onColorChange: (value: string) => void;
}

export const TShirtStyleSelector = ({
  style,
  color,
  onStyleChange,
  onColorChange,
}: TShirtStyleSelectorProps) => {
  const colors = [
    { label: "白色", value: "white" },
    { label: "黑色", value: "black" },
    { label: "藏青", value: "navy" },
    { label: "红色", value: "red" },
    { label: "绿色", value: "green" },
    { label: "粉色", value: "pink" },
    { label: "灰色", value: "gray" },
    { label: "米色", value: "beige" },
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
        <div className="space-y-2">
          <Label>款式</Label>
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

        <div className="space-y-2">
          <Label>颜色</Label>
          <Select value={color} onValueChange={onColorChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="选择颜色" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  {color.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};