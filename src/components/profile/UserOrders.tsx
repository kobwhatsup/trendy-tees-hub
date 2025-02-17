import { LoadingState } from "./LoadingState";
import { EmptyOrderState } from "./EmptyOrderState";
import { OrderList } from "./OrderList";
import { useOrders } from "@/hooks/useOrders";
import { useOrderExpand } from "@/hooks/useOrderExpand";
import { useSearchParams } from "react-router-dom";

export const UserOrders = () => {
  const { loading, orders, handleDeleteOrder } = useOrders();
  const { expandedOrders, toggleOrderExpand } = useOrderExpand();
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get("status");

  // 根据状态过滤订单
  const filteredOrders = orders.filter(order => {
    if (!statusFilter || statusFilter === "all") return true;
    
    switch (statusFilter) {
      case "pending_payment":
        return order.status === "pending_payment";
      case "paid":
        return order.status === "paid" || order.status === "processing";
      case "shipped":
        return order.status === "shipped";
      case "refund":
        return order.status === "refund_requested" || order.status === "refunded";
      default:
        return true;
    }
  });

  if (loading) {
    return <LoadingState />;
  }

  if (filteredOrders.length === 0) {
    return <EmptyOrderState />;
  }

  return (
    <OrderList 
      orders={filteredOrders}
      expandedOrders={expandedOrders}
      onToggleOrder={toggleOrderExpand}
      onDeleteOrder={handleDeleteOrder}
    />
  );
};