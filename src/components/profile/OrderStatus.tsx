import { Badge } from "@/components/ui/badge";

interface OrderStatusProps {
  status: string;
  orderNumber: string;
  totalAmount: number;
}

export const OrderStatus = ({ status }: OrderStatusProps) => {
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
      refund_requested: "退款申请中",
      refunded: "已退款",
    };
    return statusMap[status] || status;
  };

  return (
    <Badge variant={getStatusBadgeVariant(status)} className="px-2 py-1">
      {getStatusText(status)}
    </Badge>
  );
};