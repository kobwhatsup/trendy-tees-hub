import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // 处理CORS预检请求
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()
    
    if (!prompt) {
      throw new Error('设计描述不能为空')
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      console.error('OpenAI API密钥未设置');
      throw new Error('系统配置错误，请联系管理员')
    }

    console.log('正在生成设计，提示词:', prompt)

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超时

    try {
      const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1024",
          quality: "standard",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!openaiResponse.ok) {
        const errorData = await openaiResponse.json();
        console.error('OpenAI API错误:', errorData);
        throw new Error(errorData.error?.message || '生成图像失败');
      }

      const data = await openaiResponse.json();
      console.log('OpenAI响应成功');

      return new Response(
        JSON.stringify({ imageUrl: data.data[0].url }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('请求超时，请稍后重试');
      }
      throw error;
    }
  } catch (error) {
    console.error('生成设计时出错:', error);
    return new Response(
      JSON.stringify({ 
        error: {
          message: error.message || '生成设计时出现错误',
          type: error.name,
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});