import { Badge } from "@/components/ui/badge";

interface ThemeOption {
  label: string;
  value: string;
}

export const themeOptions: ThemeOption[] = [
  { label: "自然", value: "nature" },
  { label: "科技", value: "tech" },
  { label: "动物", value: "animals" },
  { label: "几何", value: "geometric" },
  { label: "艺术", value: "art" },
  { label: "文字", value: "typography" },
];

interface ThemeOptionsProps {
  selectedThemes: string[];
  onToggleTheme: (theme: string) => void;
}

export const ThemeOptions = ({ selectedThemes, onToggleTheme }: ThemeOptionsProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">主题元素</h3>
      <div className="flex flex-wrap gap-2">
        {themeOptions.map((option) => (
          <Badge
            key={option.value}
            variant={selectedThemes.includes(option.value) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90"
            onClick={() => onToggleTheme(option.value)}
          >
            {option.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};