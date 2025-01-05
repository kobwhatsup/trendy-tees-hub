import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

interface AuthSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthSheet = ({ isOpen, onOpenChange }: AuthSheetProps) => {
  // 添加调试日志
  useEffect(() => {
    const logAuthDetails = async () => {
      // 使用 import.meta.env 替代 process.env
      console.log('Supabase URL:', import.meta.env.SUPABASE_URL);
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Auth session:', session);
    };
    
    logAuthDetails();
  }, []);

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
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};