import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

interface AuthSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthSheet = ({ isOpen, onOpenChange }: AuthSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button>登录 / 注册</Button>
      </SheetTrigger>
      <SheetContent className="w-[30vw] sm:max-w-none">
        <div className="h-full flex flex-col">
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-[#0EA5E9] via-[#ea384c] to-[#0EA5E9] text-transparent bg-clip-text mb-2">
            AI DESIGN TEE
          </h1>
          <h2 className="text-xl font-semibold text-center mb-6">
            登录您的账户
          </h2>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#0EA5E9',
                    brandAccent: '#ea384c',
                  }
                }
              }
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: '邮箱',
                  password_label: '密码',
                  button_label: '登录',
                  loading_button_label: '登录中...',
                  social_provider_text: '使用{{provider}}登录',
                  link_text: '已有账户?立即登录',
                  email_input_placeholder: '请输入邮箱',
                  password_input_placeholder: '请输入密码'
                },
                sign_up: {
                  email_label: '邮箱',
                  password_label: '密码',
                  button_label: '注册',
                  loading_button_label: '注册中...',
                  social_provider_text: '使用{{provider}}注册',
                  link_text: '没有账户?立即注册',
                  email_input_placeholder: '请输入邮箱',
                  password_input_placeholder: '请输入密码',
                  confirmation_text: '我们已经向您的邮箱发送了验证链接，请查收并点击链接完成验证。如果没有收到邮件，请检查垃圾邮件文件夹。如果仍未收到，您可以在登录后点击"重新发送验证邮件"按钮。'
                },
                forgotten_password: {
                  link_text: '忘记密码?',
                  email_label: '邮箱',
                  password_label: '密码',
                  button_label: '发送重置密码邮件',
                  loading_button_label: '发送中...',
                  confirmation_text: '请检查您的邮箱以获取重置密码链接'
                }
              }
            }}
            providers={[]}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};