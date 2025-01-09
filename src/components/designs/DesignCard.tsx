import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import { DesignPreviewGrid } from "./DesignPreviewGrid";
import { DesignActions } from "./DesignActions";

export const DesignCard = ({ design }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();

  const handleShareToggle = async () => {
    try {
      setIsUpdating(true);
      const { error } = await supabase
        .from('design_drafts')
        .update({ is_public: !design.is_public })
        .eq('id', design.id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['my-designs'] });
      toast({
        title: design.is_public ? "设计已设为私密" : "设计已公开分享",
        description: design.is_public ? "其他用户将无法看到此设计" : "其他用户现在可以看到并使用此设计",
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
      // 更新设计为已删除状态，而不是实际删除记录
      const { error } = await supabase
        .from('design_drafts')
        .update({ is_deleted: true })
        .eq('id', design.id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['my-designs'] });
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

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <DesignPreviewGrid design={design} />
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">
          创建于 {formatDistanceToNow(new Date(design.created_at), { locale: zhCN, addSuffix: true })}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <DesignActions 
          isPublic={design.is_public}
          isUpdating={isUpdating}
          onShareToggle={handleShareToggle}
          onDelete={handleDeleteDesign}
        />
      </CardFooter>
    </Card>
  );
};