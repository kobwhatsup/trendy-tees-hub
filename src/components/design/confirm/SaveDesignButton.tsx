import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useAddToCart } from "../hooks/useAddToCart";

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
  backPreviewImage,
}: SaveDesignButtonProps) => {
  const { addToCart, isAdding } = useAddToCart();

  const handleAddToCart = async () => {
    // 确保即使用户没有点击预览，也会保存预览图
    if (!frontPreviewImage || !backPreviewImage) {
      console.error('预览图未生成');
      return;
    }

    await addToCart({
      tshirtStyle,
      tshirtColor,
      tshirtGender,
      tshirtSize,
      frontDesignImage,
      backDesignImage,
      frontPreviewImage,
      backPreviewImage,
    });
  };

  return (
    <Button 
      className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white shadow-lg px-8 py-4 h-auto text-lg rounded-full"
      onClick={handleAddToCart}
      disabled={isAdding || !frontPreviewImage || !backPreviewImage}
    >
      {isAdding ? (
        <>
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          处理中...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-6 w-6" />
          确认设计并提交购物车
        </>
      )}
    </Button>
  );
};