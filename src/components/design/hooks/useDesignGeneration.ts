import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DESIGN_GUIDELINES } from "../constants/designGuidelines";
import { supabase } from "@/integrations/supabase/client";

export const useDesignGeneration = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [frontDesignImage, setFrontDesignImage] = useState("");
  const [backDesignImage, setBackDesignImage] = useState("");

  const saveImageToStorage = async (imageUrl: string, position: string) => {
    try {
      // 从OpenAI URL获取图片数据
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // 生成唯一文件名
      const fileName = `${crypto.randomUUID()}-${position}.png`;
      
      // 上传到Supabase存储
      const { data, error } = await supabase.storage
        .from('design-images')
        .upload(fileName, blob, {
          contentType: 'image/png',
          upsert: false
        });

      if (error) throw error;

      // 获取公开访问URL
      const { data: { publicUrl } } = supabase.storage
        .from('design-images')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('保存图片失败:', error);
      throw error;
    }
  };

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
      const fullPrompt = `${prompt}\n\n${DESIGN_GUIDELINES}`;
      
      const response = await supabase.functions.invoke('generate-tshirt-design', {
        body: { prompt: fullPrompt }
      });

      if (response.error) {
        throw new Error(response.error.message || '生成设计时出现错误');
      }

      if (!response.data?.imageUrl) {
        throw new Error('未能获取到设计图片');
      }

      // 保存图片到存储
      const persistentImageUrl = await saveImageToStorage(
        response.data.imageUrl,
        position
      );

      // 更新状态
      if (position === "front") {
        setFrontDesignImage(persistentImageUrl);
      } else {
        setBackDesignImage(persistentImageUrl);
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
            design_front: position === "front" ? persistentImageUrl : frontDesignImage,
            design_back: position === "back" ? persistentImageUrl : backDesignImage,
            prompt_front: position === "front" ? prompt : "",
            prompt_back: position === "back" ? prompt : "",
            preview_front: position === "front" ? persistentImageUrl : frontDesignImage,
            preview_back: position === "back" ? persistentImageUrl : backDesignImage,
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