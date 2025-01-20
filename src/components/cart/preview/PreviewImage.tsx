import { useState } from "react";
import { PreviewDialog } from "./PreviewDialog";
import { DialogTitle } from "@/components/ui/dialog";

interface PreviewImageProps {
  imageUrl: string | null;
  title: string;
  onClick?: () => void;
}

export const PreviewImage = ({ imageUrl, title, onClick }: PreviewImageProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<{url: string | null, title: string} | null>(null);

  const handlePreviewClick = () => {
    if (imageUrl) {
      setPreviewImage({url: imageUrl, title});
      setShowPreview(true);
    }
  };

  return (
    <>
      {imageUrl && (
        <div onClick={onClick || handlePreviewClick}>
          <TShirtImage 
            imageUrl={imageUrl}
            title={title}
          />
        </div>
      )}

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