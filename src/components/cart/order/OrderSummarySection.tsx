interface OrderSummarySectionProps {
  totalQuantity: number;
  subtotal: number;
  shipping: number;
  total: number;
}

export const OrderSummarySection = ({
  totalQuantity,
  subtotal,
  shipping,
  total,
}: OrderSummarySectionProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm">订单汇总</h3>
      <div className="space-y-2 p-3 bg-muted rounded-lg">
        <div className="flex justify-between text-sm">
          <span>商品总计</span>
          <span>{totalQuantity}件</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>商品金额</span>
          <span>¥{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>运费</span>
          <span>¥{shipping}</span>
        </div>
        <div className="flex justify-between text-sm font-medium pt-2 border-t">
          <span>应付金额</span>
          <span className="text-red-500">¥{total}</span>
        </div>
      </div>
    </div>
  );
};