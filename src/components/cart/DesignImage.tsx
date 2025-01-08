import { getValidImageUrl } from "@/utils/imageUrl";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DesignImageProps {
  imageUrl: string | null;
  title: string;
  className?: string;
}

export const DesignImage = ({ imageUrl, title, className = "w-full aspect-square" }: DesignImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  if (!imageUrl) {
    return (
      <div>
        <h3 className="font-medium mb-2 text-center">{title}</h3>
        <div className={`flex items-center justify-center bg-muted rounded-lg ${className}`}>
          <p className="text-sm text-muted-foreground">暂无图片</p>
        </div>
      </div>
    );
  }

  const validImageUrl = getValidImageUrl(imageUrl);

  return (
    <div>
      <h3 className="font-medium mb-2 text-center">{title}</h3>
      {!hasError ? (
        <>
          <img 
            src={validImageUrl} 
            alt={title} 
            className={`object-contain rounded-lg cursor-zoom-in ${className}`}
            onError={() => setHasError(true)}
            onClick={() => setShowPreview(true)}
          />
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent className="max-w-[90vw] max-h-[90vh] w-auto h-auto p-4 overflow-hidden">
              <div className="relative w-full h-full min-h-[50vh] flex items-center justify-center">
                <img 
                  src={validImageUrl} 
                  alt={title} 
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <div className={`flex items-center justify-center bg-muted rounded-lg ${className}`}>
          <p className="text-sm text-muted-foreground">图片加载失败</p>
        </div>
      )}
    </div>
  );
};