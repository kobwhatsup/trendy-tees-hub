import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { OrderStatus } from "./OrderStatus";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface OrderDetailsDialogProps {
  order: any; // 稍后我们会添加具体的类型定义
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailsDialog = ({ order, isOpen, onClose }: OrderDetailsDialogProps) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>订单详情</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 基本信息 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">基本信息</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground">订单号：</span>
                <span>{order.order_number}</span>
              </div>
              <div>
                <span className="text-muted-foreground">下单时间：</span>
                <span>{format(new Date(order.created_at), "yyyy-MM-dd HH:mm:ss")}</span>
              </div>
              <div>
                <span className="text-muted-foreground">订单状态：</span>
                <OrderStatus status={order.status} />
              </div>
              <div>
                <span className="text-muted-foreground">订单金额：</span>
                <span>¥{order.total_amount}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* 收货信息 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">收货信息</h3>
            <div className="space-y-2">
              <div>
                <span className="text-muted-foreground">收货人：</span>
                <span>{order.recipient_name}</span>
              </div>
              <div>
                <span className="text-muted-foreground">联系电话：</span>
                <span>{order.recipient_phone}</span>
              </div>
              <div>
                <span className="text-muted-foreground">收货地址：</span>
                <span>{order.shipping_address}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* 物流信息 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">物流信息</h3>
            <div className="space-y-2">
              {order.shipping_company ? (
                <>
                  <div>
                    <span className="text-muted-foreground">物流公司：</span>
                    <span>{order.shipping_company}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">物流单号：</span>
                    <span>{order.tracking_number}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">发货时间：</span>
                    <span>
                      {order.shipped_at
                        ? format(new Date(order.shipped_at), "yyyy-MM-dd HH:mm:ss")
                        : "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">物流状态：</span>
                    <span>{order.shipping_status || "-"}</span>
                  </div>
                </>
              ) : (
                <div className="text-muted-foreground">暂无物流信息</div>
              )}
            </div>
          </div>

          <Separator />

          {/* 商品信息 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">商品信息</h3>
            <div className="space-y-4">
              {order.order_items?.map((item: any) => (
                <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-muted-foreground">款式：</span>
                      <span>{item.tshirt_style}</span>
                      <span className="text-muted-foreground ml-4">颜色：</span>
                      <span>{item.tshirt_color}</span>
                      <span className="text-muted-foreground ml-4">尺码：</span>
                      <span>{item.tshirt_size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">数量：</span>
                      <span>{item.quantity}</span>
                      <span className="text-muted-foreground ml-4">单价：</span>
                      <span>¥{item.unit_price}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {item.preview_front && (
                      <img
                        src={item.preview_front}
                        alt="正面预览"
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                    {item.preview_back && (
                      <img
                        src={item.preview_back}
                        alt="背面预览"
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
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