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
    <section className="py-20 px-4 bg-gradient-to-br from-[#0EA5E9] via-white to-[#ea384c]/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">商品分类</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          探索我们精心挑选的商品分类，找到属于你的专属风格
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories?.map((category) => (
            <div 
              key={category.id} 
              className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/products?category=${category.id}`)}
            >
              <div className="p-8 text-center">
                <h3 className="font-bold text-2xl mb-3 group-hover:text-[#0EA5E9] transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#0EA5E9] rounded-xl transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};