import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { toast } from "@/hooks/use-toast";

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    // 检查用户是否已登录
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        toast({
          title: "登录成功",
          description: "欢迎回来!",
        });
        setUser(session?.user || null);
        setIsSheetOpen(false);
      } else if (event === "USER_UPDATED") {
        toast({
          title: "邮箱已验证",
          description: "您现在可以登录了!",
        });
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        toast({
          title: "已退出登录",
          description: "期待您的再次访问!",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <a 
              href="/" 
              className="text-2xl font-bold bg-gradient-to-r from-[#0EA5E9] via-[#ea384c] to-[#0EA5E9] text-transparent bg-clip-text"
            >
              AI DESIGN TEE
            </a>
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
              >
                首页
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/products")}
              >
                浏览作品
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/design")}
              >
                开始设计
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button 
                  variant="outline"
                  onClick={handleSignOut}
                >
                  退出登录
                </Button>
              </>
            ) : (
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};