import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RulerIcon } from "lucide-react";

export const SizeGuideDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-muted-foreground hover:text-primary"
        >
          <RulerIcon className="h-4 w-4 mr-1" />
          尺码说明
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>尺码对照表</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left">尺码</th>
                  <th className="px-4 py-2 text-left">胸宽(cm)</th>
                  <th className="px-4 py-2 text-left">肩宽(cm)</th>
                  <th className="px-4 py-2 text-left">衣长(cm)</th>
                  <th className="px-4 py-2 text-left">袖长(cm)</th>
                  <th className="px-4 py-2 text-left">建议身高(cm)</th>
                  <th className="px-4 py-2 text-left">建议体重(kg)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2">S (160/84A)</td>
                  <td className="px-4 py-2">46</td>
                  <td className="px-4 py-2">42.7</td>
                  <td className="px-4 py-2">65</td>
                  <td className="px-4 py-2">19</td>
                  <td className="px-4 py-2">160</td>
                  <td className="px-4 py-2">90-100</td>
                </tr>
                <tr className="border-b bg-muted/50">
                  <td className="px-4 py-2">M (165/88A)</td>
                  <td className="px-4 py-2">48.5</td>
                  <td className="px-4 py-2">44</td>
                  <td className="px-4 py-2">67</td>
                  <td className="px-4 py-2">19.5</td>
                  <td className="px-4 py-2">165</td>
                  <td className="px-4 py-2">100-110</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">L (170/92A)</td>
                  <td className="px-4 py-2">51</td>
                  <td className="px-4 py-2">45.3</td>
                  <td className="px-4 py-2">69</td>
                  <td className="px-4 py-2">20</td>
                  <td className="px-4 py-2">170</td>
                  <td className="px-4 py-2">110-125</td>
                </tr>
                <tr className="border-b bg-muted/50">
                  <td className="px-4 py-2">XL (175/96A)</td>
                  <td className="px-4 py-2">53.5</td>
                  <td className="px-4 py-2">46.8</td>
                  <td className="px-4 py-2">71</td>
                  <td className="px-4 py-2">20.5</td>
                  <td className="px-4 py-2">175</td>
                  <td className="px-4 py-2">125-140</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">2XL (180/100A)</td>
                  <td className="px-4 py-2">56</td>
                  <td className="px-4 py-2">48.3</td>
                  <td className="px-4 py-2">73</td>
                  <td className="px-4 py-2">21</td>
                  <td className="px-4 py-2">180</td>
                  <td className="px-4 py-2">140-155</td>
                </tr>
                <tr className="border-b bg-muted/50">
                  <td className="px-4 py-2">3XL (185/104A)</td>
                  <td className="px-4 py-2">58.5</td>
                  <td className="px-4 py-2">49.8</td>
                  <td className="px-4 py-2">75</td>
                  <td className="px-4 py-2">21.5</td>
                  <td className="px-4 py-2">185</td>
                  <td className="px-4 py-2">155-170</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            温馨提示：由于测量工具和方法不同，1-3CM误差属于正常情况，谢谢合作
          </p>
          <div className="mt-6">
            <img 
              src="/lovable-uploads/9b4e0662-4de9-4811-8c04-3c3cb6d7165e.png" 
              alt="T恤尺寸示意图"
              className="max-w-full h-auto mx-auto"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};