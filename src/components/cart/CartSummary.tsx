import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { OrderConfirmDialog } from "./OrderConfirmDialog";
import { CartItemType } from "@/types/cart";

interface CartSummaryProps {
  items: CartItemType[];
  onCheckout: () => void;
}

export const CartSummary = ({ items, onCheckout }: CartSummaryProps) => {
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);
  const isMobile = useIsMobile();

  // 计算选中商品的总数量和总金额
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (0.01 * item.quantity), 0);

  const handleCheckoutClick = () => {
    setShowOrderConfirm(true);
  };

  return (
    <>
      <div className="py-4">
        <div className={`flex items-center ${isMobile ? 'flex-col gap-4' : 'justify-end gap-8'}`}>
          <div className={`flex items-center ${isMobile ? 'w-full justify-between' : 'gap-8'}`}>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">商品数量</span>
              <span className="font-medium">{itemCount}件</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">总计</span>
              <span className="font-medium text-lg">¥{total.toFixed(2)}</span>
            </div>
          </div>
          <Button 
            size={isMobile ? "default" : "lg"}
            onClick={handleCheckoutClick}
            disabled={itemCount === 0}
            className={`${isMobile ? 'w-full' : 'px-8'} bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600`}
          >
            立即结算
          </Button>
        </div>
      </div>

      <OrderConfirmDialog
        open={showOrderConfirm}
        onOpenChange={setShowOrderConfirm}
        items={items}
      />
    </>
  );
};