import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProductInfo } from "./ProductInfo";
import { QuantityControls } from "./QuantityControls";
import { DesignPreview } from "./DesignPreview";

interface DesignSettings {
  scale: number;
  rotation: number;
  opacity: number;
  position: "front" | "back";
  offsetX: number;
  offsetY: number;
}

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
  front_design_settings?: DesignSettings;
  back_design_settings?: DesignSettings;
  price?: number;
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
  quantity,
  onUpdate,
  front_design_settings,
  back_design_settings,
  price = 199
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
    <div className="flex gap-6 p-6 bg-white rounded-lg shadow">
      <DesignPreview 
        design_front={design_front}
        design_back={design_back}
        preview_front={preview_front}
        preview_back={preview_back}
        tshirt_style={tshirt_style}
        tshirt_color={tshirt_color}
        tshirt_gender={tshirt_gender}
        front_design_settings={front_design_settings}
        back_design_settings={back_design_settings}
      />
      
      <div className="flex flex-col justify-between min-w-[200px]">
        <ProductInfo 
          style={tshirt_style}
          gender={tshirt_gender}
          color={tshirt_color}
          size={tshirt_size}
          material="棉"
          price={price}
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