import { Truck } from "lucide-react";
import { format } from "date-fns";

interface LogisticsInfoProps {
  shippingCompany: string | null;
  trackingNumber: string | null;
  shippedAt: string | null;
  shippingStatus: string | null;
}

export const LogisticsInfo = ({ 
  shippingCompany, 
  trackingNumber, 
  shippedAt, 
  shippingStatus 
}: LogisticsInfoProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium flex items-center gap-2">
        <Truck className="h-4 w-4" />
        物流信息
      </h3>
      <div className="bg-muted/30 rounded-lg p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">物流公司</span>
          <span className="text-sm">{shippingCompany || '暂无物流信息'}</span>
        </div>
        {trackingNumber && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">物流单号</span>
            <span className="text-sm font-medium">{trackingNumber}</span>
          </div>
        )}
        {shippedAt && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">发货时间</span>
            <span className="text-sm">{format(new Date(shippedAt), "yyyy-MM-dd HH:mm:ss")}</span>
          </div>
        )}
        {shippingStatus && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">物流状态</span>
            <span className="text-sm">{shippingStatus}</span>
          </div>
        )}
      </div>
    </div>
  );
};