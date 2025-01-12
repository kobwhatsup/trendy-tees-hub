import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { OrderTable } from "./components/OrderTable";
import { OrderFilters } from "./components/OrderFilters";
import { OrderDetailsDialog } from "./OrderDetailsDialog";
import { useToast } from "@/components/ui/use-toast";
import { useOrders } from "./hooks/useOrders";

type Order = Database["public"]["Tables"]["orders"]["Row"] & {
  order_items: Database["public"]["Tables"]["order_items"]["Row"][];
};

type OrderStatus = Database["public"]["Enums"]["order_status"];

export const OrderList = () => {
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

  const { orders, fetchOrders, handleStatusChange, handleLogisticsUpdate } = useOrders({
    searchTerm,
    statusFilter,
    dateFilter,
  });

  useEffect(() => {
    fetchOrders();
  }, [searchTerm, statusFilter, dateFilter]);

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