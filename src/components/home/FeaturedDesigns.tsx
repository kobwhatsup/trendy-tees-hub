import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Paintbrush } from "lucide-react";

export const FeaturedDesigns = () => {
  const navigate = useNavigate();
  
  const { data: designs } = useQuery({
    queryKey: ["featuredDesigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("design_drafts")
        .select("*")
        .eq("is_public", true)
        .order("view_count", { ascending: false })
        .limit(8);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-[#0EA5E9]/5 via-white to-[#ea384c]/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] bg-clip-text text-transparent">
            精选设计
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            浏览其他用户分享的优秀设计作品，获取灵感或直接使用他们的设计
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {designs?.map((design) => (
            <Card key={design.id} className="overflow-hidden group">
              <CardContent className="p-4 grid grid-cols-2 gap-2">
                {design.preview_front && (
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={design.preview_front} 
                      alt="正面预览"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                {design.preview_back && (
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={design.preview_back} 
                      alt="背面预览"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] hover:opacity-90"
                  onClick={() => {
                    localStorage.setItem('reusedDesign', JSON.stringify({
                      design_front: design.design_front,
                      design_back: design.design_back
                    }));
                    navigate('/design');
                  }}
                >
                  <Paintbrush className="mr-2 h-4 w-4" />
                  使用此设计
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline" 
            className="px-8"
            onClick={() => navigate('/designs')}
          >
            查看更多设计
          </Button>
        </div>
      </div>
    </section>
  );
};