import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Palette, Sliders } from "lucide-react";

export const AIDesigner = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI设计师
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            让AI为你打造独一无二的T恤设计
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h3 className="text-3xl font-semibold">个性化定制，由AI驱动</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              我们的AI设计师能够深理解你的创意想法，将其转化为独特的T恤图案。
              无论是简约风格还是复杂图案，AI都能为你呈现完美的设计效果。
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group hover:bg-accent/50 p-4 rounded-lg transition-colors">
                <Brain className="h-8 w-8 text-primary mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="text-lg font-medium mb-2">智能创作</h4>
                  <p className="text-muted-foreground">根据你的描述，AI自动生成多个设计方案，让创意不再受限</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group hover:bg-accent/50 p-4 rounded-lg transition-colors">
                <Palette className="h-8 w-8 text-primary mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="text-lg font-medium mb-2">实时预览</h4>
                  <p className="text-muted-foreground">即时查看设计效果，快速调整完善，让创作过程更加流畅</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group hover:bg-accent/50 p-4 rounded-lg transition-colors">
                <Sliders className="h-8 w-8 text-primary mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="text-lg font-medium mb-2">个性定制</h4>
                  <p className="text-muted-foreground">支持颜色、尺寸、位置等细节调整，打造专属于你的设计</p>
                </div>
              </div>
            </div>
            <Button 
              size="lg" 
              className="mt-8 text-lg px-8 py-6 h-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              开始设计
            </Button>
          </div>
          
          <Card className="overflow-hidden shadow-2xl">
            <CardContent className="p-0">
              <img 
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80"
                alt="AI设计展示"
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};