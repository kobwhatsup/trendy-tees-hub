import { Card } from "@/components/ui/card";
import { DesignImage } from "./DesignImage";
import { ProductInfo } from "./ProductInfo";
import { QuantityControls } from "./QuantityControls";
import { TShirtImage } from "../design/preview/TShirtImage";

interface CartItemProps {
  id: string;
  design_front: string | null;
  design_back: string | null;
  tshirt_style: string;
  tshirt_color: string;
  tshirt_gender: string;
  quantity: number;
  onUpdate: () => void;
}

export const CartItem = ({ 
  id, 
  design_front, 
  design_back, 
  tshirt_style,
  tshirt_color,
  tshirt_gender,
  quantity,
  onUpdate 
}: CartItemProps) => {
  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <TShirtImage 
                color={tshirt_color}
                style={tshirt_style}
                gender={tshirt_gender}
                position="front"
              />
              {design_front && (
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <DesignImage imageUrl={design_front} title="正面设计" />
                </div>
              )}
            </div>
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <TShirtImage 
                color={tshirt_color}
                style={tshirt_style}
                gender={tshirt_gender}
                position="back"
              />
              {design_back && (
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <DesignImage imageUrl={design_back} title="背面设计" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <ProductInfo 
            style={tshirt_style}
            gender={tshirt_gender}
            color={tshirt_color}
          />
          <QuantityControls 
            itemId={id}
            quantity={quantity}
            onUpdate={onUpdate}
          />
        </div>
      </div>
    </Card>
  );
};