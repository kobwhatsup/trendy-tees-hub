import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DesignInput } from "./DesignInput";
import { DesignPreview } from "./DesignPreview";
import { TShirtStyleSelector } from "./TShirtStyleSelector";
import { TShirtColorPreview } from "./TShirtColorPreview";
import { ConfirmDesign } from "./ConfirmDesign";

export const AIDesignStudio = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [designImage, setDesignImage] = useState("");
  const [tshirtStyle, setTshirtStyle] = useState("short");
  const [tshirtColor, setTshirtColor] = useState("white");
  const { toast } = useToast();

  const handleGenerate = async () => {
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
      const { data, error } = await supabase.functions.invoke('generate-tshirt-design', {
        body: { prompt: prompt }
      });

      if (error) throw error;
      
      setDesignImage(data.imageUrl);
      toast({
        title: "设计生成成功",
        description: "AI已为您生成新的设计方案",
      });
    } catch (error) {
      console.error('生成失败:', error);
      toast({
        title: "生成失败",
        description: error.message || "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI设计工作室
          </h1>
          <p className="text-lg text-muted-foreground">
            描述你的创意想法，让AI为你打造独一无二的T恤设计
          </p>
        </div>

        <div className="space-y-12">
          {/* 步骤1：设计描述 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. 设计描述</h2>
            <DesignInput
              prompt={prompt}
              isGenerating={isGenerating}
              onPromptChange={setPrompt}
              onGenerate={handleGenerate}
            />
          </section>

          {/* 步骤2：设计预览 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. 设计预览</h2>
            <DesignPreview designImage={designImage} />
          </section>

          {/* 步骤3：T恤款式 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. T恤款式</h2>
            <TShirtStyleSelector
              style={tshirtStyle}
              color={tshirtColor}
              onStyleChange={setTshirtStyle}
              onColorChange={setTshirtColor}
            />
          </section>

          {/* 步骤4：T恤效果 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. T恤效果</h2>
            <TShirtColorPreview 
              designImage={designImage}
              tshirtStyle={tshirtStyle}
              tshirtColor={tshirtColor}
            />
          </section>

          {/* 步骤5：确认设计 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. 确认设计</h2>
            <ConfirmDesign
              tshirtStyle={tshirtStyle}
              tshirtColor={tshirtColor}
            />
          </section>
        </div>
      </div>
    </div>
  );
};