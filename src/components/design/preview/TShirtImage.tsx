interface TShirtImageProps {
  color: string;
  style: string;
  gender: string;
  position: "front" | "back";
}

export const TShirtImage = ({ 
  color, 
  style, 
  gender,
  position 
}: TShirtImageProps) => {
  const getTemplateUrl = () => {
    if (gender === 'male') {
      if (style === 'short') {
        return position === 'front' 
          ? (color === 'white' ? '/01manshortfrontwhite.jpeg' : '/09manshortfrontblack.jpeg')  // 男士短袖正面
          : (color === 'white' ? '/02manshortbackwhite.jpeg' : '/10manshortbackblack.jpg');  // 男士短袖背面
      } else {
        return position === 'front'
          ? (color === 'white' ? '/03manlongfrontwhite.jpeg' : '/11manlongfrontblack.jpg')   // 男士长袖正面
          : (color === 'white' ? '/04manlongbackwhite.jpeg' : '/12manlongbackblack.jpg');   // 男士长袖背面
      }
    } else {
      if (style === 'short') {
        return position === 'front'
          ? (color === 'white' ? '/05womenshortfrontwhite.jpeg' : '/13womenshortfrontblack.jpg')  // 女士短袖正面
          : (color === 'white' ? '/06womenshortbackwhite.jpeg' : '/14womenshortbackblack.jpg');  // 女士短袖背面
      } else {
        return position === 'front'
          ? (color === 'white' ? '/07womenlongfrontwhite.jpeg' : '/15womenlongfrontblack.jpg')   // 女士长袖正面
          : (color === 'white' ? '/08womenlongbackwhite.jpeg' : '/16womenlongbackblack.jpg');   // 女士长袖背面
      }
    }
  };

  console.log('T恤模板参数:', {
    性别: gender,
    款式: style,
    颜色: color,
    位置: position,
    模板URL: getTemplateUrl()
  });

  return (
    <img 
      src={getTemplateUrl()}
      alt="T恤模板"
      className="absolute inset-0 w-full h-full object-contain"
    />
  );
};