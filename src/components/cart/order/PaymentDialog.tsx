import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRCodeDisplay } from "./payment/QRCodeDisplay";
import { usePaymentPolling } from "./payment/hooks/usePaymentPolling";
import { useEffect } from "react";
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
  const { isPolling, remainingTime, formatRemainingTime } = usePaymentPolling({
    orderId,
    qrCodeUrl,
    open,
    onOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>微信扫码支付</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4">
          <QRCodeDisplay
            qrCodeUrl={qrCodeUrl}
            totalAmount={totalAmount}
            isPolling={isPolling}
            remainingTime={remainingTime}
            formatRemainingTime={formatRemainingTime}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};