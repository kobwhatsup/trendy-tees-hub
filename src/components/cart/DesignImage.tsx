import { getValidImageUrl } from "@/utils/imageUrl";
import { useState } from "react";

interface DesignImageProps {
  imageUrl: string | null;
  title: string;
}

export const DesignImage = ({ imageUrl, title }: DesignImageProps) => {
  const [hasError, setHasError] = useState(false);

  if (!imageUrl) return null;

  return (
    <div>
      <h3 className="font-medium mb-2 text-center">{title}</h3>
      {!hasError ? (
        <img 
          src={getValidImageUrl(imageUrl)} 
          alt={title} 
          className="w-full aspect-square object-contain rounded-lg"
          onError={(e) => {
            console.error('图片加载失败:', imageUrl);
            setHasError(true);
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
      ) : (
        <div className="w-full aspect-square flex items-center justify-center bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">图片加载失败</p>
        </div>
      )}
    </div>
  );
};