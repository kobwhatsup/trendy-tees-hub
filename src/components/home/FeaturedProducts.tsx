import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, Heart, ShoppingCart } from "lucide-react";

export const FeaturedProducts = () => {
  const navigate = useNavigate();
  
  const { data: featuredDesigns } = useQuery({
    queryKey: ["featuredDesigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("design_drafts")
        .select("*")
        .eq('is_public', true)
        .eq('is_deleted', false)
        .order('view_count', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-[2000px] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">浏览作品</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {featuredDesigns?.map((design) => (
            <Card 
              key={design.id} 
              className="design-card cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => navigate(`/designs/${design.id}`)}
            >
              <CardContent className="p-0">
                <div 
                  className="aspect-square bg-cover bg-center bg-no-repeat" 
                  style={{ 
                    backgroundImage: `url(${design.preview_front || '/placeholder.svg'})`,
                    backgroundColor: '#f5f5f5'
                  }}
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                  {design.title || '未命名设计'}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{design.view_count || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShoppingCart className="w-4 h-4" />
                    <span>{design.use_count || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>¥{design.total_earnings || 0}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};