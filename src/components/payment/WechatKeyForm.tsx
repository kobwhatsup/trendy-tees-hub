import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const WechatKeyForm = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // 验证私钥格式
      if (!privateKey.includes("-----BEGIN PRIVATE KEY-----") || 
          !privateKey.includes("-----END PRIVATE KEY-----")) {
        toast({
          title: "格式错误",
          description: "请确保输入完整的PKCS#8 PEM格式私钥，包含BEGIN/END标记",
          variant: "destructive",
        });
        return;
      }

      // 更新私钥
      const { error } = await supabase.functions.invoke('update-wechat-key', {
        body: { privateKey }
      });

      if (error) throw error;

      toast({
        title: "更新成功",
        description: "微信支付私钥已更新",
      });

      setPrivateKey("");
    } catch (error) {
      console.error("更新私钥失败:", error);
      toast({
        title: "更新失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">配置微信支付私钥</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>配置微信支付私钥</DialogTitle>
          <DialogDescription>
            请输入完整的PKCS#8 PEM格式私钥，包含BEGIN和END标记
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="-----BEGIN PRIVATE KEY-----&#10;你的私钥内容&#10;-----END PRIVATE KEY-----"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            className="h-[200px] font-mono text-sm"
          />
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "更新中..." : "更新私钥"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};