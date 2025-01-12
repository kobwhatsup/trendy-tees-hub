import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { privateKey } = await req.json()

    // 验证私钥格式
    if (!privateKey.includes("-----BEGIN PRIVATE KEY-----") || 
        !privateKey.includes("-----END PRIVATE KEY-----")) {
      throw new Error("无效的私钥格式")
    }

    // 更新私钥
    await Deno.env.set("WECHAT_PAY_PRIVATE_KEY", privateKey)

    return new Response(
      JSON.stringify({ message: "私钥已更新" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    )
  } catch (error) {
    console.error("更新私钥失败:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    )
  }
})