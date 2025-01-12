import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("开始登录流程，邮箱:", email);

      // 1. 基本登录
      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error("登录错误:", signInError);
        throw signInError;
      }

      if (!user) {
        console.error("登录失败：没有用户数据");
        toast({
          title: "登录失败",
          description: "邮箱或密码错误",
          variant: "destructive",
        });
        return;
      }

      console.log("用户登录成功，ID:", user.id);

      // 2. 验证管理员权限
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .single();

      console.log("管理员验证结果:", { adminData, adminError });

      if (adminError || !adminData) {
        console.error("管理员验证失败:", adminError);
        // 如果不是管理员，立即登出
        await supabase.auth.signOut();
        toast({
          title: "访问被拒绝",
          description: "您不是管理员用户",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "登录成功",
        description: "欢迎回来，管理员！",
      });
      
      console.log("验证成功，正在跳转到管理面板");
      navigate('/admin');
      
    } catch (error) {
      console.error('登录过程出错:', error);
      toast({
        title: "登录失败",
        description: "请检查您的登录信息",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">管理员登录</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="管理员邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "登录中..." : "登录"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;