import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// 格式化私钥
function formatPrivateKey(privateKey: string): string {
  try {
    // 移除所有空格和换行符
    let formattedKey = privateKey.replace(/[\s\n\r]/g, '');
    
    // 如果不是PEM格式，添加PEM头尾
    if (!formattedKey.includes('-----BEGIN')) {
      formattedKey = `-----BEGIN PRIVATE KEY-----\n${formattedKey}\n-----END PRIVATE KEY-----`;
    }
    
    // 每64个字符添加换行符
    formattedKey = formattedKey
      .replace(/-----BEGIN PRIVATE KEY-----/, '-----BEGIN PRIVATE KEY-----\n')
      .replace(/-----END PRIVATE KEY-----/, '\n-----END PRIVATE KEY-----');
    
    const base64Content = formattedKey
      .replace(/-----BEGIN PRIVATE KEY-----\n/, '')
      .replace(/\n-----END PRIVATE KEY-----/, '');
    
    const formatted = base64Content.match(/.{1,64}/g)?.join('\n') || base64Content;
    
    return `-----BEGIN PRIVATE KEY-----\n${formatted}\n-----END PRIVATE KEY-----`;
  } catch (error) {
    console.error('格式化私钥时出错:', error);
    throw new Error(`格式化私钥失败: ${error.message}`);
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
    console.log('格式化后的私钥:', formattedKey);
    
    // 将私钥转换为ArrayBuffer
    const binaryDer = await crypto.subtle.importKey(
      "pkcs8",
      new TextEncoder().encode(formattedKey),
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256",
      },
      true,
      ["sign"]
    );
    
    // 生成签名
    const messageBuffer = new TextEncoder().encode(message);
    const signature = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      binaryDer,
      messageBuffer
    );
    
    // 转换为Base64
    const base64Signature = btoa(String.fromCharCode(...new Uint8Array(signature)));
    console.log('签名生成成功');
    return base64Signature;
    
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