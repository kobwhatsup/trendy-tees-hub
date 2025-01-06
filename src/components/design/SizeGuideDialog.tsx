import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RulerIcon } from "lucide-react";
import { SizeTable } from "./SizeTable";

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
            <SizeTable />
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