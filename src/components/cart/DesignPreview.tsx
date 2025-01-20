import { useState } from "react";
import { TShirtImage } from "./preview/TShirtImage";
import { PreviewDialog } from "./preview/PreviewDialog";
import { DesignOverlay } from "./preview/DesignOverlay";
import { DialogTitle } from "@/components/ui/dialog";

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
  tshirt_style,
  tshirt_color,
  tshirt_gender,
}: DesignPreviewProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<{url: string | null, title: string} | null>(null);

  const handlePreviewClick = (imageUrl: string | null, title: string) => {
    if (imageUrl) {
      setPreviewImage({url: imageUrl, title});
      setShowPreview(true);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
        {design_front && (
          <DesignOverlay 
            imageUrl={design_front} 
            title="正面设计"
          />
        )}
        {preview_front && (
          <TShirtImage 
            imageUrl={preview_front}
            title="正面效果"
            onClick={() => handlePreviewClick(preview_front, "正面效果")}
          />
        )}
        {design_back && (
          <DesignOverlay 
            imageUrl={design_back} 
            title="背面设计"
          />
        )}
        {preview_back && (
          <TShirtImage 
            imageUrl={preview_back}
            title="背面效果"
            onClick={() => handlePreviewClick(preview_back, "背面效果")}
          />
        )}
      </div>

      <PreviewDialog 
        open={showPreview}
        onOpenChange={setShowPreview}
        image={previewImage}
      >
        <DialogTitle className="sr-only">
          预览图片
        </DialogTitle>
      </PreviewDialog>
    </>
  );
};