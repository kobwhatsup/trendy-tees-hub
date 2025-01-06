import { getValidImageUrl } from "@/utils/imageUrl";
import { useState } from "react";

interface DesignImageProps {
  imageUrl: string | null;
  title: string;
}

export const DesignImage = ({ imageUrl, title }: DesignImageProps) => {
  const [hasError, setHasError] = useState(false);

  if (!imageUrl) {
    return (
      <div>
        <h3 className="font-medium mb-2 text-center">{title}</h3>
        <div className="w-full aspect-square flex items-center justify-center bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">暂无图片</p>
        </div>
      </div>
    );
  }

  const validImageUrl = getValidImageUrl(imageUrl);
  console.log('处理后的图片URL:', {
    original: imageUrl,
    processed: validImageUrl
  });

  return (
    <div>
      <h3 className="font-medium mb-2 text-center">{title}</h3>
      {!hasError ? (
        <img 
          src={validImageUrl} 
          alt={title} 
          className="w-full aspect-square object-contain rounded-lg"
          onError={(e) => {
            console.error('图片加载失败:', {
              url: validImageUrl,
              error: e
            });
            setHasError(true);
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