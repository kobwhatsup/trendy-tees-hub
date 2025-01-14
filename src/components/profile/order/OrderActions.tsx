import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PaymentDialog } from "./PaymentDialog";
import { RefundDialog } from "./RefundDialog";

interface OrderActionsProps {
  orderId: string;
  status: string;
  totalAmount: number;
  onDelete: (orderId: string) => void;
  onViewDetails: () => void;
}

export const OrderActions = ({ 
  orderId, 
  status, 
  totalAmount,
  onDelete, 
  onViewDetails 
}: OrderActionsProps) => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      
      const { data, error } = await supabase.functions.invoke('create-wechat-payment', {
        body: {
          orderId,
          amount: Math.round(totalAmount * 100), // 转换为分
          description: `订单支付 #${orderId}`
        }
      });

      if (error) throw error;
      
      setQrCodeUrl(data.code_url);
      setShowPaymentDialog(true);

    } catch (error) {
      console.error('创建支付失败:', error);
      toast({
        title: "创建支付失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

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

  const handleRefundRequest = () => {
    setShowRefundDialog(true);
  };

  return (
    <>
      <div className="flex justify-between items-center border-t pt-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4 mr-1" />
              更多
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem 
              className="text-destructive"
              onClick={() => onDelete(orderId)}
            >
              <Trash className="h-4 w-4 mr-2" />
              删除订单
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
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
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? "处理中..." : "去支付"}
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
              onClick={handleRefundRequest}
            >
              申请退款
            </Button>
          )}
        </div>
      </div>

      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        orderId={orderId}
        totalAmount={totalAmount}
        qrCodeUrl={qrCodeUrl}
      />

      <RefundDialog 
        open={showRefundDialog}
        onOpenChange={setShowRefundDialog}
        orderId={orderId}
        onSuccess={() => {
          // 刷新页面以更新订单状态
          window.location.reload();
        }}
      />
    </>
  );
};