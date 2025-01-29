import { useEffect, useState, useRef } from "react";
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

  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    let isMounted = true;

    const startPolling = async () => {
      if (open && qrCodeUrl && isMounted) {
        setIsPolling(true);
        startTimeRef.current = Date.now();
        
        // 每3秒轮询一次支付状态
        pollIntervalRef.current = setInterval(async () => {
          try {
            if (!isMounted) return;

            const status = await checkOrderStatus(orderId);
            updateRemainingTime(startTimeRef.current);

            // 处理不同的支付状态
            switch (status) {
              case 'paid':
                if (isMounted) {
                  handlePaidStatus({ 
                    orderId, 
                    clearIntervals, 
                    setIsPolling, 
                    onOpenChange 
                  });
                }
                break;

              case 'pending_payment':
                console.log('等待支付中，继续轮询...');
                break;

              case 'payment_timeout':
                if (isMounted) {
                  handleTimeoutStatus({ 
                    orderId, 
                    clearIntervals, 
                    setIsPolling, 
                    onOpenChange 
                  });
                }
                break;

              default:
                if (isMounted) {
                  handleErrorStatus({ 
                    orderId, 
                    clearIntervals, 
                    setIsPolling, 
                    onOpenChange 
                  });
                }
            }
          } catch (error) {
            console.error('轮询支付状态时发生错误:', error);
            if (isMounted) {
              clearIntervals();
              setIsPolling(false);
              onOpenChange(false);
              toast({
                title: "系统错误",
                description: "获取支付状态失败，请重试",
                variant: "destructive",
              });
            }
          }
        }, 3000);

        // 5分钟后自动关闭
        pollTimeoutRef.current = setTimeout(() => {
          if (isMounted) {
            handleTimeoutStatus({ 
              orderId, 
              clearIntervals, 
              setIsPolling, 
              onOpenChange 
            });
          }
        }, 5 * 60 * 1000);
      }
    };

    startPolling();

    return () => {
      isMounted = false;
      clearIntervals();
      setIsPolling(false);
    };
  }, [open, qrCodeUrl, orderId]);

  return {
    isPolling,
    remainingTime,
    formatRemainingTime,
  };
};