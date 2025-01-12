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

// 格式化私钥
export const formatPrivateKey = (privateKey: string) => {
  if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
    return `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
  }
  return privateKey;
};

// 生成签名
export const generateSignature = async (signStr: string, privateKey: string) => {
  try {
    const formattedPrivateKey = formatPrivateKey(privateKey);
    const binaryKey = new TextEncoder().encode(formattedPrivateKey);

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

    const signatureBytes = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      new TextEncoder().encode(signStr)
    );

    return btoa(String.fromCharCode(...new Uint8Array(signatureBytes)));
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