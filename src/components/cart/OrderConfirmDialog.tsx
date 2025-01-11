import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { AddressDialog } from "./address/AddressDialog";

interface OrderConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: Array<{
    quantity: number;
    price: number;
    selected: boolean;
    tshirt_style: string;
    tshirt_color: string;
    tshirt_gender: string;
    tshirt_size: string;
  }>;
}

export const OrderConfirmDialog = ({ open, onOpenChange, items }: OrderConfirmDialogProps) => {
  const { toast } = useToast();
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [address, setAddress] = useState("请添加收货地址");
  const selectedItems = items.filter(item => item.selected);
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // 运费默认为0
  const total = subtotal + shipping;

  const handlePayment = () => {
    if (address === "请添加收货地址") {
      toast({
        title: "请先添加收货地址",
        description: "点击地址栏添加收货地址",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "支付功能开发中",
      description: "支付系统即将上线",
    });
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>订单确认</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* 收货地址 */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm">收货地址</h3>
              <div 
                className="p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80"
                onClick={() => setShowAddressDialog(true)}
              >
                <p className="text-sm text-muted-foreground">{address}</p>
              </div>
            </div>

            {/* 商品信息 */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm">商品信息</h3>
              <div className="space-y-3">
                {selectedItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-start p-3 bg-muted rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm">
                        {item.tshirt_gender === 'male' ? '男款' : '女款'} 
                        {item.tshirt_style === 'short' ? '短袖' : '长袖'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.tshirt_color} / {item.tshirt_size}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">¥{item.price}</p>
                      <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 订单汇总 */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm">订单汇总</h3>
              <div className="space-y-2 p-3 bg-muted rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>商品总计</span>
                  <span>{totalQuantity}件</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>商品金额</span>
                  <span>¥{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>运费</span>
                  <span>¥{shipping}</span>
                </div>
                <div className="flex justify-between text-sm font-medium pt-2 border-t">
                  <span>应付金额</span>
                  <span className="text-red-500">¥{total}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handlePayment}
              className="bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600"
            >
              立即支付
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AddressDialog 
        open={showAddressDialog}
        onOpenChange={setShowAddressDialog}
        onAddressSelect={setAddress}
      />
    </>
  );
};