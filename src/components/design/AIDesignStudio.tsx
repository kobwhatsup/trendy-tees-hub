import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DesignInput } from "./DesignInput";
import { DesignPreview } from "./DesignPreview";
import { TShirtStyleSelector } from "./TShirtStyleSelector";
import { TShirtColorPreview } from "./TShirtColorPreview";
import { ConfirmDesign } from "./ConfirmDesign";

export const AIDesignStudio = () => {
  const [frontPrompt, setFrontPrompt] = useState("");
  const [backPrompt, setBackPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [frontDesignImage, setFrontDesignImage] = useState("");
  const [backDesignImage, setBackDesignImage] = useState("");
  const [tshirtStyle, setTshirtStyle] = useState("short");
  const [tshirtColor, setTshirtColor] = useState("white");
  const [tshirtGender, setTshirtGender] = useState("male");
  const { toast } = useToast();

  const handleGenerate = async (position: "front" | "back") => {
    const prompt = position === "front" ? frontPrompt : backPrompt;
    
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
      const response = await supabase.functions.invoke('generate-tshirt-design', {
        body: { prompt: prompt }
      });

      if (response.error) {
        console.error('生成失败:', response.error);
        throw new Error(response.error.message || '生成设计时出现错误');
      }

      if (!response.data?.imageUrl) {
        throw new Error('未能获取到设计图片');
      }
      
      if (position === "front") {
        setFrontDesignImage(response.data.imageUrl);
      } else {
        setBackDesignImage(response.data.imageUrl);
      }
      
      toast({
        title: "设计生成成功",
        description: `AI已为您生成新的${position === "front" ? "正面" : "背面"}设计方案`,
      });
    } catch (error) {
      console.error('生成失败:', error);
      
      // 根据错误类型显示不同的错误信息
      let errorMessage = '生成设计时出现错误，请稍后重试';
      
      if (error.message?.includes('Failed to fetch') || error.message?.includes('network')) {
        errorMessage = '网络连接错误，请检查您的网络连接并重试';
      } else if (error.message?.includes('timeout')) {
        errorMessage = '请求超时，请稍后重试';
      } else if (error.message?.includes('rate limit')) {
        errorMessage = 'API调用次数已达上限，请稍后再试';
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
          {/* 步骤1：设计描述 */}
          <section className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 w-full text-center py-2 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] text-white">
              第一步 设计描述
            </h2>
            <div className="w-full">
              <DesignInput
                frontPrompt={frontPrompt}
                backPrompt={backPrompt}
                isGenerating={isGenerating}
                onFrontPromptChange={setFrontPrompt}
                onBackPromptChange={setBackPrompt}
                onGenerate={handleGenerate}
              />
            </div>
          </section>

          {/* 步骤2：设计预览 */}
          <section className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 w-full text-center py-2 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] text-white">
              第二步 设计预览
            </h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <DesignPreview designImage={frontDesignImage} title="正面设计" />
              <DesignPreview designImage={backDesignImage} title="背面设计" />
            </div>
          </section>

          {/* 步骤3：T恤款式 */}
          <section className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 w-full text-center py-2 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] text-white">
              第三步 T恤款式
            </h2>
            <div className="w-full">
              <TShirtStyleSelector
                style={tshirtStyle}
                color={tshirtColor}
                gender={tshirtGender}
                onStyleChange={setTshirtStyle}
                onColorChange={setTshirtColor}
                onGenderChange={setTshirtGender}
              />
            </div>
          </section>

          {/* 步骤4：T恤效果 */}
          <section className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 w-full text-center py-2 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] text-white">
              第四步 T恤效果
            </h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">正面效果</h3>
                <TShirtColorPreview 
                  designImage={frontDesignImage}
                  tshirtStyle={tshirtStyle}
                  tshirtColor={tshirtColor}
                  tshirtGender={tshirtGender}
                  position="front"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">背面效果</h3>
                <TShirtColorPreview 
                  designImage={backDesignImage}
                  tshirtStyle={tshirtStyle}
                  tshirtColor={tshirtColor}
                  tshirtGender={tshirtGender}
                  position="back"
                />
              </div>
            </div>
          </section>

          {/* 步骤5：确认设计 */}
          <section className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 w-full text-center py-2 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] text-white">
              第五步 确认设计
            </h2>
            <div className="w-full">
              <ConfirmDesign
                tshirtStyle={tshirtStyle}
                tshirtColor={tshirtColor}
                tshirtGender={tshirtGender}
                frontDesignImage={frontDesignImage}
                backDesignImage={backDesignImage}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};