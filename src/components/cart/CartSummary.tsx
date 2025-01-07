import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  itemCount: number;
  onCheckout: () => void;
}

export const CartSummary = ({ itemCount, onCheckout }: CartSummaryProps) => {
  const price = 99; // 每件T恤的价格
  const total = price * itemCount;

  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">商品数量</span>
              <span className="font-medium">{itemCount}件</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">总计</span>
              <span className="font-medium text-lg">¥{total}</span>
            </div>
          </div>
        </div>
        <Button 
          size="lg"
          onClick={onCheckout}
          disabled={itemCount === 0}
          className="px-8 bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600"
        >
          立即结算
        </Button>
      </div>
    </div>
  );
};