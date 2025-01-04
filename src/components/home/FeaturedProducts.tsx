import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export const FeaturedProducts = () => {
  const navigate = useNavigate();
  
  const { data: featuredProducts } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(20);
      
      if (error) throw error;
      return data;
    },
  });

  return (
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
  );
};