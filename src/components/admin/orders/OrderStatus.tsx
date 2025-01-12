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
  shipped: {
    label: "已发货",
    variant: "default",
  },
  delivered: {
    label: "已送达",
    variant: "success",
  },
  cancelled: {
    label: "已取消",
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