import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface EmailVerificationButtonProps {
  userEmail: string;
}

export const EmailVerificationButton = ({ userEmail }: EmailVerificationButtonProps) => {
  const handleResendVerificationEmail = async () => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: userEmail,
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
    <Button 
      variant="outline"
      onClick={handleResendVerificationEmail}
      className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
    >
      重新发送验证邮件
    </Button>
  );
};