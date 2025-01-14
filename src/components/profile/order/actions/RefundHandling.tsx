import { RefundDialog } from "../RefundDialog";

interface RefundHandlingProps {
  orderId: string;
  showRefundDialog: boolean;
  onCloseRefundDialog: () => void;
}

export const RefundHandling = ({ 
  orderId, 
  showRefundDialog,
  onCloseRefundDialog
}: RefundHandlingProps) => {
  return (
    <RefundDialog 
      open={showRefundDialog}
      onOpenChange={onCloseRefundDialog}
      orderId={orderId}
      onSuccess={() => {
        window.location.reload();
      }}
    />
  );
};