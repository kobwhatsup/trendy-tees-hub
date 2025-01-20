import { useState } from "react";
import { PreviewDialog } from "./preview/PreviewDialog";
import { DialogTitle } from "@/components/ui/dialog";
import { DesignGrid } from "./preview/DesignGrid";

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
  preview_front,
  preview_back,
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
      <DesignGrid 
        preview_front={preview_front}
        preview_back={preview_back}
        onPreviewClick={handlePreviewClick}
      />

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