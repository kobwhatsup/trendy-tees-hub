import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PaymentStatusHandlerProps {
  orderId: string;
  setIsPolling: (isPolling: boolean) => void;
  onOpenChange: (open: boolean) => void;
  clearIntervals: () => void;
}

export const usePaymentStatus = () => {
  const { toast } = useToast();

  const handlePaidStatus = ({ clearIntervals, setIsPolling, onOpenChange }: PaymentStatusHandlerProps) => {
    clearIntervals();
    setIsPolling(false);
    onOpenChange(false);
    toast({
      title: "支付成功",
      description: "订单支付已完成",
    });
    window.location.reload();
  };

  const handleTimeoutStatus = ({ clearIntervals, setIsPolling, onOpenChange }: PaymentStatusHandlerProps) => {
    clearIntervals();
    setIsPolling(false);
    onOpenChange(false);
    toast({
      title: "支付超时",
      description: "二维码已过期，请重新下单",
      variant: "destructive",
    });
    window.location.reload();
  };

  const handleErrorStatus = ({ clearIntervals, setIsPolling, onOpenChange }: PaymentStatusHandlerProps) => {
    clearIntervals();
    setIsPolling(false);
    onOpenChange(false);
    toast({
      title: "支付异常",
      description: "订单支付状态异常，请重新下单",
      variant: "destructive",
    });
    window.location.reload();
  };

  const checkOrderStatus = async (orderId: string) => {
    console.log('正在查询订单状态:', orderId);
    const { data: order, error } = await supabase
      .from('orders')
      .select('status')
      .eq('id', orderId)
      .single();

    if (error) {
      console.error('查询订单状态时发生错误:', error);
      throw error;
    }

    console.log('查询到的订单状态:', order?.status);
    return order?.status;
  };

  return {
    handlePaidStatus,
    handleTimeoutStatus,
    handleErrorStatus,
    checkOrderStatus,
  };
};