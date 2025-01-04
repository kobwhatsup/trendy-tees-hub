import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()
    
    if (!prompt) {
      throw new Error('设计描述不能为空')
    }

    console.log('正在生成设计，提示词:', prompt)

    const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: `Create a high-quality, professional illustration of ${prompt}. The design should be clear, visually striking, and artistic. Use bold colors and clean lines. Generate ONLY the artwork itself without any t-shirt mockup or clothing template. The image should be a standalone illustration on a transparent or simple background. Do not include any text, borders, or clothing outlines.`,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      }),
    })

    const data = await openaiResponse.json()
    console.log('OpenAI响应:', data)

    if (!openaiResponse.ok) {
      throw new Error(data.error?.message || '生成图像失败')
    }

    return new Response(
      JSON.stringify({ imageUrl: data.data[0].url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('生成设计时出错:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})