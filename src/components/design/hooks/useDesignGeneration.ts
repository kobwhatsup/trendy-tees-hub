import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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
        duration: 3000,
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('获取会话失败:', sessionError);
        toast({
          title: "会话错误",
          description: "请重新登录后再试",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      if (!session) {
        toast({
          title: "请先登录",
          description: "生成设计需要先登录账号",
          variant: "destructive",
          duration: 3000,
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

      if (position === "front") {
        setFrontDesignImage(response.data.imageUrl);
        toast({
          title: "设计生成成功",
          description: "正面设计已生成完成",
          className: "bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] text-white border-none animate-in slide-in-from-bottom-2",
          duration: 3000,
        });
      } else {
        setBackDesignImage(response.data.imageUrl);
        toast({
          title: "设计生成成功",
          description: "背面设计已生成完成",
          className: "bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] text-white border-none animate-in slide-in-from-bottom-2",
          duration: 3000,
        });
      }

    } catch (error) {
      console.error('生成设计失败:', error);
      toast({
        title: "生成失败",
        description: error.message || "生成设计时出现错误",
        variant: "destructive",
        duration: 3000,
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