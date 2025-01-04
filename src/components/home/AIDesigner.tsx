import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export const AIDesigner = () => {
  return (
    <section className="py-16 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">AI设计师</h2>
          <p className="text-lg text-muted-foreground">让AI为你打造独一无二的T恤设计</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">个性化定制，由AI驱动</h3>
            <p className="text-muted-foreground leading-relaxed">
              我们的AI设计师能够理解你的创意想法，将其转化为独特的T恤图案。
              无论是简约风格还是复杂图案，AI都能为你呈现完美的设计效果。
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">智能创作</h4>
                  <p className="text-sm text-muted-foreground">根据你的描述，AI自动生成多个设计方案</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">实时预览</h4>
                  <p className="text-sm text-muted-foreground">即时查看设计效果，快速调整完善</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">个性定制</h4>
                  <p className="text-sm text-muted-foreground">支持颜色、尺寸、位置等细节调整</p>
                </div>
              </div>
            </div>
            <Button size="lg" className="mt-6">
              开始设计
            </Button>
          </div>
          
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img 
                src="https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=800&auto=format&fit=crop&q=80"
                alt="AI设计展示"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};