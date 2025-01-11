import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

  useEffect(() => {
    if (open && qrCodeUrl) {
      // 开始轮询支付状态
      pollIntervalRef.current = setInterval(async () => {
        const { data: order } = await supabase
          .from('orders')
          .select('status')
          .eq('id', orderId)
          .single();

        if (order?.status === 'paid') {
          // 支付成功
          clearInterval(pollIntervalRef.current);
          clearTimeout(pollTimeoutRef.current);
          onOpenChange(false);
          toast({
            title: "支付成功",
            description: "订单支付已完成",
          });
          window.location.reload();
        } else if (order?.status === 'pending_payment') {
          // 继续轮询
          console.log('Payment pending, continue polling...');
        } else {
          // 其他状态（包括支付超时）
          clearInterval(pollIntervalRef.current);
          clearTimeout(pollTimeoutRef.current);
          onOpenChange(false);
          toast({
            title: "支付异常",
            description: "订单支付状态异常，请重新下单",
            variant: "destructive",
          });
          window.location.reload();
        }
      }, 3000);

      // 设置5分钟超时
      pollTimeoutRef.current = setTimeout(() => {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
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
      };
    }
  }, [open, qrCodeUrl, orderId, onOpenChange, toast]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>微信扫码支付</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4">
          {qrCodeUrl && (
            <div className="bg-white p-4 rounded-lg">
              <QRCodeSVG value={qrCodeUrl} size={200} />
            </div>
          )}
          <p className="mt-4 text-sm text-muted-foreground">
            请使用微信扫描二维码完成支付
          </p>
          <p className="text-sm text-muted-foreground">
            支付金额: ¥{totalAmount}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            二维码5分钟内有效
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};