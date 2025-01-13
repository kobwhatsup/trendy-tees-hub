import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // 处理CORS预检请求
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { privateKey } = await req.json()

    // 验证私钥格式
    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----') || 
        !privateKey.includes('-----END PRIVATE KEY-----')) {
      throw new Error('无效的私钥格式')
    }

    // 创建supabase客户端
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 使用KV存储保存私钥
    const { error: kvError } = await supabaseClient
      .from('system_settings')
      .upsert({ 
        key: 'wechat_pay_private_key',
        value: privateKey,
        updated_at: new Date().toISOString()
      })

    if (kvError) throw kvError

    return new Response(
      JSON.stringify({ message: '私钥已更新' }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('更新私钥失败:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || '更新私钥失败',
        details: error.stack
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})