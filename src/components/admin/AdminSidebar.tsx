import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Package2, 
  CircleDollarSign, 
  BarChart3, 
  Users 
} from "lucide-react";

const menuItems = [
  {
    title: "订单管理",
    icon: Package2,
    href: "/admin/orders"
  },
  {
    title: "财务管理",
    icon: CircleDollarSign,
    href: "/admin/finance"
  },
  {
    title: "数据统计",
    icon: BarChart3,
    href: "/admin/statistics"
  },
  {
    title: "用户管理",
    icon: Users,
    href: "/admin/users"
  }
];

export const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 min-h-[calc(100vh-4rem)] bg-background border-r">
      <div className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-accent text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};