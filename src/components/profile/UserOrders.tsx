import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
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
      case "pending_payment":
        return "default";
      case "paid":
        return "secondary";
      case "processing":
        return "secondary";
      case "shipped":
        return "default";
      case "delivered":
        return "success";
      case "refund_requested":
        return "destructive";
      case "refunded":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending_payment: "待付款",
      paid: "已支付",
      processing: "处理中",
      shipped: "已发货",
      delivered: "已送达",
      refund_requested: "申请退款",
      refunded: "已退款",
    };
    return statusMap[status] || status;
  };

  const getTshirtStyleText = (style: string) => {
    return style === "short" ? "短袖" : "长袖";
  };

  const getTshirtColorText = (color: string) => {
    return color === "white" ? "白色" : "黑色";
  };

  const getTshirtGenderText = (gender: string) => {
    return gender === "male" ? "男款" : "女款";
  };

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
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
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">订单编号</TableHead>
              <TableHead>商品信息</TableHead>
              <TableHead className="w-[100px] text-right">订单金额</TableHead>
              <TableHead className="w-[100px]">订单状态</TableHead>
              <TableHead className="w-[180px]">下单时间</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.order_number}</TableCell>
                <TableCell>
                  <Collapsible open={expandedOrders.includes(order.id)}>
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleOrderExpand(order.id)}
                        className="w-full justify-start p-0 font-normal"
                      >
                        {expandedOrders.includes(order.id) ? (
                          <ChevronUp className="h-4 w-4 mr-2" />
                        ) : (
                          <ChevronDown className="h-4 w-4 mr-2" />
                        )}
                        {order.items.length} 件商品
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-2 rounded-lg bg-muted/50">
                          {item.preview_front && (
                            <img
                              src={item.preview_front}
                              alt="T恤预览图"
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium">
                              {getTshirtGenderText(item.tshirt_gender)}{" "}
                              {getTshirtStyleText(item.tshirt_style)}{" "}
                              {getTshirtColorText(item.tshirt_color)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              尺码: {item.tshirt_size.toUpperCase()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              数量: {item.quantity} × ¥{item.unit_price}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </TableCell>
                <TableCell className="text-right">¥{order.total_amount}</TableCell>
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