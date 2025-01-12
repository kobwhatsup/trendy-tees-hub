import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { OrderList } from "@/components/admin/orders/OrderList";
import { toast } from "@/hooks/use-toast";

const AdminOrders = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // 验证管理员权限
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // 检查用户是否登录
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "访问被拒绝",
            description: "请先登录",
            variant: "destructive",
          });
          navigate('/');
          return;
        }

        // 检查用户是否是管理员
        const { data: adminUser, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error || !adminUser) {
          toast({
            title: "访问被拒绝",
            description: "您没有管理员权限",
            variant: "destructive",
          });
          navigate('/');
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error checking admin access:', error);
        toast({
          title: "发生错误",
          description: "请稍后再试",
          variant: "destructive",
        });
        navigate('/');
      }
    };

    checkAdminAccess();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <OrderList />
    </AdminLayout>
  );
};

export default AdminOrders;