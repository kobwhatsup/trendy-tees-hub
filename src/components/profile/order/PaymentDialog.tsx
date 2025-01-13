import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PrivateKeyInput } from "./PrivateKeyInput";

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

  useEffect(() => {
    if (open && qrCodeUrl) {
      const pollInterval = setInterval(async () => {
        const { data: order } = await supabase
          .from('orders')
          .select('status')
          .eq('id', orderId)
          .single();

        if (order?.status === 'paid') {
          clearInterval(pollInterval);
          onOpenChange(false);
          toast({
            title: "支付成功",
            description: "订单支付已完成",
          });
          window.location.reload();
        }
      }, 3000);

      // 5分钟后停止轮询
      setTimeout(() => {
        clearInterval(pollInterval);
      }, 5 * 60 * 1000);

      return () => clearInterval(pollInterval);
    }
  }, [open, qrCodeUrl, orderId]);

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
            </>
          ) : (
            <div className="space-y-4 w-full">
              <p className="text-sm text-muted-foreground text-center">
                获取支付二维码失败，请更新私钥后重试
              </p>
              <PrivateKeyInput />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};