import { getValidImageUrl } from "@/utils/imageUrl";

interface TShirtImageProps {
  imageUrl: string | null;
  title: string;
  onClick?: () => void;
  tshirtStyle?: string;
  tshirtColor?: string;
  tshirtGender?: string;
  position?: "front" | "back";
}

export const TShirtImage = ({ 
  imageUrl, 
  title, 
  onClick,
  tshirtStyle = 'short',
  tshirtColor = 'white',
  tshirtGender = 'male',
  position = 'front'
}: TShirtImageProps) => {
  if (!imageUrl) return null;

  const getTemplateUrl = () => {
    if (tshirtGender === 'male') {
      if (tshirtStyle === 'short') {
        return position === 'front' 
          ? (tshirtColor === 'white' ? '/01manshortfrontwhite.jpeg' : '/09manshortfrontblack.jpeg')  // 男士短袖正面
          : (tshirtColor === 'white' ? '/02manshortbackwhite.jpeg' : '/10manshortbackblack.jpg');  // 男士短袖背面
      } else {
        return position === 'front'
          ? (tshirtColor === 'white' ? '/03manlongfrontwhite.jpeg' : '/11manlongfrontblack.jpg')   // 男士长袖正面
          : (tshirtColor === 'white' ? '/04manlongbackwhite.jpeg' : '/12manlongbackblack.jpg');   // 男士长袖背面
      }
    } else {
      if (tshirtStyle === 'short') {
        return position === 'front'
          ? (tshirtColor === 'white' ? '/05womenshortfrontwhite.jpeg' : '/13womenshortfrontblack.jpg')  // 女士短袖正面
          : (tshirtColor === 'white' ? '/06womenshortbackwhite.jpeg' : '/14womenshortbackblack.jpg');  // 女士短袖背面
      } else {
        return position === 'front'
          ? (tshirtColor === 'white' ? '/07womenlongfrontwhite.jpeg' : '/15womenlongfrontblack.jpg')   // 女士长袖正面
          : (tshirtColor === 'white' ? '/08womenlongbackwhite.jpeg' : '/16womenlongbackblack.jpg');   // 女士长袖背面
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="font-medium mb-2 text-center text-sm">{title}</h3>
      <div 
        className="w-full aspect-square bg-gray-50 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-zoom-in"
        onClick={onClick}
      >
        <div className="relative w-full h-full">
          <img 
            src={getTemplateUrl()} 
            alt="T恤模板"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <img 
            src={getValidImageUrl(imageUrl)} 
            alt={title}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};