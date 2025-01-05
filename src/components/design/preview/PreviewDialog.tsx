import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TShirtImage } from "./TShirtImage";
import { DesignOverlay } from "./DesignOverlay";
import { ReactNode } from "react";
import { DesignControls } from "../DesignControls";

interface PreviewDialogProps {
  color: string;
  style: string;
  gender: string;
  designImage: string;
  settings: {
    scale: number;
    rotation: number;
    opacity: number;
    position: "front" | "back";
    offsetX: number;
    offsetY: number;
  };
  children?: ReactNode;
  onSettingChange?: (key: keyof typeof settings, value: number | string) => void;
}

export const PreviewDialog = ({ 
  color, 
  style, 
  gender,
  designImage, 
  settings,
  children,
  onSettingChange
}: PreviewDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <button className="w-full cursor-zoom-in">
            <div className="relative w-full aspect-[3/4] bg-white rounded-lg shadow-md overflow-hidden">
              <TShirtImage 
                color={color}
                style={style}
                gender={gender}
                position={settings.position}
              />
              <DesignOverlay 
                designImage={designImage}
                settings={settings}
              />
            </div>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[90vw] h-[85vh] p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          <div className="md:col-span-2 flex items-center justify-center">
            <div className="relative w-full h-full">
              <div className="relative w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
                <TShirtImage 
                  color={color}
                  style={style}
                  gender={gender}
                  position={settings.position}
                />
                <DesignOverlay 
                  designImage={designImage}
                  settings={settings}
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-lg font-medium">设计调整</h3>
            {onSettingChange && (
              <DesignControls
                settings={settings}
                onSettingChange={onSettingChange}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};