import { getValidImageUrl } from "@/utils/imageUrl";
import { useState } from "react";
import { PreviewDialog } from "../design/preview/PreviewDialog";

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
  console.log('图片处理:', {
    标题: title,
    原始URL: imageUrl,
    处理后URL: validImageUrl,
    是否为完整URL: imageUrl.startsWith('http'),
    是否为base64: imageUrl.startsWith('data:image')
  });

  return (
    <div>
      <h3 className="font-medium mb-2 text-center">{title}</h3>
      {!hasError ? (
        <PreviewDialog
          color="white"
          style="short"
          gender="male"
          designImage={validImageUrl}
          settings={{
            scale: 1,
            rotation: 0,
            opacity: 1,
            position: "front",
            offsetX: 0,
            offsetY: 0
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