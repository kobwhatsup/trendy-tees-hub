import { DesignImage } from "../DesignImage";

interface DesignOverlayProps {
  imageUrl: string | null;
  title: string;
}

export const DesignOverlay = ({ imageUrl, title }: DesignOverlayProps) => {
  return (
    <div className="flex flex-col items-center">
      <DesignImage 
        imageUrl={imageUrl} 
        title={title}
        className="w-full aspect-square p-2"
      />
    </div>
  );
};