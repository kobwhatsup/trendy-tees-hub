import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getValidImageUrl } from "@/utils/imageUrl";
import { useIsMobile } from "@/hooks/use-mobile";

interface PreviewImageProps {
  imageUrl: string;
  title: string;
}

const PreviewImage = ({ imageUrl, title }: PreviewImageProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square relative cursor-zoom-in">
          <img 
            src={getValidImageUrl(imageUrl)} 
            alt={title} 
            className="w-full h-full object-contain"
          />
        </div>
      </DialogTrigger>
      <DialogContent className={`
        ${isMobile ? 'max-w-[100vw] w-screen h-screen p-2 m-0 rounded-none border-0' : 'max-w-4xl w-[90vw] h-[85vh] p-4'}
        overflow-hidden relative
      `}>
        <DialogHeader className="absolute top-2 left-4 right-14 z-10">
          <DialogTitle className="text-lg font-medium">{title}</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full flex items-center justify-center pt-12">
          <img 
            src={getValidImageUrl(imageUrl)} 
            alt={title} 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface DesignPreviewGridProps {
  design: {
    design_front: string;
    design_back: string;
    preview_front: string;
    preview_back: string;
  };
}

export const DesignPreviewGrid = ({ design }: DesignPreviewGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <PreviewImage imageUrl={design.design_front} title="正面设计图" />
      <PreviewImage imageUrl={design.design_back} title="背面设计图" />
      <PreviewImage imageUrl={design.preview_front} title="正面效果图" />
      <PreviewImage imageUrl={design.preview_back} title="背面效果图" />
    </div>
  );
};