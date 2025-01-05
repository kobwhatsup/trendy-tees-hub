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
  if (!designImage) return null;

  return (
    <div 
      className="absolute top-[15%] left-1/4 right-1/4 bottom-1/2 flex items-center justify-center"
      style={{
        transform: `translateX(${settings.offsetX}px) translateY(${settings.offsetY}px)`
      }}
    >
      <img
        src={designImage}
        alt="T恤设计"
        className="max-w-full max-h-full object-contain transition-all duration-200"
        style={{
          transform: `scale(${settings.scale}) rotate(${settings.rotation}deg)`,
          opacity: settings.opacity,
        }}
      />
    </div>
  );
};