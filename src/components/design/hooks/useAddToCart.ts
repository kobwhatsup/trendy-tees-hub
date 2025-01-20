import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { saveDesignToDatabase } from "../confirm/saveDesignToDatabase";
import { supabase } from "@/integrations/supabase/client";

interface AddToCartProps {
  tshirtStyle: string;
  tshirtColor: string;
  tshirtGender: string;
  tshirtSize: string;
  frontDesignImage?: string;
  backDesignImage?: string;
  frontPreviewImage?: string;
  backPreviewImage?: string;
}

export const useAddToCart = () => {
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const addToCart = async ({
    tshirtStyle,
    tshirtColor,
    tshirtGender,
    tshirtSize,
    frontDesignImage,
    backDesignImage,
    frontPreviewImage,
    backPreviewImage,
  }: AddToCartProps) => {
    try {
      setIsAdding(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "请先登录",
          description: "添加到购物车需要先登录账号",
          className: "bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] text-white border-none",
        });
        return;
      }

      // 保存到购物车
      const { error: cartError } = await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          design_front: frontDesignImage,
          design_back: backDesignImage,
          preview_front: frontPreviewImage,
          preview_back: backPreviewImage,
          tshirt_style: tshirtStyle,
          tshirt_color: tshirtColor,
          tshirt_gender: tshirtGender,
          tshirt_size: tshirtSize,
        });

      if (cartError) {
        throw cartError;
      }

      toast({
        title: "添加成功",
        description: "设计已保存并添加到购物车",
        className: "bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] text-white border-none",
      });

    } catch (error) {
      console.error('添加到购物车失败:', error);
      toast({
        title: "添加失败",
        description: "添加到购物车时出现错误，请重试",
        className: "bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] text-white border-none",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return { addToCart, isAdding };
};