import { CartItemType } from "@/types/cart";

interface OrderItemsSectionProps {
  items: CartItemType[];
}

export const OrderItemsSection = ({ items }: OrderItemsSectionProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm">商品信息</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-start p-3 bg-muted rounded-lg">
            <div className="space-y-1">
              <p className="text-sm">
                {item.tshirt_gender === 'male' ? '男款' : '女款'} 
                {item.tshirt_style === 'short' ? '短袖' : '长袖'}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.tshirt_color} / {item.tshirt_size}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm">¥{item.price || 199}</p>
              <p className="text-xs text-muted-foreground">x{item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};