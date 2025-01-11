import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { CartHeader } from "@/components/cart/CartHeader";
import { CartLoading } from "@/components/cart/CartLoading";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { CartContainer } from "@/components/cart/CartContainer";
import { CartItemType } from "@/types/cart";

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

  return (
    <div className="min-h-screen pb-24">
      <Navbar />
      <div className={`container mx-auto ${isMobile ? 'px-2' : 'px-4'} py-4 mt-16`}>
        <CartHeader />
        <div className="w-full">
          {loading ? (
            <CartLoading />
          ) : cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <CartContainer 
              cartItems={cartItems}
              selectedItems={selectedItems}
              onSelect={handleSelect}
              onUpdate={fetchCartItems}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;