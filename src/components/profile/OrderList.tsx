import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { OrderStatus } from "./OrderStatus";
import { OrderItems } from "./OrderItems";
import { Order } from "@/types/order";

interface OrderListProps {
  orders: Order[];
  expandedOrders: string[];
  onToggleOrder: (orderId: string) => void;
}

export const OrderList = ({ orders, expandedOrders, onToggleOrder }: OrderListProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>商品信息</TableHead>
              <TableHead className="text-right">订单金额</TableHead>
              <TableHead>订单状态</TableHead>
              <TableHead>下单时间</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <OrderItems 
                    items={order.items}
                    expanded={expandedOrders.includes(order.id)}
                    onToggle={() => onToggleOrder(order.id)}
                  />
                </TableCell>
                <TableCell className="text-right">¥{order.total_amount}</TableCell>
                <TableCell>
                  <OrderStatus status={order.status} orderItems={order.items} />
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