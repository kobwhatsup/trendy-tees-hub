import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getAuthErrorMessage } from "@/utils/authErrors";
import { AuthError } from "@supabase/supabase-js";

interface AuthStateHandlerProps {
  children: React.ReactNode;
}

export const AuthStateHandler = ({ children }: AuthStateHandlerProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          toast({
            title: "登录成功",
            description: "欢迎回来！",
          });
        } else if (event === "SIGNED_OUT") {
          toast({
            title: "已退出登录",
            description: "期待您的再次访问！",
          });
        } else if (event === "PASSWORD_RECOVERY") {
          toast({
            title: "密码重置邮件已发送",
            description: "请查看您的邮箱。",
          });
        } else if (event === "USER_UPDATED") {
          toast({
            title: "账号已更新",
            description: "您的账号信息已成功更新。",
          });
        } else if (event === "TOKEN_REFRESHED") {
          // 静默处理 token 刷新
        }

        // 如果有错误，显示错误信息
        if (session?.error) {
          const error = new AuthError(session.error.message);
          toast({
            variant: "destructive",
            title: "错误",
            description: getAuthErrorMessage(error),
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  return <>{children}</>;
};