import { PreviewImage } from "./PreviewImage";

interface DesignGridProps {
  preview_front: string | null;
  preview_back: string | null;
  onPreviewClick: (imageUrl: string | null, title: string) => void;
}

export const DesignGrid = ({
  preview_front,
  preview_back,
  onPreviewClick
}: DesignGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 flex-1">
      {preview_front && (
        <PreviewImage 
          imageUrl={preview_front}
          title="正面效果"
          onClick={() => onPreviewClick(preview_front, "正面效果")}
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