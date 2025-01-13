import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const PrivateKeyInput = () => {
  const [open, setOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const { toast } = useToast();

  const formatPrivateKey = (key: string) => {
    // 移除所有空格和换行符
    let cleanKey = key.replace(/\s+/g, '');
    
    // 检查是否已经包含PEM头尾
    if (!cleanKey.includes('-----BEGIN PRIVATE KEY-----')) {
      cleanKey = '-----BEGIN PRIVATE KEY-----' + cleanKey;
    }
    if (!cleanKey.includes('-----END PRIVATE KEY-----')) {
      cleanKey = cleanKey + '-----END PRIVATE KEY-----';
    }
    
    // 每64个字符添加换行符
    const lines = cleanKey.match(/.{1,64}/g) || [];
    return lines.join('\n');
  };

  const handleSave = async () => {
    try {
      const formattedKey = formatPrivateKey(privateKey);
      
      // 更新Edge Function的密钥
      const { error } = await supabase.functions.invoke('update-private-key', {
        body: { privateKey: formattedKey }
      });

      if (error) throw error;

      toast({
        title: "私钥已更新",
        description: "请重新尝试支付",
      });
      
      setOpen(false);
    } catch (error) {
      console.error('更新私钥失败:', error);
      toast({
        title: "更新失败",
        description: "请检查私钥格式是否正确",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setOpen(true)}
        className="w-full"
      >
        更新微信支付私钥
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>输入微信支付私钥</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Textarea
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              placeholder="请输入私钥内容..."
              className="font-mono h-[200px]"
            />
            
            <div className="text-sm text-muted-foreground">
              <p>注意事项：</p>
              <ul className="list-disc list-inside space-y-1">
                <li>请确保包含完整的PEM格式头尾</li>
                <li>系统会自动处理换行符</li>
                <li>私钥将安全存储在服务器端</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave}>
              保存
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};