import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SizeGuideDialog } from "../SizeGuideDialog";

interface SizeSelectorProps {
  size: string;
  onSizeChange: (value: string) => void;
}

export const SizeSelector = ({ size, onSizeChange }: SizeSelectorProps) => {
  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">尺码</span>
        <SizeGuideDialog className="underline" />
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
  );
};