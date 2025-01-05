import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserMenuProps {
  user: any;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleResendVerificationEmail = async () => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user?.email,
    });
    
    if (error) {
      toast({
        title: "发送失败",
        description: "验证邮件发送失败，请稍后重试。如果问题持续存在，请检查邮箱地址是否正确。",
        variant: "destructive",
      });
    } else {
      toast({
        title: "发送成功",
        description: "验证邮件已发送，请查收。如果没有收到邮件，请检查垃圾邮件文件夹。",
      });
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <Button 
        variant="ghost" 
        size="icon"
        className="relative"
        onClick={() => navigate("/cart")}
      >
        <ShoppingCart className="h-5 w-5" />
      </Button>
      <span className="text-sm text-muted-foreground">
        {user.email}
      </span>
      {!user.email_confirmed_at && (
        <Button 
          variant="outline"
          onClick={handleResendVerificationEmail}
          className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
        >
          重新发送验证邮件
        </Button>
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