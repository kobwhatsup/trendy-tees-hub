import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface CartItem {
  quantity: number;
  price: number;
}

interface CartSummaryProps {
  items: CartItem[];
  onCheckout: () => void;
}

export const CartSummary = ({ items, onCheckout }: CartSummaryProps) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isMobile = useIsMobile();

  return (
    <div className="py-4">
      <div className={`flex items-center ${isMobile ? 'flex-col gap-4' : 'justify-end gap-8'}`}>
        <div className={`flex items-center ${isMobile ? 'w-full justify-between' : 'gap-8'}`}>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">商品数量</span>
            <span className="font-medium">{itemCount}件</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">总计</span>
            <span className="font-medium text-lg">¥{total}</span>
          </div>
        </div>
        <Button 
          size={isMobile ? "default" : "lg"}
          onClick={onCheckout}
          disabled={itemCount === 0}
          className={`${isMobile ? 'w-full' : 'px-8'} bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600`}
        >
          立即结算
        </Button>
      </div>
    </div>
  );
};