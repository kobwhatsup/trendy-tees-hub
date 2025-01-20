import { LoadingState } from "./LoadingState";
import { EmptyOrderState } from "./EmptyOrderState";
import { OrderList } from "./OrderList";
import { useOrders } from "@/hooks/useOrders";
import { useOrderExpand } from "@/hooks/useOrderExpand";

export const UserOrders = () => {
  const { loading, orders, handleDeleteOrder } = useOrders();
  const { expandedOrders, toggleOrderExpand } = useOrderExpand();

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