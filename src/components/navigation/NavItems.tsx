import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const navItems = [
  { title: "首页", path: "/" },
  { title: "AI设计师", path: "/design" },
  { title: "所有设计", path: "/designs", disabled: true },
  { title: "我的设计", path: "/my-designs" },
];

interface NavItemsProps {
  isMobile: boolean;
}

export const NavItems = ({ isMobile }: NavItemsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    // 首页路由不显示高亮
    if (path === "/") return false;
    return location.pathname === path;
  };

  const getButtonClassName = (path: string) => {
    return isActive(path) 
      ? "bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] text-white hover:from-[#0EA5E9] hover:to-[#ea384c]"
      : "hover:bg-accent hover:text-accent-foreground";
  };

  const getDropdownItemClassName = (path: string) => {
    return isActive(path)
      ? "bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] text-white cursor-pointer"
      : "cursor-pointer";
  };

  const handleNavigation = (path: string, disabled?: boolean) => {
    if (disabled) {
      toast({
        title: "即将推出",
        description: "敬请期待",
      });
      return;
    }
    navigate(path);
  };

  if (isMobile) {
    return (
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
                onClick={() => handleNavigation(item.path, item.disabled)}
                className={getDropdownItemClassName(item.path)}
              >
                {item.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex-1 flex justify-center">
      <div className="flex items-center space-x-8">
        {navItems.map((item) => (
          <Button 
            key={item.path}
            variant="ghost" 
            onClick={() => handleNavigation(item.path, item.disabled)}
            className={getButtonClassName(item.path)}
          >
            {item.title}
          </Button>
        ))}
      </div>
    </div>
  );
};