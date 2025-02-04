import { PreviewDialog } from "./PreviewDialog";

interface TShirtPreviewProps {
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
  position: "front" | "back";
}

export const TShirtPreview = ({ 
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
  },
  position
}: TShirtPreviewProps) => {
  return (
    <PreviewDialog
      color={color}
      style={style}
      gender={gender}
      designImage={designImage}
      settings={settings}
      position={position}
    />
  );
};