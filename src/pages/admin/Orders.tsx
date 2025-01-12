import { AdminLayout } from "@/components/admin/AdminLayout";
import { OrderList } from "@/components/admin/orders/OrderList";

const Orders = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">订单管理</h1>
        <OrderList />
      </div>
    </AdminLayout>
  );
};

export default Orders;