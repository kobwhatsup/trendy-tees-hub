import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DesignPreviewGrid } from "./DesignPreviewGrid";
import { DesignActions } from "./DesignActions";
import { DesignMetrics } from "./cards/DesignMetrics";
import { DesignTimestamp } from "./cards/DesignTimestamp";
import type { DesignType } from "@/types/design";

interface DesignCardProps {
  design: DesignType;
}

export const DesignCard = ({ design }: DesignCardProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleShareToggle = async () => {
    try {
      setIsUpdating(true);
      const { error } = await supabase
        .from('design_drafts')
        .update({ is_public: !design.is_public })
        .eq('id', design.id);

      if (error) throw error;

      queryClient.setQueryData<DesignType[]>(['my-designs'], (oldData = []) => {
        return oldData.map(d => 
          d.id === design.id ? { ...d, is_public: !design.is_public } : d
        );
      });

      toast({
        title: design.is_public ? "设计已设为私密" : "设计已公开分享",
        description: design.is_public 
          ? "其他用户将无法看到此设计" 
          : `其他用户现在可以看到并使用此设计。当他们购买使用你的设计的T恤时，你将获得${design.reward_percentage}%的收益作为奖励`,
      });
    } catch (error) {
      console.error('更新设计状态失败:', error);
      toast({
        title: "操作失败",
        description: "更新设计状态时出现错误，请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteDesign = async () => {
    try {
      const { error } = await supabase
        .from('design_drafts')
        .update({ is_deleted: true })
        .eq('id', design.id);

      if (error) throw error;

      queryClient.setQueryData<DesignType[]>(['my-designs'], (oldData = []) => {
        return oldData.filter(d => d.id !== design.id);
      });

      toast({
        title: "设计已删除",
        description: "设计已从列表中移除",
      });
    } catch (error) {
      console.error('删除设计失败:', error);
      toast({
        title: "删除失败",
        description: "删除设计时出现错误，请稍后重试",
        variant: "destructive",
      });
    }
  };

  const handleUseDesign = () => {
    localStorage.setItem('reusedDesign', JSON.stringify({
      design_front: design.design_front,
      design_back: design.design_back
    }));
    
    updateUseCount();
    navigate('/design');
  };

  const updateUseCount = async () => {
    try {
      const { error } = await supabase
        .from('design_drafts')
        .update({ 
          use_count: (design.use_count || 0) + 1 
        })
        .eq('id', design.id);

      if (error) throw error;

      queryClient.setQueryData<DesignType[]>(['my-designs'], (oldData = []) => {
        return oldData.map(d => 
          d.id === design.id ? { ...d, use_count: (d.use_count || 0) + 1 } : d
        );
      });
    } catch (error) {
      console.error('更新使用次数失败:', error);
    }
  };

  return (
    <div className="p-[1px] rounded-lg bg-gradient-to-r from-[#0EA5E9] to-[#ea384c]">
      <Card className="overflow-hidden">
        <CardHeader className="p-4">
          <DesignPreviewGrid design={design} />
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            <DesignTimestamp createdAt={design.created_at} />
            <DesignMetrics 
              viewCount={design.view_count}
              useCount={design.use_count}
              salesAmount={design.sales_amount}
              totalEarnings={design.total_earnings}
            />
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <DesignActions 
            isPublic={design.is_public}
            isUpdating={isUpdating}
            onShareToggle={handleShareToggle}
            onDelete={handleDeleteDesign}
            onUseDesign={handleUseDesign}
          />
        </CardFooter>
      </Card>
    </div>
  );
};