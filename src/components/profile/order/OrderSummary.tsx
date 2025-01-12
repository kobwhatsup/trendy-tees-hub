import { format } from "date-fns";

interface OrderSummaryProps {
  orderNumber: string;
  createdAt: string;
  paidAt: string | null;
  shippedAt: string | null;
  totalAmount: number;
}

export const OrderSummary = ({ 
  orderNumber, 
  createdAt, 
  paidAt, 
  shippedAt, 
  totalAmount 
}: OrderSummaryProps) => {
  return (
    <div className="space-y-4 border-t pt-4">
      <h3 className="font-medium">订单信息</h3>
      <div className="grid gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">订单编号</span>
          <span className="font-medium">{orderNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">创建时间</span>
          <span>{format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss")}</span>
        </div>
        {paidAt && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">付款时间</span>
            <span>{format(new Date(paidAt), "yyyy-MM-dd HH:mm:ss")}</span>
          </div>
        )}
        {shippedAt && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">发货时间</span>
            <span>{format(new Date(shippedAt), "yyyy-MM-dd HH:mm:ss")}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">总金额</span>
          <span className="font-medium">¥{totalAmount}</span>
        </div>
      </div>
    </div>
  );
};