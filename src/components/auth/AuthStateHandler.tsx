import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getAuthErrorMessage } from "@/utils/authErrors";

export const AuthStateHandler = () => {
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        toast({
          title: "登录成功",
          description: "欢迎回来",
        });
      } else if (event === "SIGNED_OUT") {
        toast({
          title: "已退出登录",
          description: "期待您的再次访问",
        });
      } else if (event === "PASSWORD_RECOVERY") {
        toast({
          title: "密码重置邮件已发送",
          description: "请查看您的邮箱",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  useEffect(() => {
    const handleAuthError = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        toast({
          title: "认证错误",
          description: getAuthErrorMessage(error),
          variant: "destructive",
        });
      }
    };

    handleAuthError();
  }, [toast]);

  return null;
};