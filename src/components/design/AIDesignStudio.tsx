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
      const { data, error } = await supabase.functions.invoke('generate-tshirt-design', {
        body: { prompt: prompt }
      });

      if (error) throw error;
      
      if (position === "front") {
        setFrontDesignImage(data.imageUrl);
      } else {
        setBackDesignImage(data.imageUrl);
      }
      
      toast({
        title: "设计生成成功",
        description: `AI已为您生成新的${position === "front" ? "正面" : "背面"}设计方案`,
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
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-slate-900 text-white px-8 py-3 rounded-full mb-4">
            <h1 className="text-2xl font-bold">AI设计师</h1>
          </div>
          <p className="text-slate-600">
            描述你的创意想法，让AI为你打造独一无二的T恤设计
          </p>
        </div>

        <div className="space-y-12">
          {/* 步骤1：设计描述 */}
          <section className="border rounded-lg bg-muted/10 p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">第一步：描述创意</h2>
              <p className="text-slate-600">
                详细描述你想要的设计风格、元素和主题，可以选择只设计一面，也可以两面都设计
              </p>
            </div>
            <DesignInput
              frontPrompt={frontPrompt}
              backPrompt={backPrompt}
              isGenerating={isGenerating}
              onFrontPromptChange={setFrontPrompt}
              onBackPromptChange={setBackPrompt}
              onGenerate={handleGenerate}
            />
          </section>

          {/* 步骤2：设计预览 */}
          <section>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">2. 设计预览</h2>
              <p className="text-slate-600">
                查看AI为您生成的设计效果
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DesignPreview designImage={frontDesignImage} title="正面设计" />
              <DesignPreview designImage={backDesignImage} title="背面设计" />
            </div>
          </section>

          {/* 步骤3：T恤款式 */}
          <section>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">3. T恤款式</h2>
              <p className="text-slate-600">
                选择适合您的T恤款式和颜色
              </p>
            </div>
            <TShirtStyleSelector
              style={tshirtStyle}
              color={tshirtColor}
              gender={tshirtGender}
              onStyleChange={setTshirtStyle}
              onColorChange={setTshirtColor}
              onGenderChange={setTshirtGender}
            />
          </section>

          {/* 步骤4：T恤效果 */}
          <section>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">4. T恤效果</h2>
              <p className="text-slate-600">
                预览设计效果在T恤上的呈现
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <section>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">5. 确认设计</h2>
              <p className="text-slate-600">
                确认您的设计方案并提交订单
              </p>
            </div>
            <ConfirmDesign
              tshirtStyle={tshirtStyle}
              tshirtColor={tshirtColor}
              tshirtGender={tshirtGender}
            />
          </section>
        </div>
      </div>
    </div>
  );
};