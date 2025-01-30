import { TShirtImage } from "./TShirtImage";
import { DesignOverlay } from "./DesignOverlay";

interface PreviewDialogProps {
  color: string;
  style: string;
  gender: string;
  designImage: string;
  settings?: {
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
  settings = {
    scale: 1,
    rotation: 0,
    opacity: 1,
    position: "front",
    offsetX: 0,
    offsetY: 0
  }
}: PreviewDialogProps) => {
  return (
    <div className="relative w-full h-full">
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
  );
};