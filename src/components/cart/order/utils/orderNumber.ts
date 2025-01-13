export const generateOrderNumber = () => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2); // 取年份后两位
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // 3位随机数
  
  // 格式: YYMMDDHHmmssRRR (17位)
  // YY: 年份后两位
  // MM: 月份
  // DD: 日期
  // HH: 小时
  // mm: 分钟
  // ss: 秒
  // RRR: 3位随机数
  return `${year}${month}${day}${hours}${minutes}${seconds}${random}`;
};