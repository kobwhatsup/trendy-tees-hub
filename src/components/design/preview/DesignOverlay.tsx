import { useIsMobile } from "@/hooks/use-mobile";

interface DesignOverlayProps {
  designImage: string;
  settings: {
    scale: number;
    rotation: number;
    opacity: number;
    offsetX: number;
    offsetY: number;
  };
}

export const DesignOverlay = ({ designImage, settings }: DesignOverlayProps) => {
  const isMobile = useIsMobile();
  
  if (!designImage) return null;

  return (
    <div 
      className={`absolute ${isMobile ? 'top-[25%]' : 'top-[15%]'} left-1/4 right-1/4 bottom-1/2 flex items-center justify-center`}
      style={{
        transform: `translateX(${isMobile ? settings.offsetX * 0.8 : settings.offsetX}px) translateY(${isMobile ? settings.offsetY * 0.8 : settings.offsetY}px)`
      }}
    >
      <img
        src={designImage}
        alt="T恤设计"
        className="w-full h-full object-contain transition-all duration-200"
        style={{
          transform: `scale(${isMobile ? settings.scale * 0.9 : settings.scale}) rotate(${settings.rotation}deg)`,
          opacity: settings.opacity,
        }}
      />
    </div>
  );
};