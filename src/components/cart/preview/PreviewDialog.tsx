import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getValidImageUrl } from "@/utils/imageUrl";
import { useIsMobile } from "@/hooks/use-mobile";
import { ReactNode } from "react";

interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: { url: string | null; title: string } | null;
  children?: ReactNode;
}

export const PreviewDialog = ({ open, onOpenChange, image, children }: PreviewDialogProps) => {
  const isMobile = useIsMobile();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`
        ${isMobile ? 'max-w-[100vw] w-screen h-screen p-2 m-0 rounded-none border-0' : 'max-w-[90vw] max-h-[90vh] w-auto h-auto p-4'}
        overflow-hidden
      `}>
        {children}
        <div className="relative w-full h-full flex items-center justify-center">
          {image?.url && (
            <img 
              src={getValidImageUrl(image.url)} 
              alt={image.title}
              className={`
                max-w-full object-contain
                ${isMobile ? 'max-h-[100vh]' : 'max-h-[80vh]'}
              `}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};