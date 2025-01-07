import { DesignImage } from "./DesignImage";
import { TShirtPreview } from "../design/TShirtPreview";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

interface DesignSettings {
  scale: number;
  rotation: number;
  opacity: number;
  position: "front" | "back";
  offsetX: number;
  offsetY: number;
}

interface DesignPreviewProps {
  design_front: string | null;
  design_back: string | null;
  preview_front: string | null;
  preview_back: string | null;
  tshirt_style: string;
  tshirt_color: string;
  tshirt_gender: string;
  front_design_settings?: DesignSettings;
  back_design_settings?: DesignSettings;
}

export const DesignPreview = ({
  design_front,
  design_back,
  preview_front,
  preview_back,
  tshirt_style,
  tshirt_color,
  tshirt_gender,
  front_design_settings = {
    scale: 0.8,
    rotation: 0,
    opacity: 1,
    position: "front",
    offsetX: 0,
    offsetY: 30
  },
  back_design_settings = {
    scale: 0.8,
    rotation: 0,
    opacity: 1,
    position: "back",
    offsetX: 0,
    offsetY: 10
  }
}: DesignPreviewProps) => {
  const isMobile = useIsMobile();
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState<{
    type: 'design' | 'preview';
    image: string | null;
    title: string;
    settings?: DesignSettings;
  } | null>(null);

  const handlePreviewClick = (type: 'design' | 'preview', image: string | null, title: string, settings?: DesignSettings) => {
    setPreviewContent({ type, image, title, settings });
    setShowPreview(true);
  };

  return (
    <>
      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-2`}>
        {design_front && (
          <div className="flex flex-col items-center">
            <h3 className="font-medium mb-2 text-center text-sm">正面设计</h3>
            <div 
              className="w-full aspect-square bg-gray-50 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handlePreviewClick('design', design_front, '正面设计')}
            >
              <DesignImage 
                imageUrl={design_front} 
                title="" 
                disablePreview
              />
            </div>
          </div>
        )}
        {preview_front && (
          <div className="flex flex-col items-center">
            <h3 className="font-medium mb-2 text-center text-sm">正面效果</h3>
            <div 
              className="w-full aspect-square bg-gray-50 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handlePreviewClick('preview', preview_front, '正面效果', front_design_settings)}
            >
              <TShirtPreview
                color={tshirt_color}
                style={tshirt_style}
                gender={tshirt_gender}
                designImage={design_front}
                settings={front_design_settings}
              />
            </div>
          </div>
        )}
        {design_back && (
          <div className="flex flex-col items-center">
            <h3 className="font-medium mb-2 text-center text-sm">背面设计</h3>
            <div 
              className="w-full aspect-square bg-gray-50 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handlePreviewClick('design', design_back, '背面设计')}
            >
              <DesignImage 
                imageUrl={design_back} 
                title="" 
                disablePreview
              />
            </div>
          </div>
        )}
        {preview_back && (
          <div className="flex flex-col items-center">
            <h3 className="font-medium mb-2 text-center text-sm">背面效果</h3>
            <div 
              className="w-full aspect-square bg-gray-50 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handlePreviewClick('preview', preview_back, '背面效果', back_design_settings)}
            >
              <TShirtPreview
                color={tshirt_color}
                style={tshirt_style}
                gender={tshirt_gender}
                designImage={design_back}
                settings={back_design_settings}
              />
            </div>
          </div>
        )}
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] w-auto h-auto p-4">
          <DialogTitle>{previewContent?.title}</DialogTitle>
          <div className="relative w-full h-full min-h-[50vh] flex items-center justify-center">
            {previewContent?.type === 'design' ? (
              <img 
                src={previewContent.image || ''} 
                alt={previewContent.title} 
                className="max-w-full max-h-[80vh] object-contain"
              />
            ) : (
              <div className="w-full max-w-xl aspect-[3/4]">
                <TShirtPreview
                  color={tshirt_color}
                  style={tshirt_style}
                  gender={tshirt_gender}
                  designImage={previewContent?.image || ''}
                  settings={previewContent?.settings}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};