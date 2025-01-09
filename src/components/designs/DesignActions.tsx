import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DeleteDesignDialog } from "./DeleteDesignDialog";
import { Share2, ShoppingCart } from "lucide-react";

interface DesignActionsProps {
  isPublic: boolean;
  isUpdating: boolean;
  onShareToggle: () => Promise<void>;
  onDelete: () => Promise<void>;
}

export const DesignActions = ({ 
  isPublic, 
  isUpdating, 
  onShareToggle, 
  onDelete 
}: DesignActionsProps) => {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <Button 
        onClick={() => window.location.href = '/cart'}
        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-md"
        size="lg"
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        加入购物车
      </Button>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 bg-gradient-to-r from-accent to-muted rounded-md px-3 py-1.5">
          <Switch
            checked={isPublic}
            onCheckedChange={onShareToggle}
            disabled={isUpdating}
            className="data-[state=checked]:bg-green-500"
          />
          <Label className="flex items-center gap-1.5 cursor-pointer">
            <Share2 className="h-4 w-4" />
            分享设计
          </Label>
        </div>
        <DeleteDesignDialog onDelete={onDelete} />
      </div>
    </div>
  );
};