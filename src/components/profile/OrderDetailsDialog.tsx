import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { OrderItems } from "./OrderItems";
import { Button } from "../ui/button";
import type { Order } from "@/types/order";
import { OrderHeader } from "./order/OrderHeader";
import { ShippingInfo } from "./order/ShippingInfo";
import { LogisticsInfo } from "./order/LogisticsInfo";
import { OrderSummary } from "./order/OrderSummary";

interface OrderDetailsDialogProps {
  order: Order;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OrderDetailsDialog = ({ order, open, onOpenChange }: OrderDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            订单详情
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 overflow-y-auto flex-1 pr-2">
          {/* 订单状态和时间信息 */}
          <OrderHeader 
            orderNumber={order.order_number}
            createdAt={order.created_at}
            status={order.status}
            totalAmount={Number(order.total_amount)}
          />

          {/* 收货地址信息 */}
          <ShippingInfo 
            recipientName={order.recipient_name}
            shippingAddress={order.shipping_address}
            recipientPhone={order.recipient_phone}
          />

          {/* 物流信息 */}
          <LogisticsInfo 
            shippingCompany={order.shipping_company}
            trackingNumber={order.tracking_number}
            shippedAt={order.shipped_at}
            shippingStatus={order.shipping_status}
          />

          {/* 商品信息 */}
          <div className="space-y-2">
            <h3 className="font-medium">商品信息</h3>
            <div className="bg-muted/30 rounded-lg">
              <OrderItems 
                items={order.items} 
                expanded={true}
                onToggle={() => {}}
              />
            </div>
          </div>

          {/* 订单信息 */}
          <OrderSummary 
            orderNumber={order.order_number}
            createdAt={order.created_at}
            paidAt={order.paid_at}
            shippedAt={order.shipped_at}
            totalAmount={Number(order.total_amount)}
          />

          {/* 底部操作按钮 */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            {order.status === 'delivered' && (
              <Button variant="outline" size="sm">
                评价
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};