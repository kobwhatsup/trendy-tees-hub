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
              <span className="text-muted-foreground">单价</span>
              <span className="font-medium">¥{price}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">总计</span>
              <span className="font-medium text-lg">¥{total}</span>
            </div>
          </div>
        </div>
        <div className="p-[1px] rounded-md bg-gradient-to-r from-blue-400 to-red-400">
          <Button 
            size="lg"
            onClick={onCheckout}
            disabled={itemCount === 0}
            className="px-8 bg-white hover:bg-white/90 text-foreground"
          >
            立即结算
          </Button>
        </div>
      </div>
    </div>
  );
};