export const getValidImageUrl = (url: string | null) => {
  if (!url) return null;
  
  // 如果是data:image开头的base64图片数据,直接返回
  if (url.startsWith('data:image')) {
    return url;
  }
  
  // 如果是完整的URL，直接返回
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // 如果是storage路径，添加完整的Supabase存储URL
  if (url.includes('design-images/')) {
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/design-images/${url.split('design-images/')[1]}`;
  }
  
  // 其他情况，尝试作为存储路径处理
  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${url}`;
};