import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

  const getStyleText = (style: string, gender: string) => {
    const genderText = gender === 'male' ? '男款' : '女款';
    const styleText = style === 'short' ? '短袖' : '长袖';
    return `${genderText}${styleText}`;
  };

  // 确保图片URL是有效的
  const getValidImageUrl = (url: string | null) => {
    if (!url) return null;
    
    // 如果是完整的URL，直接返回
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // 如果是相对路径，添加基础URL
    // 注意：这里需要根据实际的Supabase项目配置来设置正确的基础URL
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${url}`;
  };

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
          <div>
            <h3 className="font-medium mb-2 text-center">正面设计</h3>
            <img 
              src={getValidImageUrl(design_front)} 
              alt="正面设计" 
              className="w-full aspect-square object-contain rounded-lg"
              onError={(e) => {
                console.error('图片加载失败:', design_front);
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
        )}
        {design_back && (
          <div>
            <h3 className="font-medium mb-2 text-center">背面设计</h3>
            <img 
              src={getValidImageUrl(design_back)} 
              alt="背面设计" 
              className="w-full aspect-square object-contain rounded-lg"
              onError={(e) => {
                console.error('图片加载失败:', design_back);
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
        )}
      </div>
      
      <div className="flex-1 space-y-4">
        <div>
          <h3 className="font-medium">商品信息</h3>
          <p className="text-sm text-muted-foreground">
            款式：{getStyleText(tshirt_style, tshirt_gender)}
          </p>
          <p className="text-sm text-muted-foreground">
            颜色：{tshirt_color}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="destructive"
            size="icon"
            onClick={removeItem}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};