import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  totalAmount: number;
  qrCodeUrl: string | null;
}

export const PaymentDialog = ({
  open,
  onOpenChange,
  orderId,
  totalAmount,
  qrCodeUrl
}: PaymentDialogProps) => {
  const { toast } = useToast();
  const pollIntervalRef = useRef<NodeJS.Timeout>();
  const pollTimeoutRef = useRef<NodeJS.Timeout>();
  const [isPolling, setIsPolling] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300); // 5分钟倒计时

  useEffect(() => {
    if (open && qrCodeUrl) {
      setIsPolling(true);
      let startTime = Date.now();
      
      // 开始轮询支付状态
      pollIntervalRef.current = setInterval(async () => {
        try {
          const { data: order, error } = await supabase
            .from('orders')
            .select('status')
            .eq('id', orderId)
            .single();

          if (error) throw error;

          // 更新剩余时间
          const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
          const remaining = Math.max(300 - elapsedTime, 0);
          setRemainingTime(remaining);

          if (order?.status === 'paid') {
            // 支付成功
            clearInterval(pollIntervalRef.current);
            clearTimeout(pollTimeoutRef.current);
            setIsPolling(false);
            onOpenChange(false);
            toast({
              title: "支付成功",
              description: "订单支付已完成",
            });
            window.location.reload();
          } else if (order?.status === 'pending_payment') {
            // 继续轮询
            console.log('Payment pending, continue polling...');
          } else if (order?.status === 'payment_timeout') {
            // 支付超时
            clearInterval(pollIntervalRef.current);
            clearTimeout(pollTimeoutRef.current);
            setIsPolling(false);
            onOpenChange(false);
            toast({
              title: "支付超时",
              description: "二维码已过期，请重新下单",
              variant: "destructive",
            });
            window.location.reload();
          } else {
            // 其他异常状态
            clearInterval(pollIntervalRef.current);
            clearTimeout(pollTimeoutRef.current);
            setIsPolling(false);
            onOpenChange(false);
            toast({
              title: "支付异常",
              description: "订单支付状态异常，请重新下单",
              variant: "destructive",
            });
            window.location.reload();
          }
        } catch (error) {
          console.error('Error polling payment status:', error);
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

      // 设置5分钟超时
      pollTimeoutRef.current = setTimeout(() => {
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
      }, 5 * 60 * 1000);

      return () => {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
        if (pollTimeoutRef.current) {
          clearTimeout(pollTimeoutRef.current);
        }
        setIsPolling(false);
      };
    }
  }, [open, qrCodeUrl, orderId, onOpenChange, toast]);

  // 格式化剩余时间
  const formatRemainingTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>微信扫码支付</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4">
          {qrCodeUrl ? (
            <>
              <div className="bg-white p-4 rounded-lg">
                <QRCodeSVG value={qrCodeUrl} size={200} />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                请使用微信扫描二维码完成支付
              </p>
              <p className="text-sm text-muted-foreground">
                支付金额: ¥{totalAmount}
              </p>
              <div className="flex items-center gap-2 mt-2">
                {isPolling && <Loader2 className="h-4 w-4 animate-spin" />}
                <p className="text-xs text-muted-foreground">
                  {isPolling ? "正在等待支付结果..." : ""}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                二维码有效期: {formatRemainingTime(remainingTime)}
              </p>
            </>
          ) : (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};