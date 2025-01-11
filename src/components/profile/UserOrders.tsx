import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const UserOrders = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: 实现订单查询功能
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center text-muted-foreground">
        订单功能开发中...
      </div>
    </div>
  );
};