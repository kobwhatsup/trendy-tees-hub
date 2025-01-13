import { LoadingState } from "./LoadingState";
import { EmptyOrderState } from "./EmptyOrderState";
import { OrderList } from "./OrderList";
import { useOrders } from "@/hooks/useOrders";
import { useOrderExpand } from "@/hooks/useOrderExpand";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import { PrivateKeyDialog } from "./order/PrivateKeyDialog";
import { useState } from "react";

export const UserOrders = () => {
  const { loading, orders, handleDeleteOrder } = useOrders();
  const { expandedOrders, toggleOrderExpand } = useOrderExpand();
  const [showPrivateKeyDialog, setShowPrivateKeyDialog] = useState(false);

  if (loading) {
    return <LoadingState />;
  }

  if (orders.length === 0) {
    return <EmptyOrderState />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowPrivateKeyDialog(true)}
          className="flex items-center gap-2"
        >
          <Key className="h-4 w-4" />
          管理微信支付私钥
        </Button>
      </div>

      <OrderList 
        orders={orders}
        expandedOrders={expandedOrders}
        onToggleOrder={toggleOrderExpand}
        onDeleteOrder={handleDeleteOrder}
      />

      <PrivateKeyDialog
        open={showPrivateKeyDialog}
        onOpenChange={setShowPrivateKeyDialog}
      />
    </div>
  );
};