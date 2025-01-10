import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { Json } from "@/integrations/supabase/types";
import type { DesignSettings } from "@/types/design";

interface SaveDesignProps {
  frontPrompt: string;
  backPrompt: string;
  frontDesignImage: string;
  backDesignImage: string;
  tshirtGender: string;
  tshirtStyle: string;
  tshirtMaterial: string;
  tshirtSize: string;
  tshirtColor: string;
  frontDesignSettings: DesignSettings;
  backDesignSettings: DesignSettings;
  frontPreviewImage?: string;
  backPreviewImage?: string;
}

export const useSaveDesign = () => {
  const { toast } = useToast();

  const saveDesignProject = async ({
    frontPrompt,
    backPrompt,
    frontDesignImage,
    backDesignImage,
    tshirtGender,
    tshirtStyle,
    tshirtMaterial,
    tshirtSize,
    tshirtColor,
    frontDesignSettings,
    backDesignSettings,
    frontPreviewImage,
    backPreviewImage
  }: SaveDesignProps) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "请先登录",
          description: "保存设计方案需要先登录账号",
          variant: "destructive",
        });
        return;
      }

      const frontSettingsJson = frontDesignSettings as unknown as Json;
      const backSettingsJson = backDesignSettings as unknown as Json;

      const { error } = await supabase
        .from('design_projects')
        .insert({
          user_id: user.id,
          prompt_front: frontPrompt,
          prompt_back: backPrompt,
          design_front: frontDesignImage,
          design_back: backDesignImage,
          tshirt_gender: tshirtGender,
          tshirt_style: tshirtStyle,
          tshirt_material: tshirtMaterial,
          tshirt_size: tshirtSize,
          tshirt_color: tshirtColor,
          front_design_settings: frontSettingsJson,
          back_design_settings: backSettingsJson,
          preview_front: frontPreviewImage,
          preview_back: backPreviewImage,
          title: `设计方案-${new Date().toISOString()}`,
        });

      if (error) throw error;

      toast({
        title: "保存成功",
        description: "设计方案已保存",
      });

    } catch (error) {
      console.error('保存设计方案失败:', error);
      toast({
        title: "保存失败",
        description: "保存设计方案时出现错误，请重试",
        variant: "destructive",
      });
    }
  };

  return { saveDesignProject };
};