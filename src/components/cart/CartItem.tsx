import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DesignImage } from "./DesignImage";
import { ProductInfo } from "./ProductInfo";
import { QuantityControls } from "./QuantityControls";

interface CartItemProps {
  id: string;
  design_front: string | null;
  design_back: string | null;
  tshirt_style: string;
  tshirt_color: string;
  tshirt_gender: string;
  quantity: number;
  onUpdate: () => void;
}

export const CartItem = ({
  id,
  design_front,
  design_back,
  tshirt_style,
  tshirt_color,
  tshirt_gender,
  quantity,
  onUpdate
}: CartItemProps) => {
  const { toast } = useToast();

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', id);

      if (error) throw error;
      onUpdate();
    } catch (error) {
      console.error('更新数量失败:', error);
      toast({
        title: "更新失败",
        description: "更新商品数量时出错，请稍后重试",
        variant: "destructive",
      });
    }
  };

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
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        {design_front && (
          <DesignImage 
            imageUrl={design_front} 
            title="正面设计" 
          />
        )}
        {design_back && (
          <DesignImage 
            imageUrl={design_back} 
            title="背面设计" 
          />
        )}
      </div>
      
      <div className="flex-1 space-y-4">
        <ProductInfo 
          style={tshirt_style}
          gender={tshirt_gender}
          color={tshirt_color}
        />
        
        <QuantityControls 
          quantity={quantity}
          onUpdateQuantity={updateQuantity}
          onRemove={removeItem}
        />
      </div>
    </div>
  );
};