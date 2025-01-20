import { useState } from "react";
import { PreviewDialog } from "./PreviewDialog";
import { DialogTitle } from "@/components/ui/dialog";
import { DesignGrid } from "./DesignGrid";

interface DesignPreviewProps {
  preview_front: string | null;
  preview_back: string | null;
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