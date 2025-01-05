import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DESIGN_GUIDELINES } from "../constants/designGuidelines";

export const useDesignGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [frontDesignImage, setFrontDesignImage] = useState("");
  const [backDesignImage, setBackDesignImage] = useState("");

  const generateDesign = async (prompt: string, position: "front" | "back") => {
    if (!prompt.trim()) {
      toast({
        title: "请输入设计描述",
        description: "请告诉AI设计师你想要什么样的设计",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // 将用户输入的提示词与设计规范结合
      const fullPrompt = `${prompt}\n\n${DESIGN_GUIDELINES}`;
      
      const response = await supabase.functions.invoke('generate-tshirt-design', {
        body: { prompt: fullPrompt }
      });

      if (response.error) {
        console.error('生成失败:', response.error);
        throw new Error(response.error.message || '生成设计时出现错误');
      }

      if (!response.data?.imageUrl) {
        throw new Error('未能获取到设计图片');
      }

      // 更新状态
      if (position === "front") {
        setFrontDesignImage(response.data.imageUrl);
      } else {
        setBackDesignImage(response.data.imageUrl);
      }

      // 获取当前用户
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('需要登录才能保存设计');
      }

      // 保存设计到数据库
      const { error: saveError } = await supabase
        .from('design_drafts')
        .insert({
          user_id: user.id,
          design_front: position === "front" ? response.data.imageUrl : frontDesignImage,
          design_back: position === "back" ? response.data.imageUrl : backDesignImage,
          prompt_front: position === "front" ? prompt : null,
          prompt_back: position === "back" ? prompt : null,
        });

      if (saveError) {
        console.error('保存设计失败:', saveError);
        throw new Error('保存设计时出现错误');
      }
      
      toast({
        title: "设计生成成功",
        description: `AI已为您生成新的${position === "front" ? "正面" : "背面"}设计方案`,
      });
    } catch (error) {
      console.error('生成失败:', error);
      
      let errorMessage = '生成设计时出现错误，请稍后重试';
      
      if (error.message?.includes('Failed to fetch') || error.message?.includes('network')) {
        errorMessage = '网络连接错误，请检查您的网络连接并重试';
      } else if (error.message?.includes('timeout')) {
        errorMessage = '请求超时，请稍后重试';
      } else if (error.message?.includes('rate limit')) {
        errorMessage = 'API调用次数已达上限，请稍后再试';
      } else if (error.message?.includes('需要登录')) {
        errorMessage = '请先登录后再生成设计';
      }
      
      toast({
        title: "生成失败",
        description: errorMessage,
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