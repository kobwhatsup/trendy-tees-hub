import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getValidImageUrl } from "@/utils/imageUrl";

interface PreviewImageProps {
  imageUrl: string;
  title: string;
}

const PreviewImage = ({ imageUrl, title }: PreviewImageProps) => (
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
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="aspect-square relative">
        <img 
          src={getValidImageUrl(imageUrl)} 
          alt={title} 
          className="w-full h-full object-contain"
        />
      </div>
    </DialogContent>
  </Dialog>
);

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