import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface OrderStatusProps {
  status: string;
  orderNumber: string;
  totalAmount: number;
}

export const OrderStatus = ({ status, orderNumber, totalAmount }: OrderStatusProps) => {
  const { toast } = useToast();

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

  const handlePayment = async () => {
    // 这里我们模拟跳转到支付页面
    // TODO: 实际项目中需要接入真实的支付网关
    const paymentUrl = `https://example.com/pay?order_number=${orderNumber}&amount=${totalAmount}`;
    
    toast({
      title: "正在跳转到支付页面",
      description: "即将跳转到支付平台...",
    });

    // 模拟支付跳转
    console.log("Payment URL:", paymentUrl);
  };

  return (
    <div className="flex items-center gap-2">
      <Badge variant={getStatusBadgeVariant(status)} className="px-2 py-1">
        {getStatusText(status)}
      </Badge>
      {status === "pending_payment" && (
        <Button 
          variant="secondary" 
          size="sm"
          onClick={handlePayment}
        >
          去支付
        </Button>
      )}
    </div>
  );
};