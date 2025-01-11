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
          className="w-full justify-start p-0 font-normal hover:no-underline"
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
          <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
            <div className="relative w-20 h-20 bg-white rounded overflow-hidden flex-shrink-0">
              {item.preview_front && (
                <img
                  src={getValidImageUrl(item.preview_front)}
                  alt="商品预览图"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="text-sm font-medium">
                {item.tshirt_gender === 'male' ? '男款' : '女款'}{" "}
                {item.tshirt_style === 'short' ? '短袖' : '长袖'}{" "}
                {item.tshirt_color === 'white' ? '白色' : '黑色'}
              </div>
              <div className="text-sm text-muted-foreground">
                尺码: {item.tshirt_size.toUpperCase()}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  数量: {item.quantity}
                </div>
                <div className="text-sm font-medium">
                  ¥{item.unit_price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};