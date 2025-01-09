import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import { DesignPreviewGrid } from "./DesignPreviewGrid";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { DesignType } from "@/types/design";

interface PublicDesignCardProps {
  design: DesignType;
}

export const PublicDesignCard = ({ design }: PublicDesignCardProps) => {
  const { data: profile } = useQuery({
    queryKey: ['profile', design.user_id],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', design.user_id)
        .maybeSingle();
      
      return data;
    },
  });

  return (
    <div className="p-[1px] rounded-lg bg-gradient-to-r from-[#0EA5E9] to-[#ea384c]">
      <Card className="overflow-hidden">
        <CardHeader className="p-4">
          <DesignPreviewGrid design={design} />
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                创建于 {formatDistanceToNow(new Date(design.created_at), { locale: zhCN, addSuffix: true })}
              </p>
              <p className="text-sm font-medium text-primary">
                设计师：{profile?.username || '未知用户'}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">浏览次数</p>
                <p className="font-medium">{design.view_count || 0}</p>
              </div>
              <div>
                <p className="text-muted-foreground">使用次数</p>
                <p className="font-medium">{design.use_count || 0}</p>
              </div>
              <div>
                <p className="text-muted-foreground">销售收入</p>
                <p className="font-medium">¥{design.sales_amount?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={() => window.location.href = '/cart'}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-md"
            size="lg"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            加入购物车
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};