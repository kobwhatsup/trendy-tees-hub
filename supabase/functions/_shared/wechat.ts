export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// 生成签名所需的字符串
export const generateSignString = (
  method: string,
  url: string,
  timestamp: string,
  nonceStr: string,
  body: any
) => {
  const message = `${method}\n${url}\n${timestamp}\n${nonceStr}\n${JSON.stringify(body)}\n`;
  console.log('生成的签名字符串:', message);
  return message;
};

// 将 Base64 字符串转换为 ArrayBuffer
const base64ToArrayBuffer = (base64: string) => {
  try {
    // 移除 PEM 格式的头尾标记和所有换行符
    const cleanBase64 = base64
      .replace(/-----BEGIN PRIVATE KEY-----/, '')
      .replace(/-----END PRIVATE KEY-----/, '')
      .replace(/[\n\r\s]/g, '');
      
    console.log('清理后的 Base64 长度:', cleanBase64.length);
    
    const binaryString = atob(cleanBase64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  } catch (error) {
    console.error('Base64 转换失败:', error);
    throw new Error('Base64 转换失败: ' + error.message);
  }
};

// 格式化私钥
export const formatPrivateKey = (privateKey: string) => {
  try {
    console.log('开始格式化私钥...');
    console.log('原始私钥长度:', privateKey.length);
    
    // 确保私钥是 PKCS#8 格式
    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
      throw new Error('私钥格式错误：需要 PKCS#8 格式');
    }
    
    const keyBuffer = base64ToArrayBuffer(privateKey);
    console.log('转换后的 ArrayBuffer 长度:', keyBuffer.byteLength);
    
    return keyBuffer;
  } catch (error) {
    console.error('私钥格式化失败:', error);
    throw new Error('私钥格式化失败: ' + error.message);
  }
};

// 生成签名
export const generateSignature = async (signStr: string, privateKey: string) => {
  try {
    console.log('开始生成签名...');
    console.log('签名字符串长度:', signStr.length);
    
    const keyData = formatPrivateKey(privateKey);
    console.log('私钥数据准备完成，长度:', keyData.byteLength);
    
    const key = await crypto.subtle.importKey(
      "pkcs8",
      keyData,
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256",
      },
      false,
      ["sign"]
    );
    console.log('密钥导入成功');

    const encoder = new TextEncoder();
    const signatureBytes = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      encoder.encode(signStr)
    );
    console.log('签名生成成功，长度:', signatureBytes.byteLength);
    
    // 将签名转换为 Base64
    const signatureArray = new Uint8Array(signatureBytes);
    const signatureBase64 = btoa(String.fromCharCode(...signatureArray));
    
    console.log('签名处理完成，Base64 长度:', signatureBase64.length);
    return signatureBase64;
  } catch (error) {
    console.error('生成签名时发生错误:', error);
    throw new Error('生成签名失败: ' + error.message);
  }
};

// 构建认证头
export const buildAuthorizationHeader = (
  mchid: string,
  nonceStr: string,
  signature: string,
  timestamp: string,
  serialNo: string
) => {
  const authorization = `WECHATPAY2-SHA256-RSA2048 mchid="${mchid}",nonce_str="${nonceStr}",signature="${signature}",timestamp="${timestamp}",serial_no="${serialNo}"`;
  console.log('生成的认证头:', authorization);
  return authorization;
};

// 构建请求体
export const buildRequestBody = (
  appId: string,
  mchid: string,
  description: string,
  orderId: string,
  amount: number,
  notifyUrl: string,
  clientIp: string
) => {
  const body = {
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
      payer_client_ip: clientIp,
    }
  };
  console.log('构建的请求体:', JSON.stringify(body, null, 2));
  return body;
};