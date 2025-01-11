import { MoreVertical, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { QRCodeSVG } from "qrcode.react";  // 修改为使用命名导出

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

      // 开始轮询支付状态
      startPollingPaymentStatus();

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

  const startPollingPaymentStatus = () => {
    const pollInterval = setInterval(async () => {
      const { data: order } = await supabase
        .from('orders')
        .select('status')
        .eq('id', orderId)
        .single();

      if (order?.status === 'paid') {
        clearInterval(pollInterval);
        setShowPaymentDialog(false);
        toast({
          title: "支付成功",
          description: "订单支付已完成",
        });
        window.location.reload(); // 刷新页面以更新订单状态
      }
    }, 3000); // 每3秒检查一次

    // 5分钟后停止轮询
    setTimeout(() => {
      clearInterval(pollInterval);
    }, 5 * 60 * 1000);
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
            <Button variant="secondary" size="sm">
              确认收货
            </Button>
          )}
        </div>
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};