import { useState } from "react";
import type { Order } from "@/types/order";
import { OrderDetailsDialog } from "./OrderDetailsDialog";
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
import { OrderHeader } from "./OrderHeader";
import { OrderContent } from "./OrderContent";
import { OrderActions } from "./OrderActions";

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
            <OrderHeader 
              createdAt={order.created_at}
              status={order.status}
              orderNumber={order.order_number}
              totalAmount={Number(order.total_amount)}
            />
            
            <OrderContent 
              items={order.items}
              totalAmount={Number(order.total_amount)}
            />

            <OrderActions 
              orderId={order.id}
              status={order.status}
              onDelete={(id) => setOrderToDelete(id)}
              onViewDetails={() => setSelectedOrder(order)}
            />
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