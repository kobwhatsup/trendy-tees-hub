import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DesignCard } from "./DesignCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export const MyDesignsList = () => {
  const { data: designs, isLoading } = useQuery({
    queryKey: ['my-designs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('design_drafts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[300px] w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#0EA5E9] via-[#ea384c] to-[#0EA5E9] text-transparent bg-clip-text">
          我的设计
        </h1>
        <p className="text-lg text-muted-foreground">
          管理和分享你的T恤设计作品
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto mb-8">
          <TabsTrigger value="all">全部设计</TabsTrigger>
          <TabsTrigger value="public">已分享</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs?.map((design) => (
              <DesignCard key={design.id} design={design} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="public">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs?.filter(d => d.is_public).map((design) => (
              <DesignCard key={design.id} design={design} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};