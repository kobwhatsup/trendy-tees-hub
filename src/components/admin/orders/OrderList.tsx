import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { OrderTable } from "./components/OrderTable";
import { OrderFilters } from "./components/OrderFilters";
import { OrderDetailsDialog } from "./OrderDetailsDialog";
import { useToast } from "@/components/ui/use-toast";

type Order = Database["public"]["Tables"]["orders"]["Row"] & {
  order_items: Database["public"]["Tables"]["order_items"]["Row"][];
};

type OrderStatus = Database["public"]["Enums"]["order_status"];

export const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | null>(null);
  const [dateFilter, setDateFilter] = useState<{
    from: Date | null;
    to: Date | null;
  }>({
    from: null,
    to: null,
  });
  const { toast } = useToast();

  const fetchOrders = async () => {
    let query = supabase
      .from("orders")
      .select(`*, order_items (*)`)
      .order("created_at", { ascending: false });

    if (searchTerm) {
      query = query.or(
        `order_number.ilike.%${searchTerm}%,recipient_name.ilike.%${searchTerm}%`
      );
    }

    if (statusFilter) {
      query = query.eq("status", statusFilter);
    }

    if (dateFilter.from) {
      query = query.gte("created_at", dateFilter.from.toISOString());
    }

    if (dateFilter.to) {
      query = query.lte(
        "created_at",
        new Date(dateFilter.to.getTime() + 86400000).toISOString()
      );
    }

    const { data, error } = await query;

    if (error) {
      toast({
        variant: "destructive",
        title: "获取订单失败",
        description: error.message,
      });
      return;
    }

    setOrders(data as Order[]);
  };

  useEffect(() => {
    fetchOrders();
  }, [searchTerm, statusFilter, dateFilter]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      toast({
        variant: "destructive",
        title: "更新状态失败",
        description: error.message,
      });
      return;
    }

    toast({
      title: "更新成功",
      description: "订单状态已更新",
    });

    fetchOrders();
  };

  const handleLogisticsUpdate = async (
    orderId: string,
    data: {
      shipping_company: string;
      tracking_number: string;
      shipping_status: string;
    }
  ) => {
    const { error } = await supabase
      .from("orders")
      .update({
        ...data,
        status: "shipped",
        shipped_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (error) {
      toast({
        variant: "destructive",
        title: "更新物流信息失败",
        description: error.message,
      });
      return;
    }

    toast({
      title: "更新成功",
      description: "物流信息已更新",
    });

    fetchOrders();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter(null);
    setDateFilter({ from: null, to: null });
  };

  return (
    <div className="space-y-4">
      <OrderFilters
        onSearch={setSearchTerm}
        onStatusFilter={setStatusFilter}
        onDateFilter={setDateFilter}
        onClearFilters={handleClearFilters}
      />

      <OrderTable
        orders={orders}
        onViewDetails={setSelectedOrder}
        onStatusChange={handleStatusChange}
        onLogisticsUpdate={handleLogisticsUpdate}
      />

      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};