import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DeleteDesignDialog } from "./DeleteDesignDialog";
import { ShoppingCart, Share2, Trash2 } from "lucide-react";

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
      <div className="grid grid-cols-2 gap-2">
        <DeleteDesignDialog onDelete={onDelete} />
        <Button 
          onClick={() => window.location.href = '/cart'}
          className="w-full"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          加入购物车
        </Button>
      </div>
      <div className="flex items-center justify-center space-x-2 bg-secondary/50 rounded-md p-2">
        <Switch
          checked={isPublic}
          onCheckedChange={onShareToggle}
          disabled={isUpdating}
          className="data-[state=checked]:bg-green-500"
        />
        <Label className="flex items-center gap-1 cursor-pointer">
          <Share2 className="h-4 w-4" />
          分享
        </Label>
      </div>
    </div>
  );
};