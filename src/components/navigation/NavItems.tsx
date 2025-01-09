import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export const navItems = [
  { title: "首页", path: "/" },
  { title: "AI设计师", path: "/design" },
  { title: "所有设计", path: "/designs" },
  { title: "我的设计", path: "/my-designs" },
];

interface NavItemsProps {
  isMobile: boolean;
}

export const NavItems = ({ isMobile }: NavItemsProps) => {
  const navigate = useNavigate();

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
                onClick={() => navigate(item.path)}
                className="flex items-center"
              >
                {item.icon}
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
            onClick={() => navigate(item.path)}
            className="flex items-center"
          >
            {item.icon}
            {item.title}
          </Button>
        ))}
      </div>
    </div>
  );
};