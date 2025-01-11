import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CartButton } from "../cart/CartButton";
import { EmailVerificationButton } from "./EmailVerificationButton";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User } from "@supabase/supabase-js"

interface UserMenuProps {
  user: User;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // 获取用户邮箱的第一个字母作为头像fallback
  const getInitials = (email: string) => {
    return email[0].toUpperCase();
  };

  return (
    <div className="flex items-center space-x-4">
      <CartButton />
      {!user.email_confirmed_at && (
        <EmailVerificationButton userEmail={user.email} />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getInitials(user.email || '')}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="text-sm text-muted-foreground">
            {user.email}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/profile')}>
            个人中心
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            退出登录
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};