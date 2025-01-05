export const getValidImageUrl = (url: string | null) => {
  if (!url) return null;
  
  // 如果是完整的URL，直接返回
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // 如果是相对路径，添加基础URL
  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${url}`;
};