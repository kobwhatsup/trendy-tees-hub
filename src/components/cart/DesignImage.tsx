import { getValidImageUrl } from "@/utils/imageUrl";

interface DesignImageProps {
  imageUrl: string | null;
  title: string;
}

export const DesignImage = ({ imageUrl, title }: DesignImageProps) => {
  if (!imageUrl) return null;

  return (
    <div>
      <h3 className="font-medium mb-2 text-center">{title}</h3>
      <img 
        src={getValidImageUrl(imageUrl)} 
        alt={title} 
        className="w-full aspect-square object-contain rounded-lg"
        onError={(e) => {
          console.error('图片加载失败:', imageUrl);
          e.currentTarget.src = '/placeholder.svg';
        }}
      />
    </div>
  );
};