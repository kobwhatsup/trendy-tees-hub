import { format } from "date-fns";
import { Package2, MoreVertical, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "./OrderStatus";
import { OrderItems } from "./OrderItems";
import { OrderDetailsDialog } from "./OrderDetailsDialog";
import { useState } from "react";
import type { Order } from "@/types/order";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        <div key={order.id} className="border rounded-lg overflow-hidden bg-white">
          <div className="p-4 space-y-4">
            {/* 订单头部 */}
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2">
                <Package2 className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">订单编号: {order.order_number}</p>
              </div>
              <OrderStatus 
                status={order.status} 
                orderNumber={order.order_number}
                totalAmount={Number(order.total_amount)}
              />
            </div>
            
            {/* 订单内容 */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    下单时间: {format(new Date(order.created_at), "yyyy-MM-dd HH:mm:ss")}
                  </p>
                  <p className="font-medium">总金额: ¥{order.total_amount}</p>
                </div>
              </div>

              <OrderItems 
                items={order.items} 
                expanded={true}
                onToggle={() => {}}
              />
            </div>

            {/* 订单底部操作栏 */}
            <div className="flex justify-between items-center border-t pt-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4 mr-1" />
                    更多
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="h-4 w-4 mr-2" />
                    删除订单
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedOrder(order)}
                >
                  订单详情
                </Button>
                <Button variant="outline" size="sm">
                  查看物流
                </Button>
                <Button variant="outline" size="sm">
                  再次购买
                </Button>
                {order.status === 'delivered' && (
                  <Button variant="outline" size="sm">
                    评价
                  </Button>
                )}
                {order.status === 'shipped' && (
                  <Button variant="secondary" size="sm">
                    确认收货
                  </Button>
                )}
              </div>
            </div>
          </div>
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