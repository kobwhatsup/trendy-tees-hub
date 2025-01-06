import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { saveDesignToDatabase } from "./saveDesignToDatabase";

interface SaveDesignButtonProps {
  tshirtStyle: string;
  tshirtColor: string;
  tshirtGender: string;
  tshirtSize: string;
  frontDesignImage?: string;
  backDesignImage?: string;
  frontPreviewImage?: string;
  backPreviewImage?: string;
}

export const SaveDesignButton = ({ 
  tshirtStyle, 
  tshirtColor, 
  tshirtGender,
  tshirtSize,
  frontDesignImage,
  backDesignImage,
  frontPreviewImage,
  backPreviewImage
}: SaveDesignButtonProps) => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (isAdding) return;
    setIsAdding(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "请先登录",
          description: "添加商品到购物车需要先登录",
          variant: "destructive",
        });
        return;
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

      if ((window as Window).showAddToCartAnimation) {
        (window as Window).showAddToCartAnimation();
      }

      toast({
        title: "添加成功",
        description: "设计已添加到购物车",
      });
    } catch (error) {
      console.error('添加到购物车失败:', error);
      toast({
        title: "添加失败",
        description: error.message || "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button 
      className="bg-[#3B82F6] hover:bg-[#2563EB] transition-colors shadow-lg px-8 py-4 h-auto text-lg rounded-full"
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      {isAdding ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          正在添加到购物车...
        </>
      ) : (
        <>
          <Check className="mr-2 h-5 w-5" />
          确认设计并加入购物车
        </>
      )}
    </Button>
  );
};