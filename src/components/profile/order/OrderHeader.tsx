import { format } from "date-fns";
import { Package2 } from "lucide-react";
import { OrderStatus } from "../OrderStatus";

interface OrderHeaderProps {
  orderNumber: string;
  createdAt: string;
  status: string;
  totalAmount: number;
}

export const OrderHeader = ({ orderNumber, createdAt, status, totalAmount }: OrderHeaderProps) => {
  return (
    <div className="flex justify-between items-start border-b pb-4">
      <div className="space-y-1">
        <p className="text-lg font-medium">订单编号: {orderNumber}</p>
        <p className="text-sm text-muted-foreground">
          下单时间: {format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss")}
        </p>
      </div>
      <OrderStatus 
        status={status} 
        orderNumber={orderNumber}
        totalAmount={totalAmount}
      />
    </div>
  );
};