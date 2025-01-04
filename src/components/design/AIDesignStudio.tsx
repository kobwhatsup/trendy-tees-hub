import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DesignInput } from "./DesignInput";
import { DesignPreview } from "./DesignPreview";
import { TShirtColorPreview } from "./TShirtColorPreview";

export const AIDesignStudio = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [designImage, setDesignImage] = useState("");
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

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <DesignInput
              prompt={prompt}
              isGenerating={isGenerating}
              onPromptChange={setPrompt}
              onGenerate={handleGenerate}
            />
            <DesignPreview designImage={designImage} />
          </div>
          
          {designImage && <TShirtColorPreview designImage={designImage} />}
        </div>
      </div>
    </div>
  );
};