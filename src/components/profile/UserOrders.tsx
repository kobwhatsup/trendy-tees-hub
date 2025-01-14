import { LoadingState } from "./LoadingState";
import { EmptyOrderState } from "./EmptyOrderState";
import { OrderList } from "./OrderList";
import { useOrders } from "@/hooks/useOrders";
import { useOrderExpand } from "@/hooks/useOrderExpand";

interface UserOrdersProps {
  statusFilter: string;
}

export const UserOrders = ({ statusFilter }: UserOrdersProps) => {
  const { loading, orders, handleDeleteOrder } = useOrders();
  const { expandedOrders, toggleOrderExpand } = useOrderExpand();

  // 根据状态筛选订单
  const filteredOrders = orders.filter(order => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'refund') {
      return order.status === 'refund_requested' || order.status === 'refunded';
    }
    return order.status === statusFilter;
  });

  if (loading) {
    return <LoadingState />;
  }

  if (orders.length === 0) {
    return <EmptyOrderState />;
  }

  if (filteredOrders.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow">
        <p className="text-muted-foreground">暂无{statusFilter === 'all' ? '' : '相关'}订单</p>
      </div>
    );
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