import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DesignInput } from "./DesignInput";
import { DesignPreview } from "./DesignPreview";
import { TShirtStyleSelector } from "./TShirtStyleSelector";
import { TShirtColorPreview } from "./TShirtColorPreview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const AIDesignStudio = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [designImage, setDesignImage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
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
      setCurrentStep(2);
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

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <DesignInput
            prompt={prompt}
            isGenerating={isGenerating}
            onPromptChange={setPrompt}
            onGenerate={handleGenerate}
          />
        );
      case 2:
        return <DesignPreview designImage={designImage} />;
      case 3:
        return (
          <TShirtStyleSelector
            style={tshirtStyle}
            color={tshirtColor}
            onStyleChange={setTshirtStyle}
            onColorChange={setTshirtColor}
          />
        );
      case 4:
        return <TShirtColorPreview designImage={designImage} />;
      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>确认设计</CardTitle>
              <CardDescription>
                确认您的设计方案
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p><strong>款式：</strong>{tshirtStyle === 'short' ? '短袖' : '长袖'}</p>
                <p><strong>颜色：</strong>{tshirtColor}</p>
              </div>
              <Button className="w-full" onClick={() => {
                toast({
                  title: "设计已确认",
                  description: "您的设计已保存",
                });
              }}>
                <Check className="mr-2 h-4 w-4" />
                确认设计
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return null;
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

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex items-center ${
                  step !== 5 ? "flex-1" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === currentStep
                      ? "bg-primary text-primary-foreground"
                      : step < currentStep
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step !== 5 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      step < currentStep
                        ? "bg-primary/20"
                        : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>设计描述</span>
            <span>设计预览</span>
            <span>T恤款式</span>
            <span>T恤效果</span>
            <span>确认设计</span>
          </div>
        </div>

        <div className="grid gap-8">
          {renderStepContent()}
          
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
            >
              上一步
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={currentStep === 5 || (currentStep === 1 && !designImage)}
            >
              下一步
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};