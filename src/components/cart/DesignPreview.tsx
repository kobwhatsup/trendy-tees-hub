import { DesignImage } from "./DesignImage";
import { TShirtPreview } from "../design/TShirtPreview";

interface DesignSettings {
  scale: number;
  rotation: number;
  opacity: number;
  position: "front" | "back";
  offsetX: number;
  offsetY: number;
}

interface DesignPreviewProps {
  design_front: string | null;
  design_back: string | null;
  preview_front: string | null;
  preview_back: string | null;
  tshirt_style: string;
  tshirt_color: string;
  tshirt_gender: string;
  front_design_settings?: DesignSettings;
  back_design_settings?: DesignSettings;
}

export const DesignPreview = ({
  design_front,
  design_back,
  preview_front,
  preview_back,
  tshirt_style,
  tshirt_color,
  tshirt_gender,
  front_design_settings = {
    scale: 0.8,
    rotation: 0,
    opacity: 1,
    position: "front",
    offsetX: 0,
    offsetY: 30
  },
  back_design_settings = {
    scale: 0.8,
    rotation: 0,
    opacity: 1,
    position: "back",
    offsetX: 0,
    offsetY: 10
  }
}: DesignPreviewProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 flex-1">
      {design_front && (
        <div className="flex flex-col items-center">
          <h3 className="font-medium mb-2 text-center text-sm">正面设计</h3>
          <div className="w-32 h-32">
            <DesignImage 
              imageUrl={design_front} 
              title="" 
            />
          </div>
        </div>
      )}
      {preview_front && (
        <div className="flex flex-col items-center">
          <h3 className="font-medium mb-2 text-center text-sm">正面效果</h3>
          <div className="w-32 h-32">
            <TShirtPreview
              color={tshirt_color}
              style={tshirt_style}
              gender={tshirt_gender}
              designImage={design_front}
              settings={front_design_settings}
            />
          </div>
        </div>
      )}
      {design_back && (
        <div className="flex flex-col items-center">
          <h3 className="font-medium mb-2 text-center text-sm">背面设计</h3>
          <div className="w-32 h-32">
            <DesignImage 
              imageUrl={design_back} 
              title="" 
            />
          </div>
        </div>
      )}
      {preview_back && (
        <div className="flex flex-col items-center">
          <h3 className="font-medium mb-2 text-center text-sm">背面效果</h3>
          <div className="w-32 h-32">
            <TShirtPreview
              color={tshirt_color}
              style={tshirt_style}
              gender={tshirt_gender}
              designImage={design_back}
              settings={back_design_settings}
            />
          </div>
        </div>
      )}
    </div>
  );
};