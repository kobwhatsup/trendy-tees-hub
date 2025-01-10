import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SleeveSelectorProps {
  style: string;
  onStyleChange: (value: string) => void;
}

export const SleeveSelector = ({ style, onStyleChange }: SleeveSelectorProps) => {
  return (
    <div className="flex flex-col space-y-3">
      <span className="text-sm font-medium text-muted-foreground text-center">袖长</span>
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
  );
};