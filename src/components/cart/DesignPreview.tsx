import { DesignImage } from "./DesignImage";
import { getValidImageUrl } from "@/utils/imageUrl";

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
}

export const DesignPreview = ({
  design_front,
  design_back,
  preview_front,
  preview_back,
}: DesignPreviewProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
      {design_front && (
        <div className="flex flex-col items-center">
          <DesignImage 
            imageUrl={design_front} 
            title="正面设计"
            className="w-full aspect-square p-2"
          />
        </div>
      )}
      {preview_front && (
        <div className="flex flex-col items-center">
          <h3 className="font-medium mb-2 text-center text-sm">正面效果</h3>
          <div className="w-full aspect-square bg-gray-50 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow">
            <img 
              src={getValidImageUrl(preview_front)} 
              alt="正面效果"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
      {design_back && (
        <div className="flex flex-col items-center">
          <DesignImage 
            imageUrl={design_back} 
            title="背面设计"
            className="w-full aspect-square p-2"
          />
        </div>
      )}
      {preview_back && (
        <div className="flex flex-col items-center">
          <h3 className="font-medium mb-2 text-center text-sm">背面效果</h3>
          <div className="w-full aspect-square bg-gray-50 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow">
            <img 
              src={getValidImageUrl(preview_back)} 
              alt="背面效果"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};