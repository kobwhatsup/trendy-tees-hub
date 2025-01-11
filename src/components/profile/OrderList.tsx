import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { OrderDetailsDialog } from "./OrderDetailsDialog";
import { OrderListItem } from "./orders/OrderListItem";
import type { Order } from "@/types/order";

interface OrderListProps {
  orders: Order[];
}

export const OrderList = ({ orders }: OrderListProps) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleDelete = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ is_deleted: true })
        .eq('id', orderId);

      if (error) throw error;

      queryClient.setQueryData<Order[]>(['orders'], (oldData = []) => {
        return oldData.filter(order => order.id !== orderId);
      });

      toast({
        title: "订单已删除",
        description: "订单已从列表中移除",
      });
    } catch (error) {
      console.error('删除订单失败:', error);
      toast({
        title: "删除失败",
        description: "删除订单时出现错误，请稍后重试",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderListItem
          key={order.id}
          order={order}
          onDelete={handleDelete}
          onViewDetails={setSelectedOrder}
        />
      ))}

      <OrderDetailsDialog
        order={selectedOrder!}
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
      />
    </div>
  );
};