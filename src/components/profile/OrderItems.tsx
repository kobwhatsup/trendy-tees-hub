import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getValidImageUrl } from "@/utils/imageUrl";

interface OrderItemsProps {
  items: any[];
  expanded: boolean;
  onToggle: () => void;
}

export const OrderItems = ({ items, expanded, onToggle }: OrderItemsProps) => {
  return (
    <Collapsible open={expanded}>
      <CollapsibleTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onToggle}
          className="w-full justify-start p-0 font-normal"
        >
          {expanded ? (
            <ChevronUp className="h-4 w-4 mr-2" />
          ) : (
            <ChevronDown className="h-4 w-4 mr-2" />
          )}
          {items.length} 件商品
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 mt-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-4 p-2 rounded-lg bg-muted/50">
            {item.preview_front && (
              <img
                src={getValidImageUrl(item.preview_front)}
                alt="商品预览图"
                className="w-16 h-16 object-cover rounded bg-white"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">
                {item.tshirt_gender === 'male' ? '男款' : '女款'}{" "}
                {item.tshirt_style === 'short' ? '短袖' : '长袖'}{" "}
                {item.tshirt_color === 'white' ? '白色' : '黑色'}
              </div>
              <div className="text-sm text-muted-foreground">
                尺码: {item.tshirt_size.toUpperCase()}
              </div>
              <div className="text-sm text-muted-foreground">
                数量: {item.quantity} × ¥{item.unit_price}
              </div>
            </div>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};