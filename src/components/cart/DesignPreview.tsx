import { DesignImage } from "./DesignImage";
import { getValidImageUrl } from "@/utils/imageUrl";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  const handlePreviewClick = (imageUrl: string | null, title: string) => {
    if (imageUrl) {
      setPreviewImage({url: imageUrl, title});
      setShowPreview(true);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {preview_front && (
          <div className="flex flex-col items-center">
            <h3 className="font-medium mb-2 text-center text-sm">正面效果</h3>
            <div 
              className="w-full aspect-square bg-gray-50 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-zoom-in"
              onClick={() => handlePreviewClick(preview_front, "正面效果")}
            >
              <img 
                src={getValidImageUrl(preview_front)} 
                alt="正面效果"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
        {preview_back && (
          <div className="flex flex-col items-center">
            <h3 className="font-medium mb-2 text-center text-sm">背面效果</h3>
            <div 
              className="w-full aspect-square bg-gray-50 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-zoom-in"
              onClick={() => handlePreviewClick(preview_back, "背面效果")}
            >
              <img 
                src={getValidImageUrl(preview_back)} 
                alt="背面效果"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className={`
          ${isMobile ? 'max-w-[100vw] w-screen h-screen p-2 m-0 rounded-none border-0' : 'max-w-[90vw] max-h-[90vh] w-auto h-auto p-4'}
          overflow-hidden
        `}>
          <div className="relative w-full h-full flex items-center justify-center">
            {previewImage?.url && (
              <img 
                src={getValidImageUrl(previewImage.url)} 
                alt={previewImage.title}
                className={`
                  max-w-full object-contain
                  ${isMobile ? 'max-h-[100vh]' : 'max-h-[80vh]'}
                `}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};