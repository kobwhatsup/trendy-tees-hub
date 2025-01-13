import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// 格式化私钥
function formatPrivateKey(privateKey: string): string {
  // 移除所有空格和换行符
  let formattedKey = privateKey.replace(/\s+/g, '');
  
  // 如果不包含头尾,添加PEM格式的头尾
  if (!formattedKey.includes('-----BEGIN PRIVATE KEY-----')) {
    formattedKey = `-----BEGIN PRIVATE KEY-----${formattedKey}-----END PRIVATE KEY-----`;
  }
  
  // 每64个字符添加一个换行符
  const lines = formattedKey.match(/.{1,64}/g) || [];
  return lines.join('\n');
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
    
    // 将私钥转换为ArrayBuffer
    const binaryKey = new TextEncoder().encode(formattedKey);
    
    try {
      // 导入私钥
      const key = await crypto.subtle.importKey(
        "pkcs8",
        binaryKey,
        {
          name: "RSASSA-PKCS1-v1_5",
          hash: "SHA-256",
        },
        false,
        ["sign"]
      );
      
      // 生成签名
      const messageBuffer = new TextEncoder().encode(message);
      const signature = await crypto.subtle.sign(
        "RSASSA-PKCS1-v1_5",
        key,
        messageBuffer
      );
      
      // 转换为Base64
      const base64Signature = btoa(String.fromCharCode(...new Uint8Array(signature)));
      console.log('签名生成成功');
      return base64Signature;
      
    } catch (error) {
      console.error('签名生成过程出错:', error);
      throw new Error(`签名生成失败: ${error.message}`);
    }
    
  } catch (error) {
    console.error('整体签名过程出错:', error);
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