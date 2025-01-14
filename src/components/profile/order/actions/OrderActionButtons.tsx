import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface OrderActionButtonsProps {
  status: string;
  orderId: string;
  totalAmount: number;
  onPayment: () => void;
  onViewDetails: () => void;
  onRefundRequest: () => void;
}

export const OrderActionButtons = ({
  status,
  orderId,
  totalAmount,
  onPayment,
  onViewDetails,
  onRefundRequest,
}: OrderActionButtonsProps) => {
  const { toast } = useToast();

  const handleConfirmReceipt = async () => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'delivered',
          delivered_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "确认成功",
        description: "已确认收货",
      });

    } catch (error) {
      console.error('确认收货失败:', error);
      toast({
        title: "确认失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={onViewDetails}
      >
        订单详情
      </Button>
      
      {status === 'pending_payment' && (
        <Button 
          variant="secondary" 
          size="sm"
          onClick={onPayment}
        >
          去支付
        </Button>
      )}
      
      {status === 'shipped' && (
        <Button 
          variant="secondary" 
          size="sm"
          onClick={handleConfirmReceipt}
        >
          确认收货
        </Button>
      )}
      
      {status === 'delivered' && (
        <Button 
          variant="secondary" 
          size="sm"
          onClick={onRefundRequest}
        >
          申请退款
        </Button>
      )}
    </div>
  );
};