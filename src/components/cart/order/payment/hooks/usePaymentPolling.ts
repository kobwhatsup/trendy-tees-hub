import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePaymentStatus } from "./usePaymentStatus";
import { usePaymentTimer } from "./usePaymentTimer";

interface UsePaymentPollingProps {
  orderId: string;
  qrCodeUrl: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const usePaymentPolling = ({
  orderId,
  qrCodeUrl,
  open,
  onOpenChange,
}: UsePaymentPollingProps) => {
  const { toast } = useToast();
  const [isPolling, setIsPolling] = useState(false);
  const {
    remainingTime,
    pollIntervalRef,
    pollTimeoutRef,
    clearIntervals,
    updateRemainingTime,
    formatRemainingTime,
  } = usePaymentTimer();
  
  const {
    handlePaidStatus,
    handleTimeoutStatus,
    handleErrorStatus,
    checkOrderStatus,
  } = usePaymentStatus();

  useEffect(() => {
    if (open && qrCodeUrl) {
      setIsPolling(true);
      let startTime = Date.now();
      
      // 每3秒轮询一次支付状态
      pollIntervalRef.current = setInterval(async () => {
        try {
          const status = await checkOrderStatus(orderId);
          updateRemainingTime(startTime);

          console.log('当前订单状态:', status);

          // 处理不同的支付状态
          switch (status) {
            case 'paid':
              handlePaidStatus({ orderId, clearIntervals, setIsPolling, onOpenChange });
              break;

            case 'pending_payment':
              console.log('等待支付中，继续轮询...');
              break;

            case 'payment_timeout':
              handleTimeoutStatus({ orderId, clearIntervals, setIsPolling, onOpenChange });
              break;

            default:
              handleErrorStatus({ orderId, clearIntervals, setIsPolling, onOpenChange });
          }
        } catch (error) {
          console.error('轮询支付状态时发生错误:', error);
          clearIntervals();
          setIsPolling(false);
          onOpenChange(false);
          toast({
            title: "系统错误",
            description: "获取支付状态失败，请重试",
            variant: "destructive",
          });
        }
      }, 3000);

      // 5分钟后自动关闭
      pollTimeoutRef.current = setTimeout(() => {
        handleTimeoutStatus({ orderId, clearIntervals, setIsPolling, onOpenChange });
      }, 5 * 60 * 1000);

      return () => {
        clearIntervals();
        setIsPolling(false);
      };
    }
  }, [open, qrCodeUrl, orderId, onOpenChange, toast]);

  return {
    isPolling,
    remainingTime,
    formatRemainingTime,
  };
};