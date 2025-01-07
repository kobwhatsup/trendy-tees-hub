interface ProductInfoProps {
  style: string;
  gender: string;
  color: string;
  size?: string;
  material?: string;
  price?: number;
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export const ProductInfo = ({ 
  style, 
  gender, 
  color, 
  size = 'M', 
  material = '棉',
  price = 199,
  quantity,
  onUpdateQuantity,
  onRemove
}: ProductInfoProps) => {
  const getGenderText = (gender: string) => {
    return gender === 'male' ? '男款' : '女款';
  };

  const getStyleText = (style: string) => {
    return style === 'short' ? '短袖' : '长袖';
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="font-medium">商品信息</h3>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">
          款式：{getGenderText(gender)}
        </p>
        <p className="text-sm text-muted-foreground">
          袖长：{getStyleText(style)}
        </p>
        <p className="text-sm text-muted-foreground">
          材质：{material}
        </p>
        <p className="text-sm text-muted-foreground">
          尺码：{size}
        </p>
        <p className="text-sm text-muted-foreground">
          颜色：{color}
        </p>
        <p className="text-sm text-muted-foreground">
          价格：¥{price}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">数量:</span>
            <Button
              variant="outline"
              size="sm"
              className="h-7 w-7"
              onClick={() => {
                if (quantity <= 1) {
                  onRemove();
                } else {
                  onUpdateQuantity(quantity - 1);
                }
              }}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              className="h-7 w-7"
              onClick={() => onUpdateQuantity(quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};