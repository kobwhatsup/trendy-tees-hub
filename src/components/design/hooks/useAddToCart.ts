import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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
        return false;
      }

      await saveDesignToDatabase({
        userId: user.id,
        frontDesignImage,
        backDesignImage,
        frontPreviewImage,
        backPreviewImage,
        tshirtStyle,
        tshirtColor,
        tshirtGender,
        tshirtSize,
      });

      return true;

    } catch (error) {
      console.error('添加到购物车失败:', error);
      toast({
        title: "添加失败",
        description: "添加到购物车时出现错误，请重试",
        className: "bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] text-white border-none",
      });
      return false;
    } finally {
      setIsAdding(false);
    }
  };

  return { addToCart, isAdding };
};