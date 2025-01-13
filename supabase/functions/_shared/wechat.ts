import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

// 格式化私钥
function formatPrivateKey(privateKey: string): string {
  try {
    // 移除所有空格和换行符
    let formattedKey = privateKey.replace(/[\r\n\s]/g, '');
    
    // 如果已经是PEM格式，直接返回
    if (formattedKey.includes('-----BEGIN PRIVATE KEY-----')) {
      return formattedKey;
    }
    
    // 每64个字符添加换行符
    const chunks = formattedKey.match(/.{1,64}/g) || [];
    formattedKey = chunks.join('\n');
    
    // 添加PEM头尾
    return `-----BEGIN PRIVATE KEY-----\n${formattedKey}\n-----END PRIVATE KEY-----`;
  } catch (error) {
    console.error('格式化私钥时出错:', error);
    throw new Error(`格式化私钥失败: ${error.message}`);
  }
}

// 生成签名
async function generateSignature(method: string, url: string, timestamp: string, nonce: string, body: string, privateKey: string): Promise<string> {
  try {
    // 构造签名字符串
    const message = `${method}\n${url}\n${timestamp}\n${nonce}\n${body}\n`;
    console.log('待签名字符串:', message);

    // 格式化私钥
    const formattedKey = formatPrivateKey(privateKey);
    console.log('使用的私钥格式:', formattedKey);

    // 将私钥字符串转换为 ArrayBuffer
    const binaryKey = new TextEncoder().encode(formattedKey);

    try {
      // 导入私钥
      const cryptoKey = await crypto.subtle.importKey(
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
        cryptoKey,
        messageBuffer
      );

      // 转换为Base64
      return btoa(String.fromCharCode(...new Uint8Array(signature)));
    } catch (cryptoError) {
      console.error('签名过程中出错:', cryptoError);
      throw new Error(`签名生成失败: ${cryptoError.message}`);
    }
  } catch (error) {
    console.error('生成签名时出错:', error);
    throw error;
  }
}

// 创建支付记录
async function createPaymentRecord(
  supabaseUrl: string,
  supabaseKey: string,
  orderId: string,
  amount: number
) {
  const supabaseClient = createClient(supabaseUrl, supabaseKey);
  
  const { error } = await supabaseClient
    .from('payment_records')
    .insert({
      order_id: orderId,
      amount: amount / 100, // 转换回元
      status: 'pending'
    });

  if (error) {
    console.error('创建支付记录失败:', error);
    throw new Error('创建支付记录失败');
  }
}

export { generateSignature, createPaymentRecord };