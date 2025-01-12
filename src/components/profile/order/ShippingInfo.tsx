import { MapPin, Phone } from "lucide-react";

interface ShippingInfoProps {
  recipientName: string | null;
  shippingAddress: string | null;
  recipientPhone: string | null;
}

export const ShippingInfo = ({ recipientName, shippingAddress, recipientPhone }: ShippingInfoProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        收货地址
      </h3>
      <div className="bg-muted/30 rounded-lg p-4">
        <p className="text-sm">{recipientName}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {shippingAddress}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{recipientPhone}</p>
        </div>
      </div>
    </div>
  );
};