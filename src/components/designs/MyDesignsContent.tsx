import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ErrorAlert } from "./ErrorAlert";
import { DesignsLoadingSkeleton } from "./DesignsLoadingSkeleton";
import { DesignsTabs } from "./DesignsTabs";

export const MyDesignsContent = () => {
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

      const { data, error: fetchError } = await supabase
        .from('design_drafts')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('is_deleted', false)  // 明确指定只获取未删除的设计
        .order('created_at', { ascending: false });
      
      if (fetchError) {
        console.error('获取设计列表失败:', fetchError);
        throw fetchError;
      }

      // 对设计列表进行去重处理
      const uniqueDesigns = data?.reduce((acc: any[], current) => {
        const exists = acc.some(item => 
          item.design_front === current.design_front
        );
        
        if (!exists) {
          acc.push(current);
        }
        
        return acc;
      }, []) || [];

      return uniqueDesigns;
    },
    staleTime: 0, // 确保每次都重新获取最新数据
    refetchOnWindowFocus: true, // 当窗口重新获得焦点时重新获取数据
  });

  if (error) {
    return <ErrorAlert message={error instanceof Error ? error.message : '获取设计列表失败，请稍后重试'} />;
  }

  if (isLoading) {
    return <DesignsLoadingSkeleton />;
  }

  return <DesignsTabs designs={designs || []} />;
};