import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useCartItemQuantity = (
  id: string, 
  initialQuantity: number,
  onUpdate: () => void
) => {
  const [localQuantity, setLocalQuantity] = useState(initialQuantity);
  const { toast } = useToast();

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setLocalQuantity(newQuantity);
    
    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', id);

      if (error) throw error;
      onUpdate();
    } catch (error) {
      setLocalQuantity(initialQuantity);
      console.error('更新数量失败:', error);
      toast({
        title: "更新失败",
        description: "更新商品数量时出错，请稍后重试",
        variant: "destructive",
      });
    }
  };

  return {
    quantity: localQuantity,
    updateQuantity
  };
};