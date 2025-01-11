import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DesignMetricsProps {
  viewCount: number;
  useCount: number;
  salesAmount: number;
  totalEarnings: number;
}

export const DesignMetrics = ({
  viewCount,
  useCount,
  salesAmount,
  totalEarnings
}: DesignMetricsProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div>
        <p className="text-muted-foreground">浏览次数</p>
        <p className="font-medium">{viewCount || 0}</p>
      </div>
      <div>
        <p className="text-muted-foreground">使用次数</p>
        <p className="font-medium">{useCount || 0}</p>
      </div>
      <div>
        <p className="text-muted-foreground flex items-center gap-1">
          销售收入
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>印有该设计图的T恤收入总额</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>
        <p className="font-medium">¥{salesAmount?.toFixed(2) || '0.00'}</p>
      </div>
      <div>
        <p className="text-muted-foreground flex items-center gap-1">
          获得奖励
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>该设计图的T恤收入总额*10%，该奖励归您所有</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>
        <p className="font-medium text-green-600">¥{totalEarnings?.toFixed(2) || '0.00'}</p>
      </div>
    </div>
  );
};