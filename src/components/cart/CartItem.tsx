import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DesignImage } from "./DesignImage";
import { ProductInfo } from "./ProductInfo";
import { QuantityControls } from "./QuantityControls";
import { TShirtPreview } from "../design/TShirtPreview";

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
  front_design_settings = {
    scale: 0.8,
    rotation: 0,
    opacity: 1,
    position: "front",
    offsetX: 0,
    offsetY: 30
  },
  back_design_settings = {
    scale: 0.8,
    rotation: 0,
    opacity: 1,
    position: "back",
    offsetX: 0,
    offsetY: 10
  }
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
        <div className="grid grid-cols-1 gap-4">
          {design_front && (
            <div className="flex flex-col items-center">
              <DesignImage 
                imageUrl={design_front} 
                title="正面设计" 
              />
            </div>
          )}
          {design_back && (
            <div className="flex flex-col items-center">
              <DesignImage 
                imageUrl={design_back} 
                title="背面设计" 
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4">
          {preview_front && (
            <div className="flex flex-col items-center">
              <h3 className="font-medium mb-2 text-center">正面效果</h3>
              <TShirtPreview
                color={tshirt_color}
                style={tshirt_style}
                gender={tshirt_gender}
                designImage={design_front}
                settings={front_design_settings}
              />
            </div>
          )}
          {preview_back && (
            <div className="flex flex-col items-center">
              <h3 className="font-medium mb-2 text-center">背面效果</h3>
              <TShirtPreview
                color={tshirt_color}
                style={tshirt_style}
                gender={tshirt_gender}
                designImage={design_back}
                settings={back_design_settings}
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 space-y-4">
        <ProductInfo 
          style={tshirt_style}
          gender={tshirt_gender}
          color={tshirt_color}
          size={tshirt_size}
          material="棉"
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