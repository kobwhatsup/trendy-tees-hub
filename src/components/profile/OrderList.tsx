import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "./OrderStatus";
import { OrderItems } from "./OrderItems";
import type { Order } from "@/types/order";

interface OrderListProps {
  orders: Order[];
  expandedOrders: string[];
  onToggleOrder: (orderId: string) => void;
}

export const OrderList = ({ orders, expandedOrders, onToggleOrder }: OrderListProps) => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
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
            <div>
              <p className="text-sm font-medium">总金额: ¥{order.total_amount}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onToggleOrder(order.id)}
            >
              {expandedOrders.includes(order.id) ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>

          <OrderItems 
            items={order.items} 
            expanded={expandedOrders.includes(order.id)}
            onToggle={() => onToggleOrder(order.id)}
          />
        </div>
      ))}
    </div>
  );
};