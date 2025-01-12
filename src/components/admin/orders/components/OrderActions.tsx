import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Database } from "@/integrations/supabase/types";
import { ChevronDown, Eye, Truck } from "lucide-react";
import { LogisticsDialog } from "./LogisticsDialog";
import { useState } from "react";

type Order = Database["public"]["Tables"]["orders"]["Row"] & {
  order_items: Database["public"]["Tables"]["order_items"]["Row"][];
};

type OrderStatus = Database["public"]["Enums"]["order_status"];

interface OrderActionsProps {
  order: Order;
  onViewDetails: () => void;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
  onLogisticsUpdate: (
    orderId: string,
    data: {
      shipping_company: string;
      tracking_number: string;
      shipping_status: string;
    }
  ) => void;
}

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: "pending_payment", label: "待付款" },
  { value: "paid", label: "已付款" },
  { value: "processing", label: "处理中" },
  { value: "shipped", label: "已发货" },
  { value: "delivered", label: "已送达" },
  { value: "refund_requested", label: "申请退款" },
  { value: "refunded", label: "已退款" },
];

export const OrderActions = ({
  order,
  onViewDetails,
  onStatusChange,
  onLogisticsUpdate,
}: OrderActionsProps) => {
  const [showLogistics, setShowLogistics] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={onViewDetails}>
        <Eye className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {statusOptions.find((option) => option.value === order.status)?.label}
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

      {(order.status === "paid" || order.status === "processing" || order.status === "shipped") && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowLogistics(true)}
        >
          <Truck className="mr-2 h-4 w-4" />
          物流信息
        </Button>
      )}

      <LogisticsDialog
        isOpen={showLogistics}
        onClose={() => setShowLogistics(false)}
        onSubmit={(data) => {
          onLogisticsUpdate(order.id, data);
          setShowLogistics(false);
        }}
        initialData={{
          shipping_company: order.shipping_company || "",
          tracking_number: order.tracking_number || "",
          shipping_status: order.shipping_status || "",
        }}
      />
    </div>
  );
};