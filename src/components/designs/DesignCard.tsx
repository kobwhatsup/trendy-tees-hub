import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";

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
      const { error } = await supabase
        .from('design_drafts')
        .delete()
        .eq('id', design.id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['my-designs'] });
      toast({
        title: "设计已删除",
        description: "您的设计已成功删除",
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

  const PreviewImage = ({ imageUrl, title }) => (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square relative cursor-zoom-in">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-contain"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-square relative">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <PreviewImage imageUrl={design.design_front} title="正面设计图" />
          <PreviewImage imageUrl={design.design_back} title="背面设计图" />
          <PreviewImage imageUrl={design.preview_front} title="正面效果图" />
          <PreviewImage imageUrl={design.preview_back} title="背面效果图" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-muted-foreground">
            创建于 {formatDistanceToNow(new Date(design.created_at), { locale: zhCN, addSuffix: true })}
          </p>
          <div className="flex items-center space-x-2">
            <Switch
              id={`share-${design.id}`}
              checked={design.is_public}
              onCheckedChange={handleShareToggle}
              disabled={isUpdating}
              className="data-[state=checked]:bg-green-500"
            />
            <Label htmlFor={`share-${design.id}`}>分享</Label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash className="mr-2 h-4 w-4" />
              删除设计
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确认删除</AlertDialogTitle>
              <AlertDialogDescription>
                此操作将永久删除该设计，无法恢复。确定要继续吗？
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteDesign}>
                确认删除
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button onClick={() => window.location.href = '/cart'}>
          加入购物车
        </Button>
      </CardFooter>
    </Card>
  );
};