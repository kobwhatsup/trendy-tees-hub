import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProductInfo } from "./ProductInfo";
import { DesignPreview } from "./DesignPreview";
import { useCartItemQuantity } from "@/hooks/useCartItemQuantity";
import { useIsMobile } from "@/hooks/use-mobile";
import { Checkbox } from "@/components/ui/checkbox";

interface CartItemProps {
  id: string;
  design_front: string | null;
  design_back: string | null;
  preview_front: string | null;
  preview_back: string | null;
  tshirt_style: string;
  tshirt_color: string;
  tshirt_gender: string;
  tshirt_size: string;
  quantity: number;
  onUpdate: () => void;
  price?: number;
  selected: boolean;
  onSelect: (id: string, selected: boolean) => void;
}

export const CartItem = ({ 
  id,
  design_front,
  design_back,
  preview_front,
  preview_back,
  tshirt_style,
  tshirt_color,
  tshirt_gender,
  tshirt_size,
  quantity: initialQuantity,
  onUpdate,
  price = 0.01,
  selected,
  onSelect
}: CartItemProps) => {
  const { toast } = useToast();
  const { quantity, updateQuantity } = useCartItemQuantity(id, initialQuantity, onUpdate);
  const isMobile = useIsMobile();

  const removeItem = async () => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      onUpdate();
      toast({
        title: "删除成功",
        description: "商品已从购物车中移除",
      });
    } catch (error) {
      console.error('删除商品失败:', error);
      toast({
        title: "删除失败",
        description: "删除商品时出错，请稍后重试",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-[1px] rounded-lg bg-gradient-to-r from-blue-400 to-red-400">
      <div className={`flex ${isMobile ? 'flex-col' : 'gap-4'} p-4 bg-white rounded-lg`}>
        <div className="flex items-start gap-4">
          <Checkbox 
            checked={selected}
            onCheckedChange={(checked) => onSelect(id, checked as boolean)}
            className="mt-2"
          />
          <DesignPreview 
            design_front={design_front}
            design_back={design_back}
            preview_front={preview_front}
            preview_back={preview_back}
            tshirt_style={tshirt_style}
            tshirt_color={tshirt_color}
            tshirt_gender={tshirt_gender}
          />
        </div>
        
        <div className={`flex flex-col ${isMobile ? 'mt-4' : 'min-w-[200px]'}`}>
          <ProductInfo 
            style={tshirt_style}
            gender={tshirt_gender}
            color={tshirt_color}
            size={tshirt_size}
            material="棉"
            price={price}
            quantity={quantity}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        </div>
      </div>
    </div>
  );
};