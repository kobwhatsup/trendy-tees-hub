import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AuthSheet } from "./auth/AuthSheet";
import { UserMenu } from "./auth/UserMenu";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } finally {
        setIsLoading(false);
      }
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

  const navItems = [
    { title: "首页", path: "/" },
    { title: "AI设计师", path: "/design" },
    { title: "浏览作品", path: "/products" },
    { title: "我的设计", path: "/my-designs" },
  ];

  if (isLoading) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a 
            href="/" 
            className="text-xl font-bold bg-gradient-to-r from-[#0EA5E9] via-[#ea384c] to-[#0EA5E9] text-transparent bg-clip-text mr-2"
          >
            AI DESIGN TEE
          </a>

          {/* Navigation Links - Desktop */}
          {!isMobile && (
            <div className="flex-1 flex justify-center">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <Button 
                    key={item.path}
                    variant="ghost" 
                    onClick={() => navigate(item.path)}
                  >
                    {item.title}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <div className="flex-1 flex justify-end mr-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {navItems.map((item) => (
                    <DropdownMenuItem 
                      key={item.path}
                      onClick={() => navigate(item.path)}
                    >
                      {item.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center">
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