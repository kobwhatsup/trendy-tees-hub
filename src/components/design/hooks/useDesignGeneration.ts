import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DESIGN_GUIDELINES } from "../constants/designGuidelines";

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
      // 首先检查用户会话
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('获取会话失败:', sessionError);
        toast({
          title: "会话错误",
          description: "请重新登录后再试",
          variant: "destructive",
        });
        return;
      }

      if (!session) {
        toast({
          title: "请先登录",
          description: "生成设计需要先登录账号",
          variant: "destructive",
        });
        return;
      }

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
    generateDesign,
    setFrontDesignImage,
    setBackDesignImage
  };
};