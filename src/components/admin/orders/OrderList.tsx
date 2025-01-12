import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/components/admin/orders/OrderStatus";
import { OrderDetailsDialog } from "./OrderDetailsDialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const OrderList = () => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { toast } = useToast();

  const { data: orders, isLoading, refetch } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            *
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleStatusChange = async (orderId: string, newStatus: string) => {
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

  if (isLoading) {
    return <div>加载中...</div>;
  }

  const statusOptions = [
    { value: "pending_payment", label: "待付款" },
    { value: "paid", label: "已付款" },
    { value: "processing", label: "处理中" },
    { value: "shipped", label: "已发货" },
    { value: "delivered", label: "已送达" },
    { value: "refund_requested", label: "申请退款" },
    { value: "refunded", label: "已退款" },
    { value: "payment_timeout", label: "支付超时" },
  ];

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>订单号</TableHead>
              <TableHead>下单时间</TableHead>
              <TableHead>收件人</TableHead>
              <TableHead>金额</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.order_number}</TableCell>
                <TableCell>
                  {format(new Date(order.created_at), "yyyy-MM-dd HH:mm")}
                </TableCell>
                <TableCell>{order.recipient_name}</TableCell>
                <TableCell>¥{order.total_amount}</TableCell>
                <TableCell>
                  <OrderStatus status={order.status} />
                </TableCell>
                <TableCell className="space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        更改状态
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {statusOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => handleStatusChange(order.id, option.value)}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    查看详情
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};