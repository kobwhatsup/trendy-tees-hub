import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TShirtImage } from "./TShirtImage";
import { DesignOverlay } from "./DesignOverlay";

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
}

export const PreviewDialog = ({ 
  color, 
  style, 
  gender,
  designImage, 
  settings 
}: PreviewDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-[90vw] max-h-[90vh] p-4">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full max-h-full overflow-hidden">
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};