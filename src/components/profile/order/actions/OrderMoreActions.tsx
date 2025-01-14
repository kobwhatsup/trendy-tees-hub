import { Button } from "@/components/ui/button";
import { MoreVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrderMoreActionsProps {
  orderId: string;
  onDelete: (orderId: string) => void;
}

export const OrderMoreActions = ({ orderId, onDelete }: OrderMoreActionsProps) => {
  return (
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
  );
};