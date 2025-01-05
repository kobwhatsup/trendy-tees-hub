import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CartButton } from "../cart/CartButton";
import { EmailVerificationButton } from "./EmailVerificationButton";

interface UserMenuProps {
  user: any;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex items-center space-x-4">
      <CartButton />
      <span className="text-sm text-muted-foreground">
        {user.email}
      </span>
      {!user.email_confirmed_at && (
        <EmailVerificationButton userEmail={user.email} />
      )}
      <Button 
        variant="outline"
        onClick={handleSignOut}
      >
        退出登录
      </Button>
    </div>
  );
};