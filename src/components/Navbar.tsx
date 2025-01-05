import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AuthSheet } from "./auth/AuthSheet";
import { UserMenu } from "./auth/UserMenu";

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        toast({
          title: "登录成功",
          description: "欢迎回来!",
        });
        setUser(session?.user || null);
        setIsSheetOpen(false);
      } else if (event === "USER_UPDATED") {
        if (session?.user.email_confirmed_at) {
          toast({
            title: "邮箱验证成功",
            description: "您现在可以登录了!",
          });
        }
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
              <UserMenu user={user} />
            ) : (
              <AuthSheet isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};