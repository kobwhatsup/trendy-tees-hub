interface ProductInfoProps {
  style: string;
  gender: string;
  color: string;
}

export const ProductInfo = ({ style, gender, color }: ProductInfoProps) => {
  const getStyleText = (style: string, gender: string) => {
    const genderText = gender === 'male' ? '男款' : '女款';
    const styleText = style === 'short' ? '短袖' : '长袖';
    return `${genderText}${styleText}`;
  };

  return (
    <div>
      <h3 className="font-medium">商品信息</h3>
      <p className="text-sm text-muted-foreground">
        款式：{getStyleText(style, gender)}
      </p>
      <p className="text-sm text-muted-foreground">
        颜色：{color}
      </p>
    </div>
  );
};