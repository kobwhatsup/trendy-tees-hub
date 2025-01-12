import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { OrderDetailsDialog } from "./OrderDetailsDialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";
import { OrderTable } from "./components/OrderTable";
import { OrderFilters } from "./components/OrderFilters";
import { format } from "date-fns";

type Order = Database["public"]["Tables"]["orders"]["Row"] & {
  order_items: Database["public"]["Tables"]["order_items"]["Row"][];
};

type OrderStatus = Database["public"]["Enums"]["order_status"];

type FilterState = {
  search: string;
  status: OrderStatus | "all";
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
};

export const OrderList = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "all",
    dateRange: {
      from: undefined,
      to: undefined,
    },
  });
  const { toast } = useToast();

  const { data: orders, isLoading, refetch } = useQuery({
    queryKey: ["admin-orders", filters],
    queryFn: async () => {
      let query = supabase
        .from("orders")
        .select(`
          *,
          order_items (
            *
          )
        `)
        .order("created_at", { ascending: false });

      // 应用搜索过滤
      if (filters.search) {
        query = query.or(
          `order_number.ilike.%${filters.search}%,recipient_name.ilike.%${filters.search}%`
        );
      }

      // 应用状态过滤
      if (filters.status !== "all") {
        query = query.eq("status", filters.status);
      }

      // 应用日期范围过滤
      if (filters.dateRange.from) {
        query = query.gte(
          "created_at",
          format(filters.dateRange.from, "yyyy-MM-dd")
        );
      }
      if (filters.dateRange.to) {
        query = query.lte(
          "created_at",
          format(filters.dateRange.to, "yyyy-MM-dd")
        );
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Order[];
    },
  });

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq("id", orderId);

      if (error) throw error;

      toast({
        title: "状态更新成功",
        description: `订单状态已更新为${newStatus}`,
      });

      refetch();
    } catch (error) {
      console.error("更新订单状态失败:", error);
      toast({
        variant: "destructive",
        title: "更新失败",
        description: "更新订单状态时发生错误",
      });
    }
  };

  return (
    <div className="space-y-4">
      <OrderFilters filters={filters} onFiltersChange={setFilters} />
      
      {isLoading ? (
        <div>加载中...</div>
      ) : (
        <OrderTable 
          orders={orders}
          onViewDetails={setSelectedOrder}
          onStatusChange={handleStatusChange}
        />
      )}

      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};