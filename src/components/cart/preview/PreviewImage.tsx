import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { getValidImageUrl } from "@/utils/imageUrl";

interface PreviewImageProps {
  imageUrl: string | null;
  title: string;
  onClick?: () => void;
}

export const PreviewImage = ({ imageUrl, title, onClick }: PreviewImageProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [hasError, setHasError] = useState(false);
  const isMobile = useIsMobile();

  if (!imageUrl) return null;

  const validImageUrl = getValidImageUrl(imageUrl);

  const handlePreviewClick = () => {
    if (onClick) {
      onClick();
    } else {
      setShowPreview(true);
    }
  };

  if (hasError) {
    return (
      <div className="w-full aspect-square bg-gray-50 rounded-lg p-2 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">图片加载失败</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="font-medium mb-2 text-center text-sm">{title}</h3>
      <div 
        className="w-full aspect-square bg-gray-50 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-zoom-in"
        onClick={handlePreviewClick}
      >
        <img 
          src={validImageUrl} 
          alt={title}
          className="w-full h-full object-contain"
          onError={() => setHasError(true)}
        />
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className={`
          ${isMobile ? 'max-w-[100vw] w-screen h-screen p-2 m-0 rounded-none border-0' : 'max-w-[90vw] h-[90vh] w-auto p-4'}
          overflow-hidden flex items-center justify-center
        `}>
          <div className="w-full h-full flex items-center justify-center p-4">
            <img 
              src={validImageUrl} 
              alt={title} 
              className="max-w-[70%] max-h-[70vh] w-auto h-auto object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};