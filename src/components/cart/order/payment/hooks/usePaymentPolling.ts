import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const pollIntervalRef = useRef<NodeJS.Timeout>();
  const pollTimeoutRef = useRef<NodeJS.Timeout>();
  const [isPolling, setIsPolling] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300); // 5分钟有效期

  useEffect(() => {
    if (open && qrCodeUrl) {
      setIsPolling(true);
      let startTime = Date.now();
      
      // 每3秒轮询一次支付状态
      pollIntervalRef.current = setInterval(async () => {
        try {
          console.log('开始轮询订单状态:', orderId);
          
          // 查询订单状态
          const { data: order, error } = await supabase
            .from('orders')
            .select('status, order_number')
            .eq('id', orderId)
            .single();

          if (error) {
            console.error('轮询支付状态时发生错误:', error);
            throw error;
          }

          console.log('当前订单状态:', order?.status);

          // 更新剩余时间
          const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
          const remaining = Math.max(300 - elapsedTime, 0);
          setRemainingTime(remaining);

          // 处理不同的支付状态
          switch (order?.status) {
            case 'paid':
              console.log('支付成功，订单号:', order.order_number);
              clearInterval(pollIntervalRef.current);
              clearTimeout(pollTimeoutRef.current);
              setIsPolling(false);
              onOpenChange(false);
              toast({
                title: "支付成功",
                description: "订单支付已完成，正在跳转到订单页面",
              });
              // 延迟1秒后跳转，让用户看到成功提示
              setTimeout(() => {
                navigate('/orders');
              }, 1000);
              break;

            case 'pending_payment':
              console.log('等待支付中，继续轮询...');
              break;

            case 'payment_timeout':
              console.log('支付超时');
              clearInterval(pollIntervalRef.current);
              clearTimeout(pollTimeoutRef.current);
              setIsPolling(false);
              onOpenChange(false);
              toast({
                title: "支付超时",
                description: "二维码已过期，请重新下单",
                variant: "destructive",
              });
              navigate('/orders');
              break;

            default:
              console.log('订单状态异常:', order?.status);
              clearInterval(pollIntervalRef.current);
              clearTimeout(pollTimeoutRef.current);
              setIsPolling(false);
              onOpenChange(false);
              toast({
                title: "支付异常",
                description: "订单支付状态异常，请重新下单",
                variant: "destructive",
              });
              navigate('/orders');
          }
        } catch (error) {
          console.error('轮询支付状态时发生错误:', error);
          clearInterval(pollIntervalRef.current);
          clearTimeout(pollTimeoutRef.current);
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
        console.log('支付超时，自动关闭');
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
        setIsPolling(false);
        onOpenChange(false);
        toast({
          title: "支付超时",
          description: "二维码已过期，请重新下单",
          variant: "destructive",
        });
        navigate('/orders');
      }, 5 * 60 * 1000);

      // 清理函数
      return () => {
        console.log('清理轮询定时器');
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
        if (pollTimeoutRef.current) {
          clearTimeout(pollTimeoutRef.current);
        }
        setIsPolling(false);
      };
    }
  }, [open, qrCodeUrl, orderId, onOpenChange, toast, navigate]);

  const formatRemainingTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    isPolling,
    remainingTime,
    formatRemainingTime,
  };
};