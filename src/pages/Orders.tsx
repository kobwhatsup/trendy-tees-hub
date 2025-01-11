import { AuthCheck } from "@/components/designs/AuthCheck";
import { UserOrders } from "@/components/profile/UserOrders";

const Orders = () => {
  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-2xl font-bold mb-8">订单管理</h1>
        <UserOrders />
      </div>
    </AuthCheck>
  );
};

export default Orders;