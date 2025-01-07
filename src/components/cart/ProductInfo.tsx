interface ProductInfoProps {
  style: string;
  gender: string;
  color: string;
  size?: string;
  material?: string;
  price?: number;
}

export const ProductInfo = ({ 
  style, 
  gender, 
  color, 
  size = 'M', 
  material = '棉',
  price = 199
}: ProductInfoProps) => {
  const getGenderText = (gender: string) => {
    return gender === 'male' ? '男款' : '女款';
  };

  const getStyleText = (style: string) => {
    return style === 'short' ? '短袖' : '长袖';
  };

  return (
    <div>
      <h3 className="font-medium text-center mb-3">商品信息</h3>
      <div className="space-y-1 bg-muted/50 rounded-lg p-3">
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
    </div>
  );
};