import { useState } from "react";
import { AuthCheck } from "@/components/designs/AuthCheck";
import { UserOrders } from "@/components/profile/UserOrders";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 pt-20 pb-8 md:pb-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">订单管理</h1>
          <div className="relative">
            <input
              type="search"
              placeholder="搜索订单"
              className="px-4 py-2 rounded-lg border bg-background"
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-6" onValueChange={setStatusFilter}>
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="all" className="min-w-[80px]">全部</TabsTrigger>
            <TabsTrigger value="pending_payment" className="min-w-[80px]">待付款</TabsTrigger>
            <TabsTrigger value="processing" className="min-w-[80px]">待发货</TabsTrigger>
            <TabsTrigger value="shipped" className="min-w-[80px]">待收货</TabsTrigger>
            <TabsTrigger value="refund" className="min-w-[80px]">退款/售后</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <UserOrders statusFilter={statusFilter} />
      </div>
    </AuthCheck>
  );
};

export default Orders;