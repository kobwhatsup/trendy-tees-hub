import { format } from "date-fns";
import { Package2 } from "lucide-react";
import { OrderStatus } from "./OrderStatus";

interface OrderHeaderProps {
  createdAt: string;
  status: string;
  orderNumber: string;
  totalAmount: number;
}

export const OrderHeader = ({ createdAt, status, orderNumber, totalAmount }: OrderHeaderProps) => {
  return (
    <div className="flex justify-between items-center border-b pb-3">
      <div className="flex items-center gap-2">
        <Package2 className="h-5 w-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          下单时间: {format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss")}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <OrderStatus 
          status={status} 
          orderNumber={orderNumber}
          totalAmount={totalAmount}
        />
      </div>
    </div>
  );
};