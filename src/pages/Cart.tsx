import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";

interface CartItemType {
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
  price?: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleCheckout = async () => {
    // TODO: 实现结算功能
    toast({
      title: "功能开发中",
      description: "支付功能即将上线",
    });
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-muted-foreground">购物车是空的</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <CartItem 
                    key={item.id}
                    {...item}
                    onUpdate={fetchCartItems}
                  />
                ))}
              </div>
            )}
          </div>
          <div>
            <CartSummary 
              itemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;