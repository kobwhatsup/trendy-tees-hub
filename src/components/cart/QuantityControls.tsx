import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

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
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemove();
    } else {
      onUpdateQuantity(newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">数量:</span>
        <Button
          variant="outline"
          size="sm"
          className="h-7 w-7"
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-6 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="sm"
          className="h-7 w-7"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};