import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";
import { createHash } from "https://deno.land/std@0.168.0/hash/mod.ts";

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// 格式化私钥
function formatPrivateKey(privateKey: string): string {
  try {
    // 移除所有空格、换行符和制表符
    let formattedKey = privateKey.replace(/[\s\t\n\r]/g, '');
    
    // 移除现有的PEM头尾(如果存在)
    formattedKey = formattedKey.replace(/-----BEGIN PRIVATE KEY-----/, '');
    formattedKey = formattedKey.replace(/-----END PRIVATE KEY-----/, '');
    
    // 添加PEM格式的头尾
    formattedKey = `-----BEGIN PRIVATE KEY-----\n${formattedKey}\n-----END PRIVATE KEY-----`;
    
    return formattedKey;
  } catch (error) {
    console.error('格式化私钥时出错:', error);
    throw new Error('私钥格式化失败');
  }
}

// 生成签名字符串
export function generateSignString(
  method: string,
  url: string,
  timestamp: string,
  nonceStr: string,
  body: string
): string {
  return `${method}\n${url}\n${timestamp}\n${nonceStr}\n${body}\n`;
}

// 生成签名
export async function generateSignature(message: string, privateKey: string): Promise<string> {
  try {
    console.log('开始生成签名...');
    console.log('原始私钥长度:', privateKey.length);
    
    // 格式化私钥
    const formattedKey = formatPrivateKey(privateKey);
    console.log('格式化后的私钥长度:', formattedKey.length);
    
    // 创建签名对象
    const sign = createHash('sha256');
    
    // 更新数据
    sign.update(message);
    
    // 使用私钥签名
    const signature = sign.digest('base64');
    console.log('签名生成成功');
    
    return signature;
    
  } catch (error) {
    console.error('签名生成失败:', error);
    throw new Error(`签名生成失败: ${error.message}`);
  }
}

// 构建认证头
export function buildAuthorizationHeader(
  mchid: string,
  nonceStr: string,
  signature: string,
  timestamp: string,
  serialNo: string
): string {
  const schema = 'WECHATPAY2-SHA256-RSA2048';
  const token = [
    `mchid="${mchid}"`,
    `nonce_str="${nonceStr}"`,
    `signature="${signature}"`,
    `timestamp="${timestamp}"`,
    `serial_no="${serialNo}"`,
  ].join(',');
  
  return `${schema} ${token}`;
}

// 构建请求体
export function buildRequestBody(
  appId: string,
  mchid: string,
  description: string,
  orderId: string,
  amount: number,
  notifyUrl: string,
  clientIp: string
) {
  return {
    appid: appId,
    mchid: mchid,
    description: description,
    out_trade_no: orderId,
    notify_url: notifyUrl,
    amount: {
      total: amount,
      currency: 'CNY'
    },
    scene_info: {
      payer_client_ip: clientIp
    }
  };
}