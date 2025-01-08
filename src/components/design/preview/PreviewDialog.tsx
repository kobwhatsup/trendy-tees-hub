import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TShirtImage } from "./TShirtImage";
import { DesignOverlay } from "./DesignOverlay";
import { useIsMobile } from "@/hooks/use-mobile";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
  const isMobile = useIsMobile();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full h-full cursor-zoom-in">
          <div className="relative w-full h-full bg-white rounded-lg overflow-hidden">
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
      <DialogContent className={`${isMobile ? 'max-w-[95vw] h-[80vh] p-2' : 'max-w-3xl w-[90vw] h-[85vh] p-6'}`}>
        <DialogTitle className="sr-only">T恤预览</DialogTitle>
        <div className="w-full h-full flex items-center justify-center">
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
      </DialogContent>
    </Dialog>
  );
};