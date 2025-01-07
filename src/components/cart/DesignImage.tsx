import { getValidImageUrl } from "@/utils/imageUrl";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DesignImageProps {
  imageUrl: string | null;
  title: string;
}

export const DesignImage = ({ imageUrl, title }: DesignImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

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
        <>
          <img 
            src={validImageUrl} 
            alt={title} 
            className="w-full aspect-square object-contain rounded-lg cursor-zoom-in"
            onError={(e) => {
              console.error('图片加载失败:', {
                标题: title,
                URL: validImageUrl,
                错误: e,
                图片路径类型: imageUrl.startsWith('http') ? '完整URL' : 
                            imageUrl.startsWith('data:image') ? 'base64' : 
                            'storage路径'
              });
              setHasError(true);
            }}
            onClick={() => setShowPreview(true)}
          />
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent className="max-w-3xl w-[90vw] h-[85vh] p-6">
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src={validImageUrl} 
                  alt={title} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <div className="w-full aspect-square flex items-center justify-center bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">图片加载失败</p>
        </div>
      )}
    </div>
  );
};