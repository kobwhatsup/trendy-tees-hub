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
  
  // 获取Supabase URL
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (!supabaseUrl) {
    console.error('VITE_SUPABASE_URL环境变量未设置');
    return url;
  }

  // 如果是storage路径，添加完整的Supabase存储URL
  return `${supabaseUrl}/storage/v1/object/public/design-images/${url}`;
};