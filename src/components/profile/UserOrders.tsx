import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LoadingState } from "./LoadingState";
import { EmptyOrderState } from "./EmptyOrderState";
import { OrderList } from "./OrderList";
import type { Order } from "@/types/order";

export const UserOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq('is_deleted', false)
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      const ordersWithItems = await Promise.all(
        ordersData.map(async (order) => {
          const { data: items, error: itemsError } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", order.id);

          if (itemsError) throw itemsError;

          return {
            ...order,
            items: items || [],
          };
        })
      );

      setOrders(ordersWithItems);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast({
        variant: "destructive",
        title: "获取订单失败",
        description: "请稍后重试",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ is_deleted: true })
        .eq('id', orderId);

      if (error) throw error;

      // 更新本地状态，移除已删除的订单
      setOrders(prev => prev.filter(order => order.id !== orderId));

      toast({
        title: "删除成功",
        description: "订单已成功删除",
      });
    } catch (error) {
      console.error("Error deleting order:", error);
      toast({
        variant: "destructive",
        title: "删除失败",
        description: "请稍后重试",
      });
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (orders.length === 0) {
    return <EmptyOrderState />;
  }

  return (
    <OrderList 
      orders={orders}
      expandedOrders={expandedOrders}
      onToggleOrder={toggleOrderExpand}
      onDeleteOrder={handleDeleteOrder}
    />
  );
};