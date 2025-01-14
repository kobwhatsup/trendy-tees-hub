import { useState } from "react";
import { PaymentDialog } from "../PaymentDialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PaymentHandlingProps {
  orderId: string;
  totalAmount: number;
  showPaymentDialog: boolean;
  onClosePaymentDialog: () => void;
}

export const PaymentHandling = ({ 
  orderId, 
  totalAmount,
  showPaymentDialog,
  onClosePaymentDialog
}: PaymentHandlingProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCreatePayment = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-wechat-payment', {
        body: {
          orderId,
          amount: Math.round(totalAmount * 100), // 转换为分
          description: `订单支付 #${orderId}`
        }
      });

      if (error) throw error;
      setQrCodeUrl(data.code_url);

    } catch (error) {
      console.error('创建支付失败:', error);
      toast({
        title: "创建支付失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    }
  };

  return (
    <PaymentDialog
      open={showPaymentDialog}
      onOpenChange={onClosePaymentDialog}
      orderId={orderId}
      totalAmount={totalAmount}
      qrCodeUrl={qrCodeUrl}
      onCreatePayment={handleCreatePayment}
    />
  );
};