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
      console.log("开始获取订单数据...");
      
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        console.log("用户未登录");
        toast({
          variant: "destructive",
          title: "获取订单失败",
          description: "请先登录",
        });
        setLoading(false);
        return;
      }

      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq('is_deleted', false)
        .eq('user_id', session.session.user.id)
        .order("created_at", { ascending: false });

      if (ordersError) {
        console.error("获取订单列表错误:", ordersError);
        throw ordersError;
      }

      console.log("成功获取订单列表:", ordersData);

      const ordersWithItems = await Promise.all(
        ordersData.map(async (order) => {
          console.log(`获取订单 ${order.id} 的商品信息...`);
          
          const { data: items, error: itemsError } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", order.id);

          if (itemsError) {
            console.error(`获取订单 ${order.id} 商品信息错误:`, itemsError);
            throw itemsError;
          }

          console.log(`订单 ${order.id} 商品信息:`, items);
          
          return {
            ...order,
            items: items || [],
          };
        })
      );

      console.log("处理完成的订单数据:", ordersWithItems);
      setOrders(ordersWithItems);
      
    } catch (error) {
      console.error("获取订单数据失败:", error);
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

      setOrders(prev => prev.filter(order => order.id !== orderId));

      toast({
        title: "删除成功",
        description: "订单已成功删除",
      });
    } catch (error) {
      console.error("删除订单失败:", error);
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