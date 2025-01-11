import { MoreVertical, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrderActionsProps {
  orderId: string;
  status: string;
  onDelete: (orderId: string) => void;
  onViewDetails: () => void;
}

export const OrderActions = ({ orderId, status, onDelete, onViewDetails }: OrderActionsProps) => {
  return (
    <div className="flex justify-between items-center border-t pt-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4 mr-1" />
            更多
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem 
            className="text-destructive"
            onClick={() => onDelete(orderId)}
          >
            <Trash className="h-4 w-4 mr-2" />
            删除订单
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onViewDetails}
        >
          订单详情
        </Button>
        {status === 'shipped' && (
          <Button variant="secondary" size="sm">
            确认收货
          </Button>
        )}
      </div>
    </div>
  );
};