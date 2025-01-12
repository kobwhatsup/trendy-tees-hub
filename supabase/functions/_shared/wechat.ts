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
  return `${method}\n${url}\n${timestamp}\n${nonceStr}\n${JSON.stringify(body)}\n`;
};

// 将 Base64 字符串转换为 ArrayBuffer
const base64ToArrayBuffer = (base64: string) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};

// 格式化私钥
export const formatPrivateKey = (privateKey: string) => {
  // 移除头尾标记和换行符
  const pemContent = privateKey
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '');
  
  return base64ToArrayBuffer(pemContent);
};

// 生成签名
export const generateSignature = async (signStr: string, privateKey: string) => {
  try {
    console.log('开始生成签名...');
    console.log('签名字符串:', signStr);
    
    const keyData = formatPrivateKey(privateKey);
    
    console.log('私钥格式化完成，准备导入密钥...');
    
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
    
    console.log('密钥导入成功，开始签名...');

    const encoder = new TextEncoder();
    const signatureBytes = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      encoder.encode(signStr)
    );

    console.log('签名生成成功，转换为 Base64...');
    
    // 将签名转换为 Base64
    const signatureArray = new Uint8Array(signatureBytes);
    const signatureBase64 = btoa(String.fromCharCode(...signatureArray));
    
    console.log('签名处理完成');
    
    return signatureBase64;
  } catch (error) {
    console.error('生成签名时发生错误:', error);
    throw error;
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
  return `WECHATPAY2-SHA256-RSA2048 mchid="${mchid}",nonce_str="${nonceStr}",signature="${signature}",timestamp="${timestamp}",serial_no="${serialNo}"`;
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
      payer_client_ip: clientIp,
    }
  };
};