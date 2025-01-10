import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";

interface AuthSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthSheet = ({ isOpen, onOpenChange }: AuthSheetProps) => {
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        window?.localStorage?.removeItem('sb-gfraqpwyfxmpzdllsfoc-auth-token');
      } else if (event === 'SIGNED_IN') {
        if (!session?.access_token) {
          toast({
            title: "登录失败",
            description: "请重新尝试登录",
            variant: "destructive",
          });
          return;
        }

        // 登录成功后关闭登录窗口
        onOpenChange(false);
        
        toast({
          title: "登录成功",
          description: "欢迎回来！",
        });
      } else if (event === 'USER_UPDATED') {
        if (session?.user.email_confirmed_at) {
          toast({
            title: "邮箱验证成功",
            description: "您现在可以登录了!",
          });
        }
      } else if (event === 'PASSWORD_RECOVERY') {
        toast({
          title: "密码重置邮件已发送",
          description: "请查看您的邮箱",
        });
      } else if (event === 'USER_DELETED') {
        toast({
          title: "账号已删除",
          description: "您的账号已被成功删除",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [onOpenChange]);

  const handleError = (error: AuthError) => {
    let errorMessage = "登录失败，请重试";
    
    if (error.message.includes("Invalid login credentials")) {
      errorMessage = "邮箱或密码错误，请重新输入";
    } else if (error.message.includes("Email not confirmed")) {
      errorMessage = "请先验证您的邮箱后再登录";
    }

    toast({
      title: "错误",
      description: errorMessage,
      variant: "destructive",
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button>登录/注册</Button>
      </SheetTrigger>
      <SheetContent className="w-[80vw] sm:w-[30vw]">
        <div className="mt-8">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#0EA5E9',
                    brandAccent: '#0284C7',
                  },
                },
              },
              className: {
                button: 'transition-opacity',
                container: 'transition-opacity',
                loader: 'opacity-50',
              },
            }}
            localization={{
              variables: {
                sign_up: {
                  email_label: '邮箱',
                  password_label: '密码',
                  button_label: '注册',
                  loading_button_label: '注册中...',
                  social_provider_text: '使用{{provider}}继续',
                  link_text: '没有账号？注册',
                  confirmation_text: '请查收验证邮件完成注册',
                },
                sign_in: {
                  email_label: '邮箱',
                  password_label: '密码',
                  button_label: '登录',
                  loading_button_label: '登录中...',
                  social_provider_text: '使用{{provider}}继续',
                  link_text: '已有账号？登录',
                },
                forgotten_password: {
                  email_label: '邮箱',
                  password_label: '密码',
                  button_label: '发送重置密码邮件',
                  loading_button_label: '发送中...',
                  link_text: '忘记密码？',
                },
              },
            }}
            theme="default"
            providers={[]}
            onError={handleError}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};