import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DesignCard } from "./DesignCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const MyDesignsList = () => {
  const { toast } = useToast();
  
  const { data: designs, isLoading, error } = useQuery({
    queryKey: ['my-designs'],
    queryFn: async () => {
      console.log('开始获取设计列表...');
      
      // 首先检查用户登录状态
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error('获取用户信息失败:', authError);
        throw new Error('请先登录后查看设计');
      }

      if (!user) {
        console.log('用户未登录');
        throw new Error('请先登录后查看设计');
      }

      // 获取设计列表
      const { data, error: fetchError } = await supabase
        .from('design_drafts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (fetchError) {
        console.error('获取设计列表失败:', fetchError);
        throw fetchError;
      }

      console.log('成功获取设计列表:', data);
      return data;
    },
    retry: 1,
  });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error instanceof Error ? error.message : '获取设计列表失败，请稍后重试'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

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