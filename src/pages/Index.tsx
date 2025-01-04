import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  const { data: featuredProducts } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(12);
      
      if (error) throw error;
      return data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*");
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="hero-section">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              定义你的风格
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-fade-in">
              探索我们的2024春季新品系列
            </p>
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-white animate-fade-in"
              onClick={() => navigate("/products")}
            >
              立即选购
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">热门商品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts?.map((product) => (
              <Card 
                key={product.id} 
                className="product-card cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <CardContent className="p-0">
                  <div 
                    className="aspect-square bg-cover bg-center" 
                    style={{ backgroundImage: `url(${product.image_url})` }}
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground">¥{product.price}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">商品分类</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories?.map((category) => (
              <div 
                key={category.id} 
                className="product-card rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                onClick={() => navigate(`/products?category=${category.id}`)}
              >
                <div className="p-6 text-center cursor-pointer">
                  <h3 className="font-semibold text-xl mb-2">{category.name}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">品牌故事</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            我们致力于为您提供最优质的T恤产品，每一件都凝聚着我们对品质的追求和对时尚的理解。
            选择我们，让您的衣橱焕发新的活力。
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;