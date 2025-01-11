import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";
import { CartItemType } from "@/types/cart";

interface CartContainerProps {
  cartItems: CartItemType[];
  selectedItems: Set<string>;
  onSelect: (id: string, selected: boolean) => void;
  onUpdate: () => void;
}

export const CartContainer = ({ 
  cartItems, 
  selectedItems, 
  onSelect, 
  onUpdate 
}: CartContainerProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleCheckout = async () => {
    if (selectedItems.size === 0) {
      toast({
        title: "请选择商品",
        description: "请至少选择一件商品进行结算",
      });
      return;
    }
    toast({
      title: "功能开发中",
      description: "支付功能即将上线",
    });
  };

  return (
    <>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem 
            key={item.id}
            {...item}
            selected={selectedItems.has(item.id)}
            onSelect={onSelect}
            onUpdate={onUpdate}
          />
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg">
        <div className={`container mx-auto ${isMobile ? 'px-2' : 'px-4'}`}>
          <CartSummary 
            items={cartItems.map(item => ({
              quantity: item.quantity,
              price: item.price || 199,
              selected: selectedItems.has(item.id),
              tshirt_style: item.tshirt_style,
              tshirt_color: item.tshirt_color,
              tshirt_gender: item.tshirt_gender,
              tshirt_size: item.tshirt_size
            }))}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </>
  );
};