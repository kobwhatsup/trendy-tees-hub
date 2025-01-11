import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { AddressDialog } from "./address/AddressDialog";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { CartItemType } from "@/types/cart";

interface OrderConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItemType[];
}

export const OrderConfirmDialog = ({ open, onOpenChange, items }: OrderConfirmDialogProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [address, setAddress] = useState("请添加收货地址");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + ((item.price || 199) * item.quantity), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const createOrder = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("用户未登录");

      // 生成订单号 (年月日时分秒 + 4位随机数)
      const now = new Date();
      const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      const orderNumber = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}${randomNum}`;

      // 创建订单
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          total_amount: total,
          status: 'pending_payment'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 创建订单项
      const orderItems = items.map(item => ({
        order_id: order.id,
        design_front: item.design_front,
        design_back: item.design_back,
        preview_front: item.preview_front,
        preview_back: item.preview_back,
        tshirt_style: item.tshirt_style,
        tshirt_color: item.tshirt_color,
        tshirt_gender: item.tshirt_gender,
        tshirt_size: item.tshirt_size,
        quantity: item.quantity,
        unit_price: item.price || 199
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 删除已购买的购物车商品
      const cartItemIds = items.map(item => item.id);
      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .in('id', cartItemIds);

      if (deleteError) throw deleteError;

      // 触发购物车更新事件
      window.dispatchEvent(new Event('cart-updated'));

      // 跳转到订单页面
      navigate('/orders');
      
      toast({
        title: "订单创建成功",
        description: "订单已生成，请尽快完成支付",
      });

    } catch (error) {
      console.error('创建订单失败:', error);
      toast({
        title: "创建订单失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    }
  };

  const handlePayment = async () => {
    if (address === "请添加收货地址") {
      toast({
        title: "请先添加收货地址",
        description: "点击地址栏添加收货地址",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    await createOrder();
    setIsProcessing(false);
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
                {items.map((item, index) => (
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
                      <p className="text-sm">¥{item.price || 199}</p>
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
              disabled={isProcessing}
              className="bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600"
            >
              {isProcessing ? "处理中..." : "立即支付"}
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
