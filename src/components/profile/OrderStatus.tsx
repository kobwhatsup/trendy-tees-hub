import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { OrderConfirmDialog } from "@/components/cart/OrderConfirmDialog";

interface OrderStatusProps {
  status: string;
  orderItems: any[];
}

export const OrderStatus = ({ status, orderItems }: OrderStatusProps) => {
  const [showPayment, setShowPayment] = useState(false);

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

  return (
    <div className="flex items-center gap-2">
      <Badge variant={getStatusBadgeVariant(status)}>
        {getStatusText(status)}
      </Badge>
      {status === "pending_payment" && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowPayment(true)}
        >
          去支付
        </Button>
      )}
      {showPayment && (
        <OrderConfirmDialog
          open={showPayment}
          onOpenChange={setShowPayment}
          items={orderItems}
        />
      )}
    </div>
  );
};