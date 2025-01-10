import { AuthError } from "@supabase/supabase-js";

export const getAuthErrorMessage = (error: AuthError): string => {
  const { message } = error;
  
  if (message.includes("Invalid login credentials")) {
    return "密码错误,请重新输入";
  }
  
  if (message.includes("Email not confirmed")) {
    return "邮箱未验证,请先验证邮箱";
  }
  
  if (message.includes("User not found")) {
    return "用户不存在";
  }
  
  if (message.includes("Email rate limit exceeded")) {
    return "发送邮件太频繁,请稍后再试";
  }

  return "登录出错,请重试";
};