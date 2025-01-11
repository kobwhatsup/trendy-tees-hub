import { format } from "date-fns";
import { OrderStatus } from "../OrderStatus";
import { OrderActions } from "./OrderActions";
import type { Order } from "@/types/order";

interface OrderListItemProps {
  order: Order;
  onDelete: (orderId: string) => void;
  onViewDetails: (order: Order) => void;
}

export const OrderListItem = ({ 
  order,
  onDelete,
  onViewDetails
}: OrderListItemProps) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-card rounded-lg border">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium">订单编号: {order.order_number}</p>
          <p className="text-sm text-muted-foreground">
            下单时间: {format(new Date(order.created_at), "yyyy-MM-dd HH:mm:ss")}
          </p>
        </div>
        <OrderStatus 
          status={order.status} 
          orderNumber={order.order_number}
          totalAmount={Number(order.total_amount)}
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm">
          <span className="text-muted-foreground">总金额: </span>
          <span className="font-medium">¥{order.total_amount}</span>
        </div>
        <OrderActions
          order={order}
          onDelete={onDelete}
          onViewDetails={onViewDetails}
        />
      </div>
    </div>
  );
};