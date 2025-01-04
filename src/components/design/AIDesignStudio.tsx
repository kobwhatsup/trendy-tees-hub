import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Wand2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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

  const TShirtPreview = ({ color, designImage }: { color: string, designImage: string }) => (
    <div className="relative w-full aspect-[3/4] bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className="absolute inset-0 transition-colors"
        style={{ backgroundColor: color }}
      >
        {/* T恤轮廓 */}
        <div className="absolute inset-0 bg-[url('/t-shirt-template.png')] bg-contain bg-center bg-no-repeat opacity-10" />
        
        {/* 设计图案 */}
        {designImage && (
          <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/2 flex items-center justify-center">
            <img
              src={designImage}
              alt="T恤设计"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );

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
          <Card>
            <CardHeader>
              <CardTitle>设计描述</CardTitle>
              <CardDescription>
                详细描述你想要的设计风格、元素和主题
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  id="prompt"
                  placeholder="例如：一个充满未来感的机器人，使用蓝色和紫色的渐变色调..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="h-32"
                />
              </div>
              <Button
                onClick={handleGenerate}
                className="w-full"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    生成设计
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>设计预览</CardTitle>
                <CardDescription>
                  实时查看AI生成的设计效果
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden">
                  {designImage ? (
                    <img
                      src={designImage}
                      alt="AI生成的设计"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-muted-foreground text-center p-4">
                      <Wand2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>AI生成的设计将在这里显示</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {designImage && (
              <Card>
                <CardHeader>
                  <CardTitle>T恤效果</CardTitle>
                  <CardDescription>
                    查看设计在不同颜色T恤上的效果
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="white" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="white">白色</TabsTrigger>
                      <TabsTrigger value="black">黑色</TabsTrigger>
                      <TabsTrigger value="navy">藏青</TabsTrigger>
                      <TabsTrigger value="gray">灰色</TabsTrigger>
                    </TabsList>
                    <TabsContent value="white">
                      <TShirtPreview color="#ffffff" designImage={designImage} />
                    </TabsContent>
                    <TabsContent value="black">
                      <TShirtPreview color="#000000" designImage={designImage} />
                    </TabsContent>
                    <TabsContent value="navy">
                      <TShirtPreview color="#1B365D" designImage={designImage} />
                    </TabsContent>
                    <TabsContent value="gray">
                      <TShirtPreview color="#808080" designImage={designImage} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};