import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Categories = () => {
  const navigate = useNavigate();
  
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
  );
};