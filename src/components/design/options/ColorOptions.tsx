import { Badge } from "@/components/ui/badge";

interface ColorOption {
  label: string;
  value: string;
}

export const colorOptions: ColorOption[] = [
  { label: "明亮", value: "bright" },
  { label: "暗色", value: "dark" },
  { label: "柔和", value: "soft" },
  { label: "对比强", value: "high-contrast" },
  { label: "单色", value: "monochrome" },
  { label: "渐变", value: "gradient" },
];

interface ColorOptionsProps {
  selectedColors: string[];
  onToggleColor: (color: string) => void;
}

export const ColorOptions = ({ selectedColors, onToggleColor }: ColorOptionsProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">色调选择</h3>
      <div className="grid grid-cols-3 gap-3">
        {colorOptions.map((option) => (
          <Badge
            key={option.value}
            variant={selectedColors.includes(option.value) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90 py-2 text-center w-full"
            onClick={() => onToggleColor(option.value)}
          >
            {option.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};