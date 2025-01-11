import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { OrderItems } from "./OrderItems";
import { OrderStatus } from "./OrderStatus";
import { Package2, MapPin, Phone } from "lucide-react";
import type { Order } from "@/types/order";
import { Button } from "../ui/button";

interface OrderDetailsDialogProps {
  order: Order;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OrderDetailsDialog = ({ order, open, onOpenChange }: OrderDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package2 className="h-5 w-5" />
            订单详情
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 订单状态和时间信息 */}
          <div className="flex justify-between items-start border-b pb-4">
            <div className="space-y-1">
              <p className="text-lg font-medium">订单编号: {order.order_number}</p>
              <p className="text-sm text-muted-foreground">
                下单时间: {format(new Date(order.created_at), "yyyy-MM-dd HH:mm:ss")}
              </p>
            </div>
            <OrderStatus 
              status={order.status} 
              orderNumber={order.order_number}
              totalAmount={Number(order.total_amount)}
            />
          </div>

          {/* 收货地址信息 */}
          <div className="space-y-2">
            <h3 className="font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              收货地址
            </h3>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm">{order.recipient_name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {order.shipping_address}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{order.recipient_phone}</p>
              </div>
            </div>
          </div>

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
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-medium">订单信息</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">订单编号</span>
                <span className="font-medium">{order.order_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">创建时间</span>
                <span>{format(new Date(order.created_at), "yyyy-MM-dd HH:mm:ss")}</span>
              </div>
              {order.paid_at && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">付款时间</span>
                  <span>{format(new Date(order.paid_at), "yyyy-MM-dd HH:mm:ss")}</span>
                </div>
              )}
              {order.shipped_at && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">发货时间</span>
                  <span>{format(new Date(order.shipped_at), "yyyy-MM-dd HH:mm:ss")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">总金额</span>
                <span className="font-medium">¥{order.total_amount}</span>
              </div>
            </div>
          </div>

          {/* 底部操作按钮 */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" size="sm">
              再次购买
            </Button>
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