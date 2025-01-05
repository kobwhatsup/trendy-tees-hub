import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  itemCount: number;
  onCheckout: () => void;
}

export const CartSummary = ({ itemCount, onCheckout }: CartSummaryProps) => {
  const price = 99; // 每件T恤的价格
  const total = price * itemCount;

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold">订单汇总</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>商品数量</span>
          <span>{itemCount}件</span>
        </div>
        <div className="flex justify-between">
          <span>单价</span>
          <span>¥{price}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>总计</span>
          <span>¥{total}</span>
        </div>
      </div>
      <Button 
        className="w-full" 
        size="lg"
        onClick={onCheckout}
        disabled={itemCount === 0}
      >
        立即结算
      </Button>
    </div>
  );
};