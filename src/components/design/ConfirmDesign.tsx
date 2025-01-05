import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ConfirmDesignProps {
  tshirtStyle: string;
  tshirtColor: string;
  tshirtGender: string;
  frontDesignImage?: string;
  backDesignImage?: string;
}

export const ConfirmDesign = ({ 
  tshirtStyle, 
  tshirtColor, 
  tshirtGender,
  frontDesignImage,
  backDesignImage 
}: ConfirmDesignProps) => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (isAdding) return; // 防止重复点击
    
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

      // 使用单个数据库操作添加商品
      const { error } = await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          design_front: frontDesignImage,
          design_back: backDesignImage,
          tshirt_style: tshirtStyle,
          tshirt_color: tshirtColor,
          tshirt_gender: tshirtGender,
        })
        .select()
        .single();

      if (error) throw error;

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
      className="w-full" 
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      {isAdding ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          正在添加到购物车...
        </>
      ) : (
        <>
          <Check className="mr-2 h-4 w-4" />
          确认设计并加入购物车
        </>
      )}
    </Button>
  );
};