import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const UserOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // TODO: 实现订单查询功能
    setLoading(false);
  }, []);

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
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.productInfo}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};