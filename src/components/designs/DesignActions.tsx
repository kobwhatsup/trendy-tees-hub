import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DeleteDesignDialog } from "./DeleteDesignDialog";
import { ShoppingCart, Share2 } from "lucide-react";

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
    <div className="flex flex-col space-y-3 w-full">
      <Button 
        onClick={() => window.location.href = '/cart'}
        className="w-full"
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        加入购物车
      </Button>
      <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-md p-3 transition-all hover:from-primary/20 hover:via-secondary/20 hover:to-primary/20">
        <Switch
          checked={isPublic}
          onCheckedChange={onShareToggle}
          disabled={isUpdating}
          className="data-[state=checked]:bg-green-500"
        />
        <Label className="flex items-center gap-1.5 cursor-pointer text-sm font-medium">
          <Share2 className="h-4 w-4" />
          分享设计
        </Label>
      </div>
      <div className="absolute bottom-2 right-2">
        <DeleteDesignDialog onDelete={onDelete} />
      </div>
    </div>
  );
};