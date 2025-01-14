import { useState } from "react";
import { OrderActionButtons } from "./actions/OrderActionButtons";
import { OrderMoreActions } from "./actions/OrderMoreActions";
import { PaymentHandling } from "./actions/PaymentHandling";
import { RefundHandling } from "./actions/RefundHandling";

interface OrderActionsProps {
  orderId: string;
  status: string;
  totalAmount: number;
  onDelete: (orderId: string) => void;
  onViewDetails: () => void;
}

export const OrderActions = ({ 
  orderId, 
  status, 
  totalAmount,
  onDelete, 
  onViewDetails 
}: OrderActionsProps) => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center border-t pt-3">
        <OrderMoreActions 
          orderId={orderId}
          onDelete={onDelete}
        />
        
        <OrderActionButtons 
          status={status}
          orderId={orderId}
          totalAmount={totalAmount}
          onPayment={() => setShowPaymentDialog(true)}
          onViewDetails={onViewDetails}
          onRefundRequest={() => setShowRefundDialog(true)}
        />
      </div>

      <PaymentHandling 
        orderId={orderId}
        totalAmount={totalAmount}
        showPaymentDialog={showPaymentDialog}
        onClosePaymentDialog={() => setShowPaymentDialog(false)}
      />

      <RefundHandling 
        orderId={orderId}
        showRefundDialog={showRefundDialog}
        onCloseRefundDialog={() => setShowRefundDialog(false)}
      />
    </>
  );
};