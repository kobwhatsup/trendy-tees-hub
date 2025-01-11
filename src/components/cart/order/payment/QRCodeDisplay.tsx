import { QRCodeSVG } from "qrcode.react";
import { Loader2 } from "lucide-react";

interface QRCodeDisplayProps {
  qrCodeUrl: string | null;
  totalAmount: number;
  isPolling: boolean;
  remainingTime: number;
  formatRemainingTime: (seconds: number) => string;
}

export const QRCodeDisplay = ({
  qrCodeUrl,
  totalAmount,
  isPolling,
  remainingTime,
  formatRemainingTime,
}: QRCodeDisplayProps) => {
  if (!qrCodeUrl) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white p-4 rounded-lg">
        <QRCodeSVG value={qrCodeUrl} size={200} />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        请使用微信扫描二维码完成支付
      </p>
      <p className="text-sm text-muted-foreground">
        支付金额: ¥{totalAmount}
      </p>
      <div className="flex items-center gap-2 mt-2">
        {isPolling && <Loader2 className="h-4 w-4 animate-spin" />}
        <p className="text-xs text-muted-foreground">
          {isPolling ? "正在等待支付结果..." : ""}
        </p>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        二维码有效期: {formatRemainingTime(remainingTime)}
      </p>
    </>
  );
};