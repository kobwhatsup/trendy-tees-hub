import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DESIGN_GUIDELINES } from "../constants/designGuidelines";
import { supabase } from "@/integrations/supabase/client";

export const useDesignGeneration = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [frontDesignImage, setFrontDesignImage] = useState("");
  const [backDesignImage, setBackDesignImage] = useState("");

  const generateDesign = async (prompt: string, position: "front" | "back") => {
    if (!prompt.trim()) {
      toast({
        title: "请输入设计描述",
        description: "需要提供设计描述才能生成图案",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      console.log('开始生成设计...');
      const fullPrompt = `${prompt}\n\n${DESIGN_GUIDELINES}`;
      
      const response = await supabase.functions.invoke('generate-tshirt-design', {
        body: { prompt: fullPrompt }
      });

      console.log('OpenAI响应:', response);

      if (response.error) {
        throw new Error(response.error.message || '生成设计时出现错误');
      }

      if (!response.data?.imageUrl) {
        throw new Error('未能获取到设计图片');
      }

      console.log('获取到图片URL:', response.data.imageUrl);

      // 更新状态
      if (position === "front") {
        setFrontDesignImage(response.data.imageUrl);
      } else {
        setBackDesignImage(response.data.imageUrl);
      }
      
      toast({
        title: "设计生成成功",
        description: `${position === "front" ? "正面" : "背面"}设计已生成`,
      });

      // 保存设计到数据库
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error: draftError } = await supabase
          .from('design_drafts')
          .insert({
            user_id: user.id,
            design_front: position === "front" ? response.data.imageUrl : frontDesignImage,
            design_back: position === "back" ? response.data.imageUrl : backDesignImage,
            prompt_front: position === "front" ? prompt : "",
            prompt_back: position === "back" ? prompt : "",
            preview_front: position === "front" ? response.data.imageUrl : frontDesignImage,
            preview_back: position === "back" ? response.data.imageUrl : backDesignImage,
            title: `设计方案-${new Date().toISOString()}`,
          });

        if (draftError) {
          console.error('保存设计到数据库失败:', draftError);
          toast({
            title: "保存设计失败",
            description: "设计已生成但保存到数据库时出现错误",
            variant: "destructive",
          });
        }
      }

    } catch (error) {
      console.error('生成设计失败:', error);
      toast({
        title: "生成失败",
        description: error.message || "生成设计时出现错误",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    frontDesignImage,
    backDesignImage,
    generateDesign
  };
};