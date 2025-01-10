import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DesignsLoadingSkeleton } from "@/components/designs/DesignsLoadingSkeleton";
import { ErrorAlert } from "@/components/designs/ErrorAlert";
import { DesignsGrid } from "@/components/designs/DesignsGrid";

export const DesignsPage = () => {
  const { data: designs, isLoading, error } = useQuery({
    queryKey: ['public-designs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('design_drafts')
        .select('*')
        .eq('is_public', true)
        .eq('is_deleted', false)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <DesignsLoadingSkeleton />;
  if (error) return <ErrorAlert message="加载设计作品失败" />;
  if (!designs?.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">暂无公开设计</h2>
        <p className="text-muted-foreground">
          目前还没有用户分享的设计作品，快来分享你的创意吧！
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#0EA5E9] via-[#ea384c] to-[#0EA5E9] text-transparent bg-clip-text">
          设计作品展示
        </h1>
        <p className="text-lg text-muted-foreground px-4">
          探索来自社区的精彩T恤设计作品，从中获取灵感，或者直接使用这些设计来制作你的T恤。
        </p>
      </div>
      <DesignsGrid designs={designs} filterPublic={true} />
    </div>
  );
};

export default DesignsPage;