import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DeleteOrderDialog } from "./DeleteOrderDialog";
import type { Order } from "@/types/order";

interface OrderActionsProps {
  order: Order;
  onDelete: (orderId: string) => void;
  onViewDetails: (order: Order) => void;
}

export const OrderActions = ({ order, onDelete, onViewDetails }: OrderActionsProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete(order.id);
    setShowDeleteDialog(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onViewDetails(order)}
      >
        查看详情
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setShowDeleteDialog(true)}
      >
        删除订单
      </Button>

      <DeleteOrderDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
      />
    </div>
  );
};