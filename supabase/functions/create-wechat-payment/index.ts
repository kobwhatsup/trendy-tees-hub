import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { generateSignature, createPaymentRecord } from '../_shared/wechat.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // 处理 CORS 预检请求
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { orderId, orderNumber, amount, description, out_trade_no } = await req.json()
    console.log('收到创建支付请求:', { orderId, orderNumber, amount, description, out_trade_no })

    // 创建支付记录
    await createPaymentRecord(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      orderId,
      amount
    )

    // 调用微信支付Native下单API
    const appid = Deno.env.get('WECHAT_PAY_APP_ID')
    const mchid = Deno.env.get('WECHAT_PAY_MCH_ID')
    const notifyUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/wechat-payment-callback`
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const nonceStr = crypto.randomUUID()

    console.log('开始调用微信支付API')

    const requestData = {
      appid,
      mchid,
      description,
      out_trade_no: out_trade_no, // 使用传入的商户订单号
      notify_url: notifyUrl,
      amount: {
        total: amount,
        currency: 'CNY'
      }
    }

    // 生成请求签名
    const method = 'POST'
    const url = '/v3/pay/transactions/native'
    const privateKey = Deno.env.get('WECHAT_PAY_PRIVATE_KEY') ?? ''
    const serialNo = Deno.env.get('WECHAT_PAY_CERT_SERIAL_NO') ?? ''

    console.log('开始生成签名，参数:', {
      method,
      url,
      timestamp,
      nonceStr,
      requestData: JSON.stringify(requestData),
      privateKeyLength: privateKey.length
    })

    const signature = await generateSignature(
      method,
      url,
      timestamp,
      nonceStr,
      JSON.stringify(requestData),
      privateKey
    )

    console.log('签名生成成功')

    const authorization = `WECHATPAY2-SHA256-RSA2048 mchid="${mchid}",nonce_str="${nonceStr}",timestamp="${timestamp}",serial_no="${serialNo}",signature="${signature}"`

    console.log('待签名字符串:', { method, url, timestamp, nonceStr, requestData })

    const response = await fetch('https://api.mch.weixin.qq.com/v3/pay/transactions/native', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authorization,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)'
      },
      body: JSON.stringify(requestData)
    })

    const result = await response.json()
    console.log('微信支付API响应:', result)

    if (!response.ok) {
      console.error('微信支付API错误:', result)
      throw new Error(`微信支付API错误: ${result.message || '未知错误'}`)
    }

    return new Response(
      JSON.stringify(result),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )

  } catch (error) {
    console.error('处理支付请求失败:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message 
      }), 
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        } 
      }
    )
  }
})