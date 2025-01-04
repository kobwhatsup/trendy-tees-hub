import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 检查用户是否已登录
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          toast({
            title: "登录成功",
            description: "欢迎回来!",
          });
          navigate("/");
        } else if (event === "USER_UPDATED") {
          toast({
            title: "邮箱已验证",
            description: "您现在可以登录了!",
          });
        }
      }
    );

    checkUser();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-[#0EA5E9] via-[#ea384c] to-[#0EA5E9] text-transparent bg-clip-text">
            AI DESIGN TEE
          </h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            登录您的账户
          </h2>
        </div>
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
                confirmation_text: '我们已经向您的邮箱发送了验证链接，请查收并点击链接完成验证。'
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
    </div>
  );
};

export default AuthPage;