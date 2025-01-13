import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface PrivateKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PrivateKeyDialog = ({
  open,
  onOpenChange,
}: PrivateKeyDialogProps) => {
  const [privateKey, setPrivateKey] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      setIsProcessing(true);
      
      // 更新Edge Function的密钥
      const { error } = await supabase.functions.invoke('update-private-key', {
        body: { privateKey }
      });

      if (error) throw error;

      toast({
        title: "私钥已更新",
        description: "请重新尝试支付",
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('更新私钥失败:', error);
      toast({
        title: "更新失败",
        description: "请检查私钥格式是否正确",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            取消
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isProcessing}
          >
            {isProcessing ? "保存中..." : "保存"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};