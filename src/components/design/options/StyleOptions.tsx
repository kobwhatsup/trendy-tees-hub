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
    <div>
      <h3 className="text-sm font-medium mb-2">设计风格</h3>
      <div className="flex flex-wrap gap-2">
        {styleOptions.map((option) => (
          <Badge
            key={option.value}
            variant={selectedStyles.includes(option.value) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90"
            onClick={() => onToggleStyle(option.value)}
          >
            {option.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};