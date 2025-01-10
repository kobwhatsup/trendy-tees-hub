import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MaterialSelectorProps {
  material: string;
  onMaterialChange: (value: string) => void;
}

export const MaterialSelector = ({ material, onMaterialChange }: MaterialSelectorProps) => {
  return (
    <div className="flex flex-col space-y-3">
      <span className="text-sm font-medium text-muted-foreground text-center">材质</span>
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
          纯棉
        </Button>
        <Button
          size="lg"
          variant={material === "quick-dry" ? "default" : "outline"}
          onClick={() => onMaterialChange("quick-dry")}
          className={cn(
            "w-full rounded-md transition-all",
            material === "quick-dry" ? "bg-[#0EA5E9] hover:bg-[#0EA5E9]/90" : ""
          )}
        >
          速干
        </Button>
      </div>
    </div>
  );
};