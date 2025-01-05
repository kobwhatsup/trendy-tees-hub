import { Badge } from "@/components/ui/badge";

interface StyleOption {
  label: string;
  value: string;
}

export const styleOptions: StyleOption[] = [
  { label: "写实", value: "realistic" },
  { label: "卡通", value: "cartoon" },
  { label: "抽象", value: "abstract" },
  { label: "极简", value: "minimalist" },
  { label: "复古", value: "vintage" },
  { label: "未来", value: "futuristic" },
];

interface StyleOptionsProps {
  selectedStyles: string[];
  onToggleStyle: (style: string) => void;
}

export const StyleOptions = ({ selectedStyles, onToggleStyle }: StyleOptionsProps) => {
  return (
    <div className="w-full">
      <h3 className="text-sm font-medium mb-4">设计风格</h3>
      <div className="flex flex-wrap gap-3">
        {styleOptions.map((option) => (
          <Badge
            key={option.value}
            variant={selectedStyles.includes(option.value) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90 px-6 py-2 text-base"
            onClick={() => onToggleStyle(option.value)}
          >
            {option.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};