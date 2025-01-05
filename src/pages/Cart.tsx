import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CartItem {
  id: string;
  design_front: string | null;
  design_back: string | null;
  tshirt_style: string;
  tshirt_color: string;
  tshirt_gender: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const { data: items, error } = await supabase
        .from('cart_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCartItems(items || []);
    } catch (error) {
      console.error('获取购物车商品失败:', error);
      toast({
        title: "加载失败",
        description: "获取购物车商品时出错，请稍后重试",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId);

      if (error) throw error;

      setCartItems(cartItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error('更新数量失败:', error);
      toast({
        title: "更新失败",
        description: "更新商品数量时出错，请稍后重试",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      setCartItems(cartItems.filter(item => item.id !== itemId));
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

  const getStyleText = (style: string, gender: string) => {
    const genderText = gender === 'male' ? '男款' : '女款';
    const styleText = style === 'short' ? '短袖' : '长袖';
    return `${genderText}${styleText}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8 mt-16">
          <h1 className="text-2xl font-bold mb-4">购物车</h1>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-2xl font-bold mb-4">购物车</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">购物车是空的</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.design_front && (
                    <div>
                      <h3 className="font-medium mb-2">正面设计</h3>
                      <img 
                        src={item.design_front} 
                        alt="正面设计" 
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                    </div>
                  )}
                  {item.design_back && (
                    <div>
                      <h3 className="font-medium mb-2">背面设计</h3>
                      <img 
                        src={item.design_back} 
                        alt="背面设计" 
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-medium">商品信息</h3>
                    <p className="text-sm text-muted-foreground">
                      款式：{getStyleText(item.tshirt_style, item.tshirt_gender)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      颜色：{item.tshirt_color}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;