import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export const AuthForm = () => {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{
        theme: ThemeSupa,
        className: {
          container: "w-full",
          button: "w-full bg-primary text-white hover:bg-primary/90",
          input: "rounded-md",
        },
      }}
      localization={{
        variables: {
          sign_in: {
            email_label: "邮箱",
            password_label: "密码",
            button_label: "登录",
          },
          sign_up: {
            email_label: "邮箱",
            password_label: "密码",
            button_label: "注册",
          },
        },
      }}
      theme="default"
      providers={[]}
    />
  );
};