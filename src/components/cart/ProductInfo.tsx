import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

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
    <div className="bg-blue-50/50 p-3 rounded-lg shadow-sm">
      <h3 className="font-medium text-lg">商品信息</h3>
      <div className="space-y-1.5 mt-2">
        <p className="text-sm text-gray-600 flex justify-between">
          <span>款式：</span>
          <span className="font-medium">{getGenderText(gender)}</span>
        </p>
        <p className="text-sm text-gray-600 flex justify-between">
          <span>袖长：</span>
          <span className="font-medium">{getStyleText(style)}</span>
        </p>
        <p className="text-sm text-gray-600 flex justify-between">
          <span>材质：</span>
          <span className="font-medium">{material}</span>
        </p>
        <p className="text-sm text-gray-600 flex justify-between">
          <span>尺码：</span>
          <span className="font-medium">{size}</span>
        </p>
        <p className="text-sm text-gray-600 flex justify-between">
          <span>颜色：</span>
          <span className="font-medium">{color}</span>
        </p>
        <p className="text-sm text-gray-600 flex justify-between">
          <span>价格：</span>
          <span className="font-medium text-red-500">¥{price}</span>
        </p>
      </div>
      <div className="mt-3 pt-3 border-t">
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
  );
};