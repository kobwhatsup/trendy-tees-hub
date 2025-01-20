import { DesignOverlay } from "./DesignOverlay";
import { PreviewImage } from "./PreviewImage";

interface DesignGridProps {
  design_front: string | null;
  design_back: string | null;
  preview_front: string | null;
  preview_back: string | null;
  onPreviewClick: (imageUrl: string | null, title: string) => void;
}

export const DesignGrid = ({
  design_front,
  design_back,
  preview_front,
  preview_back,
  onPreviewClick
}: DesignGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
      {design_front && (
        <DesignOverlay 
          imageUrl={design_front} 
          title="正面设计"
        />
      )}
      {preview_front && (
        <PreviewImage 
          imageUrl={preview_front}
          title="正面效果"
          onClick={() => onPreviewClick(preview_front, "正面效果")}
        />
      )}
      {design_back && (
        <DesignOverlay 
          imageUrl={design_back} 
          title="背面设计"
        />
      )}
      {preview_back && (
        <PreviewImage 
          imageUrl={preview_back}
          title="背面效果"
          onClick={() => onPreviewClick(preview_back, "背面效果")}
        />
      )}
    </div>
  );
};