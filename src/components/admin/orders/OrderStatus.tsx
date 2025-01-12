import { Badge } from "@/components/ui/badge";

const statusMap = {
  pending_payment: {
    label: "待付款",
    variant: "secondary",
  },
  paid: {
    label: "已付款",
    variant: "default",
  },
  processing: {
    label: "处理中",
    variant: "default",
  },
  shipped: {
    label: "已发货",
    variant: "default",
  },
  delivered: {
    label: "已送达",
    variant: "success",
  },
  refund_requested: {
    label: "申请退款",
    variant: "destructive",
  },
  refunded: {
    label: "已退款",
    variant: "destructive",
  },
  payment_timeout: {
    label: "支付超时",
    variant: "destructive",
  },
} as const;

interface OrderStatusProps {
  status: keyof typeof statusMap;
}

export const OrderStatus = ({ status }: OrderStatusProps) => {
  const { label, variant } = statusMap[status];
  return <Badge variant={variant as any}>{label}</Badge>;
};