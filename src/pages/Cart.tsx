import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const isMobile = useIsMobile();

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
    if (selectedItems.size === 0) {
      toast({
        title: "请选择商品",
        description: "请至少选择一件商品进行结算",
      });
      return;
    }
    toast({
      title: "功能开发中",
      description: "支付功能即将上线",
    });
  };

  const handleSelect = (id: string, selected: boolean) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-4 mt-16">
          <h1 className="text-2xl font-bold mb-4">购物车</h1>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <Navbar />
      <div className={`container mx-auto ${isMobile ? 'px-2' : 'px-4'} py-4 mt-16`}>
        <h1 className="text-2xl font-bold mb-4">购物车</h1>
        <div className="w-full">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow">
              <p className="text-muted-foreground">购物车是空的</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem 
                  key={item.id}
                  {...item}
                  selected={selectedItems.has(item.id)}
                  onSelect={handleSelect}
                  onUpdate={fetchCartItems}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg">
        <div className={`container mx-auto ${isMobile ? 'px-2' : 'px-4'}`}>
          <CartSummary 
            items={cartItems.map(item => ({
              quantity: item.quantity,
              price: item.price || 199,
              selected: selectedItems.has(item.id),
              tshirt_style: item.tshirt_style,
              tshirt_color: item.tshirt_color,
              tshirt_gender: item.tshirt_gender,
              tshirt_size: item.tshirt_size
            }))}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;