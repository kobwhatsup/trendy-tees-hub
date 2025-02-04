import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useAddToCart } from "../hooks/useAddToCart";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { TShirtPreview } from "../preview/TShirtPreview";

interface SaveDesignButtonProps {
  tshirtStyle: string;
  tshirtColor: string;
  tshirtGender: string;
  tshirtSize: string;
  frontDesignImage?: string;
  backDesignImage?: string;
  frontPreviewImage?: string;
  backPreviewImage?: string;
  frontDesignSettings?: any;
  backDesignSettings?: any;
}

export const SaveDesignButton = ({
  tshirtStyle,
  tshirtColor,
  tshirtGender,
  tshirtSize,
  frontDesignImage,
  backDesignImage,
  frontDesignSettings,
  backDesignSettings,
}: SaveDesignButtonProps) => {
  const { addToCart, isAdding } = useAddToCart();
  const [isGeneratingPreviews, setIsGeneratingPreviews] = useState(false);
  const frontPreviewRef = useRef<HTMLDivElement>(null);
  const backPreviewRef = useRef<HTMLDivElement>(null);

  const generatePreview = async (ref: HTMLDivElement | null) => {
    if (!ref) return null;
    try {
      const canvas = await html2canvas(ref, {
        useCORS: true,
        backgroundColor: null,
        scale: 2,
        logging: true,
      });
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('生成预览图失败:', error);
      return null;
    }
  };

  const handleAddToCart = async () => {
    try {
      setIsGeneratingPreviews(true);
      
      // 生成正面和背面预览图
      const frontPreviewImage = await generatePreview(frontPreviewRef.current);
      const backPreviewImage = await generatePreview(backPreviewRef.current);

      // 添加到购物车
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
    } catch (error) {
      console.error('添加到购物车失败:', error);
    } finally {
      setIsGeneratingPreviews(false);
    }
  };

  const isLoading = isAdding || isGeneratingPreviews;

  return (
    <>
      <div className="hidden">
        <div ref={frontPreviewRef}>
          <TShirtPreview
            color={tshirtColor}
            style={tshirtStyle}
            gender={tshirtGender}
            designImage={frontDesignImage || ''}
            settings={frontDesignSettings}
          />
        </div>
        <div ref={backPreviewRef}>
          <TShirtPreview
            color={tshirtColor}
            style={tshirtStyle}
            gender={tshirtGender}
            designImage={backDesignImage || ''}
            settings={backDesignSettings}
          />
        </div>
      </div>
      
      <Button 
        className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white shadow-lg px-8 py-4 h-auto text-lg rounded-full"
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            {isGeneratingPreviews ? '生成预览图...' : '处理中...'}
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-6 w-6" />
            确认设计并提交购物车
          </>
        )}
      </Button>
    </>
  );
};