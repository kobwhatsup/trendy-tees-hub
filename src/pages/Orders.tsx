import { AuthCheck } from "@/components/designs/AuthCheck";
import { UserOrders } from "@/components/profile/UserOrders";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get("status") || "all";

  const handleStatusChange = (value: string) => {
    setSearchParams({ status: value });
  };

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 pt-20 pb-8 md:pb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="hover:bg-muted flex items-center gap-1 pl-2 pr-4"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>返回</span>
            </Button>
            <h1 className="text-2xl font-bold">订单管理</h1>
          </div>
          <div className="relative">
            <input
              type="search"
              placeholder="搜索订单"
              className="px-4 py-2 rounded-lg border bg-background"
            />
          </div>
        </div>
        
        <Tabs value={currentStatus} onValueChange={handleStatusChange} className="mb-6">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="all" className="min-w-[80px]">全部</TabsTrigger>
            <TabsTrigger value="pending_payment" className="min-w-[80px]">待付款</TabsTrigger>
            <TabsTrigger value="paid" className="min-w-[80px]">待发货</TabsTrigger>
            <TabsTrigger value="shipped" className="min-w-[80px]">待收货</TabsTrigger>
            <TabsTrigger value="refund" className="min-w-[80px]">退款/售后</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <UserOrders />
      </div>
    </AuthCheck>
  );
};

export default Orders;