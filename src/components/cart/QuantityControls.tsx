import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";

interface QuantityControlsProps {
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export const QuantityControls = ({ 
  quantity, 
  onUpdateQuantity, 
  onRemove 
}: QuantityControlsProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onUpdateQuantity(quantity - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onUpdateQuantity(quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button
        variant="destructive"
        size="icon"
        onClick={onRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};