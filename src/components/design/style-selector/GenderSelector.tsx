import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GenderSelectorProps {
  gender: string;
  onGenderChange: (value: string) => void;
}

export const GenderSelector = ({ gender, onGenderChange }: GenderSelectorProps) => {
  return (
    <div className="flex flex-col space-y-3">
      <span className="text-sm font-medium text-muted-foreground text-center">款式性别</span>
      <div className="flex flex-col gap-2">
        <Button
          size="lg"
          variant={gender === "male" ? "default" : "outline"}
          onClick={() => onGenderChange("male")}
          className={cn(
            "w-full rounded-md transition-all",
            gender === "male" ? "bg-[#0EA5E9] hover:bg-[#0EA5E9]/90" : ""
          )}
        >
          男款
        </Button>
        <Button
          size="lg"
          variant={gender === "female" ? "default" : "outline"}
          onClick={() => onGenderChange("female")}
          className={cn(
            "w-full rounded-md transition-all",
            gender === "female" ? "bg-[#0EA5E9] hover:bg-[#0EA5E9]/90" : ""
          )}
        >
          女款
        </Button>
      </div>
    </div>
  );
};