import { cn } from "@/lib/utils";

interface ColorSelectorProps {
  color: string;
  onColorChange: (value: string) => void;
}

export const ColorSelector = ({ color, onColorChange }: ColorSelectorProps) => {
  const colors = [
    { label: "白色", value: "white", class: "bg-white border-2 border-gray-200" },
    { label: "黑色", value: "black", class: "bg-black" },
  ];

  return (
    <div className="flex flex-col space-y-3">
      <span className="text-sm font-medium text-muted-foreground text-center">颜色</span>
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
  );
};