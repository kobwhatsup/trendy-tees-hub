import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"] & {
  order_items: Database["public"]["Tables"]["order_items"]["Row"][];
};

type OrderStatus = Database["public"]["Enums"]["order_status"];

interface OrderActionsProps {
  order: Order;
  onViewDetails: () => void;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

export const OrderActions = ({ order, onViewDetails, onStatusChange }: OrderActionsProps) => {
  const statusOptions: { value: OrderStatus; label: string }[] = [
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
    <div className="space-x-2">
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
              onClick={() => onStatusChange(order.id, option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Badge 
        variant="outline" 
        className="cursor-pointer"
        onClick={onViewDetails}
      >
        查看详情
      </Badge>
    </div>
  );
};