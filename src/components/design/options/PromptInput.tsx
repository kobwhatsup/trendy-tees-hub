import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Wand2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PromptInputProps {
  frontPrompt: string;
  backPrompt: string;
  isGenerating: boolean;
  onFrontPromptChange: (value: string) => void;
  onBackPromptChange: (value: string) => void;
  onGenerate: (position: "front" | "back") => void;
}

export const PromptInput = ({
  frontPrompt,
  backPrompt,
  isGenerating,
  onFrontPromptChange,
  onBackPromptChange,
  onGenerate,
}: PromptInputProps) => {
  return (
    <Tabs defaultValue="front" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="front">正面设计</TabsTrigger>
        <TabsTrigger value="back">背面设计</TabsTrigger>
      </TabsList>
      <TabsContent value="front" className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="描述正面设计，例如：一个充满未来感的机器人，使用蓝色和紫色的渐变色调..."
            value={frontPrompt}
            onChange={(e) => onFrontPromptChange(e.target.value)}
            className="h-32"
          />
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => onGenerate("front")}
            className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white shadow-lg px-8 py-4 h-auto text-lg rounded-full"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-6 w-6" />
                生成正面设计
              </>
            )}
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="back" className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="描述背面设计，例如：简约的几何图案，搭配品牌标志..."
            value={backPrompt}
            onChange={(e) => onBackPromptChange(e.target.value)}
            className="h-32"
          />
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => onGenerate("back")}
            className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white shadow-lg px-8 py-4 h-auto text-lg rounded-full"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-6 w-6" />
                生成背面设计
              </>
            )}
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};