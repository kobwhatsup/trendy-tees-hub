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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface OrderListProps {
  orders: Order[];
  expandedOrders: string[];
  onToggleOrder: (orderId: string) => void;
  onDeleteOrder: (orderId: string) => void;
}

export const OrderList = ({ orders, expandedOrders, onToggleOrder, onDeleteOrder }: OrderListProps) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  
  const handleDeleteConfirm = () => {
    if (orderToDelete) {
      onDeleteOrder(orderToDelete);
      setOrderToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg overflow-hidden bg-white">
          <div className="p-4 space-y-4">
            {/* 订单头部 */}
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2">
                <Package2 className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  下单时间: {format(new Date(order.created_at), "yyyy-MM-dd HH:mm:ss")}
                </p>
              </div>
            </div>
            
            {/* 订单内容 */}
            <div className="space-y-4">
              <div className="space-y-2">
                <OrderStatus 
                  status={order.status} 
                  orderNumber={order.order_number}
                  totalAmount={Number(order.total_amount)}
                />
                <p className="font-medium">总金额: ¥{order.total_amount}</p>
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
                  <DropdownMenuItem 
                    className="text-destructive"
                    onClick={() => setOrderToDelete(order.id)}
                  >
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
                {order.status === 'pending_payment' && (
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => {
                      const orderStatusComponent = {
                        handlePayment: () => {
                          // 调用 OrderStatus 组件中的支付处理逻辑
                          const paymentUrl = `https://example.com/pay?order_number=${order.order_number}&amount=${order.total_amount}`;
                          console.log("Payment URL:", paymentUrl);
                        }
                      };
                      orderStatusComponent.handlePayment();
                    }}
                  >
                    去支付
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

      <AlertDialog open={!!orderToDelete} onOpenChange={() => setOrderToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除订单</AlertDialogTitle>
            <AlertDialogDescription>
              删除后订单将无法恢复，请确认。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>确认删除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};