import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database } from "@/integrations/supabase/types";
import { format } from "date-fns";
import { OrderActions } from "./OrderActions";
import { OrderStatus } from "../OrderStatus";

type Order = Database["public"]["Tables"]["orders"]["Row"] & {
  order_items: Database["public"]["Tables"]["order_items"]["Row"][];
};

interface OrderTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  onStatusChange: (orderId: string, newStatus: Database["public"]["Enums"]["order_status"]) => void;
  onLogisticsUpdate: (
    orderId: string,
    data: {
      shipping_company: string;
      tracking_number: string;
      shipping_status: string;
    }
  ) => void;
}

export const OrderTable = ({
  orders,
  onViewDetails,
  onStatusChange,
  onLogisticsUpdate,
}: OrderTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>订单号</TableHead>
          <TableHead>收件人</TableHead>
          <TableHead>金额</TableHead>
          <TableHead>状态</TableHead>
          <TableHead>创建时间</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.order_number}</TableCell>
            <TableCell>{order.recipient_name}</TableCell>
            <TableCell>¥{order.total_amount}</TableCell>
            <TableCell>
              <OrderStatus status={order.status} />
            </TableCell>
            <TableCell>
              {format(new Date(order.created_at), "yyyy-MM-dd HH:mm")}
            </TableCell>
            <TableCell>
              <OrderActions
                order={order}
                onViewDetails={() => onViewDetails(order)}
                onStatusChange={onStatusChange}
                onLogisticsUpdate={onLogisticsUpdate}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};