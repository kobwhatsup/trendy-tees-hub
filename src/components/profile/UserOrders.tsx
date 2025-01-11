import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  tshirt_style: string;
  tshirt_color: string;
  tshirt_gender: string;
  tshirt_size: string;
  quantity: number;
  unit_price: number;
  preview_front?: string;
  preview_back?: string;
}

export const UserOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      const ordersWithItems = await Promise.all(
        ordersData.map(async (order) => {
          const { data: items, error: itemsError } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", order.id);

          if (itemsError) throw itemsError;

          return {
            ...order,
            items: items || [],
          };
        })
      );

      setOrders(ordersWithItems);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast({
        variant: "destructive",
        title: "获取订单失败",
        description: "请稍后重试",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "default";
      case "processing":
        return "secondary";
      case "completed":
        return "success";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: "待付款",
      processing: "处理中",
      completed: "已完成",
      cancelled: "已取消",
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">
            暂无订单记录
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>订单编号</TableHead>
              <TableHead>商品信息</TableHead>
              <TableHead>订单金额</TableHead>
              <TableHead>订单状态</TableHead>
              <TableHead>下单时间</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.order_number}</TableCell>
                <TableCell>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        {item.preview_front && (
                          <img
                            src={item.preview_front}
                            alt="T恤预览图"
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <div className="text-sm">
                            {item.tshirt_gender === "male" ? "男款" : "女款"} {" "}
                            {item.tshirt_style === "short" ? "短袖" : "长袖"} {" "}
                            {item.tshirt_color === "white" ? "白色" : "黑色"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            尺码: {item.tshirt_size} × {item.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>¥{order.total_amount}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(order.status)}>
                    {getStatusText(order.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(order.created_at), "yyyy-MM-dd HH:mm:ss")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};