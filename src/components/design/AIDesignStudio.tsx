import { useState, useCallback } from "react";
import { useDesignGeneration } from "./hooks/useDesignGeneration";
import { DesignDescription } from "./steps/DesignDescription";
import { DesignPreviewStep } from "./steps/DesignPreviewStep";
import { TShirtStyleStep } from "./steps/TShirtStyleStep";
import { TShirtEffectStep } from "./steps/TShirtEffectStep";
import { ConfirmDesignStep } from "./steps/ConfirmDesignStep";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { Json } from "@/integrations/supabase/types";

interface DesignSettings {
  scale: number;
  rotation: number;
  opacity: number;
  position: "front" | "back";
  offsetX: number;
  offsetY: number;
}

export const AIDesignStudio = () => {
  const { toast } = useToast();
  const [frontPrompt, setFrontPrompt] = useState("");
  const [backPrompt, setBackPrompt] = useState("");
  const [tshirtStyle, setTshirtStyle] = useState("short");
  const [tshirtColor, setTshirtColor] = useState("white");
  const [tshirtGender, setTshirtGender] = useState("male");
  const [tshirtSize, setTshirtSize] = useState("M");
  const [tshirtMaterial, setTshirtMaterial] = useState("cotton");
  const [frontPreviewImage, setFrontPreviewImage] = useState<string>();
  const [backPreviewImage, setBackPreviewImage] = useState<string>();
  const [frontDesignSettings, setFrontDesignSettings] = useState<DesignSettings>({
    scale: 0.8,
    rotation: 0,
    opacity: 1,
    position: "front",
    offsetX: 0,
    offsetY: 30
  });
  const [backDesignSettings, setBackDesignSettings] = useState<DesignSettings>({
    scale: 0.8,
    rotation: 0,
    opacity: 1,
    position: "back",
    offsetX: 0,
    offsetY: 10
  });

  const {
    isGenerating,
    frontDesignImage,
    backDesignImage,
    generateDesign,
    setFrontDesignImage,
    setBackDesignImage
  } = useDesignGeneration();

  const handleGenerate = (position: "front" | "back") => {
    const prompt = position === "front" ? frontPrompt : backPrompt;
    generateDesign(prompt, position);
  };

  const handleDesignImagesChange = useCallback((frontImage: string, backImage: string) => {
    setFrontDesignImage(frontImage);
    setBackDesignImage(backImage);
  }, [setFrontDesignImage, setBackDesignImage]);

  const handleSettingsChange = (position: "front" | "back", settings: DesignSettings) => {
    if (position === "front") {
      setFrontDesignSettings(settings);
    } else {
      setBackDesignSettings(settings);
    }
  };

  const saveDesignProject = async () => {
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

      // 将 DesignSettings 转换为 Json 类型
      const frontSettingsJson = {
        scale: frontDesignSettings.scale,
        rotation: frontDesignSettings.rotation,
        opacity: frontDesignSettings.opacity,
        position: frontDesignSettings.position,
        offsetX: frontDesignSettings.offsetX,
        offsetY: frontDesignSettings.offsetY
      } as unknown as Json;

      const backSettingsJson = {
        scale: backDesignSettings.scale,
        rotation: backDesignSettings.rotation,
        opacity: backDesignSettings.opacity,
        position: backDesignSettings.position,
        offsetX: backDesignSettings.offsetX,
        offsetY: backDesignSettings.offsetY
      } as unknown as Json;

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

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#0EA5E9] via-[#ea384c] to-[#0EA5E9] text-transparent bg-clip-text">
            AI设计师
          </h1>
          <p className="text-lg text-muted-foreground">
            描述你的创意想法，让AI为你打造独一无二的T恤设计
          </p>
        </div>

        <div className="space-y-12">
          <DesignDescription
            frontPrompt={frontPrompt}
            backPrompt={backPrompt}
            isGenerating={isGenerating}
            onFrontPromptChange={setFrontPrompt}
            onBackPromptChange={setBackPrompt}
            onGenerate={handleGenerate}
          />

          <DesignPreviewStep
            frontDesignImage={frontDesignImage}
            backDesignImage={backDesignImage}
            onDesignImagesChange={handleDesignImagesChange}
          />

          <TShirtStyleStep
            style={tshirtStyle}
            color={tshirtColor}
            gender={tshirtGender}
            size={tshirtSize}
            material={tshirtMaterial}
            onStyleChange={setTshirtStyle}
            onColorChange={setTshirtColor}
            onGenderChange={setTshirtGender}
            onSizeChange={setTshirtSize}
            onMaterialChange={setTshirtMaterial}
          />

          <TShirtEffectStep
            frontDesignImage={frontDesignImage}
            backDesignImage={backDesignImage}
            tshirtStyle={tshirtStyle}
            tshirtColor={tshirtColor}
            tshirtGender={tshirtGender}
            onFrontPreviewCapture={setFrontPreviewImage}
            onBackPreviewCapture={setBackPreviewImage}
            onFrontSettingsChange={(settings) => handleSettingsChange("front", settings)}
            onBackSettingsChange={(settings) => handleSettingsChange("back", settings)}
          />

          <ConfirmDesignStep
            tshirtStyle={tshirtStyle}
            tshirtColor={tshirtColor}
            tshirtGender={tshirtGender}
            tshirtSize={tshirtSize}
            frontDesignImage={frontDesignImage}
            backDesignImage={backDesignImage}
            frontPreviewImage={frontPreviewImage}
            backPreviewImage={backPreviewImage}
            onSave={saveDesignProject}
          />
        </div>
      </div>
    </div>
  );
};