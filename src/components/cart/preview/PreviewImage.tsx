import { useState } from "react";
import { PreviewDialog } from "./PreviewDialog";
import { DialogTitle } from "@/components/ui/dialog";
import { getValidImageUrl } from "@/utils/imageUrl";

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

  if (!imageUrl) return null;

  return (
    <div className="flex flex-col items-center">
      <h3 className="font-medium mb-2 text-center text-sm">{title}</h3>
      <div 
        className="w-full aspect-square bg-gray-50 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-zoom-in"
        onClick={onClick || handlePreviewClick}
      >
        <img 
          src={getValidImageUrl(imageUrl)} 
          alt={title}
          className="w-full h-full object-contain"
        />
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
    </div>
  );
};