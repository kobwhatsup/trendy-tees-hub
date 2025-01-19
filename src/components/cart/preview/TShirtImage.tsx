import { getValidImageUrl } from "@/utils/imageUrl";

interface TShirtImageProps {
  imageUrl: string | null;
  title: string;
  onClick?: () => void;
}

export const TShirtImage = ({ imageUrl, title, onClick }: TShirtImageProps) => {
  if (!imageUrl) return null;

  return (
    <div className="flex flex-col items-center">
      <h3 className="font-medium mb-2 text-center text-sm">{title}</h3>
      <div 
        className="w-full aspect-square bg-gray-50 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-zoom-in"
        onClick={onClick}
      >
        <img 
          src={getValidImageUrl(imageUrl)} 
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};