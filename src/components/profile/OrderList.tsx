import { format } from "date-fns";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "./OrderStatus";
import { OrderItems } from "./OrderItems";
import { OrderDetailsDialog } from "./OrderDetailsDialog";
import { useState } from "react";
import type { Order } from "@/types/order";

interface OrderListProps {
  orders: Order[];
  expandedOrders: string[];
  onToggleOrder: (orderId: string) => void;
}

export const OrderList = ({ orders, expandedOrders, onToggleOrder }: OrderListProps) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">订单编号: {order.order_number}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setSelectedOrder(order)}
                >
                  <Info className="h-4 w-4" />
                  <span className="sr-only">查看订单详情</span>
                </Button>
              </div>
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
              className="gap-1"
            >
              {expandedOrders.includes(order.id) ? (
                <>
                  收起详情
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  展开详情
                  <ChevronDown className="h-4 w-4" />
                </>
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

      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          open={true}
          onOpenChange={(open) => !open && setSelectedOrder(null)}
        />
      )}
    </div>
  );
};