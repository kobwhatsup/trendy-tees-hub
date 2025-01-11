import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { OrderItems } from "./OrderItems";
import { OrderStatus } from "./OrderStatus";
import type { Order } from "@/types/order";

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
          <DialogTitle>订单详情</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-muted-foreground">订单编号</p>
                <p className="font-medium">{order.order_number}</p>
              </div>
              <OrderStatus 
                status={order.status} 
                orderNumber={order.order_number}
                totalAmount={Number(order.total_amount)}
              />
            </div>
            
            <div>
              <p className="text-muted-foreground">下单时间</p>
              <p className="font-medium">
                {format(new Date(order.created_at), "yyyy-MM-dd HH:mm:ss")}
              </p>
            </div>
            
            <div>
              <p className="text-muted-foreground">总金额</p>
              <p className="font-medium">¥{order.total_amount}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">商品信息</h3>
            <div className="bg-muted/30 rounded-lg p-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 py-2">
                  {item.preview_front && (
                    <img
                      src={item.preview_front}
                      alt="商品预览图"
                      className="w-20 h-20 object-cover rounded bg-white"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">
                      {item.tshirt_gender === 'male' ? '男款' : '女款'}{" "}
                      {item.tshirt_style === 'short' ? '短袖' : '长袖'}{" "}
                      {item.tshirt_color === 'white' ? '白色' : '黑色'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      尺码: {item.tshirt_size.toUpperCase()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      数量: {item.quantity} × ¥{item.unit_price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};