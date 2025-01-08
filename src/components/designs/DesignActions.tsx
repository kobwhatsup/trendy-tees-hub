import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DeleteDesignDialog } from "./DeleteDesignDialog";

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
    <div className="flex justify-between items-center">
      <DeleteDesignDialog onDelete={onDelete} />
      <div className="flex items-center space-x-2">
        <Switch
          checked={isPublic}
          onCheckedChange={onShareToggle}
          disabled={isUpdating}
          className="data-[state=checked]:bg-green-500"
        />
        <Label>分享</Label>
      </div>
      <Button onClick={() => window.location.href = '/cart'}>
        加入购物车
      </Button>
    </div>
  );
};