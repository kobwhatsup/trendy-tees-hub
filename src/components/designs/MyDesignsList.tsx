import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "./ErrorAlert";
import { DesignsLoadingSkeleton } from "./DesignsLoadingSkeleton";
import { DesignsGrid } from "./DesignsGrid";

export const MyDesignsList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        toast({
          variant: "destructive",
          title: "需要登录",
          description: "请先登录后查看设计",
        });
        navigate("/");
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  // 获取设计列表并自动开启分享
  const { data: designs, isLoading, error } = useQuery({
    queryKey: ['my-designs'],
    queryFn: async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('获取会话信息失败:', sessionError);
        throw new Error('会话已过期，请重新登录');
      }

      if (!session) {
        console.log('用户未登录');
        throw new Error('请先登录后查看设计');
      }

      // 获取所有未删除的设计
      const { data, error: fetchError } = await supabase
        .from('design_drafts')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('is_deleted', false)  // 只获取未删除的设计
        .order('created_at', { ascending: false });
      
      if (fetchError) {
        console.error('获取设计列表失败:', fetchError);
        throw fetchError;
      }

      // 对设计列表进行去重处理
      const uniqueDesigns = data?.reduce((acc: any[], current) => {
        // 检查是否已经存在相同的正面设计
        const exists = acc.some(item => 
          item.design_front === current.design_front
        );
        
        // 如果不存在相同的正面设计，则添加到结果数组中
        if (!exists) {
          acc.push(current);
        }
        
        return acc;
      }, []) || [];

      return uniqueDesigns;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <ErrorAlert 
          message={error instanceof Error ? error.message : '获取设计列表失败，请稍后重试'} 
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <DesignsLoadingSkeleton />
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
          管理和分享你的T恤设计作品。如果你分享设计作品，你的设计作品会出现在浏览作品板块里，供其他用户进行查看或使用。如果有其他用户喜欢你的设计出来的T恤并进行购买，你将获得T恤收入的10%作为奖励。
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto mb-8">
          <TabsTrigger value="all">全部设计</TabsTrigger>
          <TabsTrigger value="public">已分享</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <DesignsGrid designs={designs || []} />
        </TabsContent>
        <TabsContent value="public">
          <DesignsGrid designs={designs || []} filterPublic />
        </TabsContent>
      </Tabs>
    </div>
  );
};