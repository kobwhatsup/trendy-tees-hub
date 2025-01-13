import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { AddressDialog } from "./address/AddressDialog";
import { CartItemType } from "@/types/cart";
import { AddressType } from "./address/types";
import { PaymentDialog } from "./order/PaymentDialog";
import { OrderAddressSection } from "./order/OrderAddressSection";
import { OrderItemsSection } from "./order/OrderItemsSection";
import { OrderSummarySection } from "./order/OrderSummarySection";
import { useOrderCreation } from "./order/hooks/useOrderCreation";

interface OrderConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItemType[];
}

export const OrderConfirmDialog = ({ open, onOpenChange, items }: OrderConfirmDialogProps) => {
  const { toast } = useToast();
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [address, setAddress] = useState("请添加收货地址");
  const [addressInfo, setAddressInfo] = useState<AddressType | null>(null);
  
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + ((item.price || 0.01) * item.quantity), 0);  // 修改默认价格为0.01
  const shipping = 0;
  const total = subtotal + shipping;

  const { isProcessing, orderId, qrCodeUrl, createOrder } = useOrderCreation(items, total);

  const handlePayment = async () => {
    if (address === "请添加收货地址" || !addressInfo) {
      toast({
        title: "请先添加收货地址",
        description: "点击地址栏添加收货地址",
        variant: "destructive",
      });
      return;
    }

    const result = await createOrder(addressInfo);
    if (result) {
      setShowPaymentDialog(true);
      onOpenChange(false);
    }
  };

  const handleAddressSelect = (addressData: AddressType) => {
    setAddressInfo(addressData);
    setAddress(`${addressData.recipient_name} ${addressData.phone}\n${addressData.address}`);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>订单确认</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <OrderAddressSection 
              address={address}
              setShowAddressDialog={setShowAddressDialog}
              showAddressDialog={showAddressDialog}
              handleAddressSelect={handleAddressSelect}
            />

            <OrderItemsSection items={items} />

            <OrderSummarySection 
              totalQuantity={totalQuantity}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
            />
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600"
            >
              {isProcessing ? "处理中..." : "立即支付"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        orderId={orderId}
        totalAmount={total}
        qrCodeUrl={qrCodeUrl}
      />
    </>
  );
};