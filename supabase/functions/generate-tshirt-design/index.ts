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

    // 创建一个60秒超时的AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

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
          response_format: "url",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!openaiResponse.ok) {
        const errorData = await openaiResponse.json();
        console.error('OpenAI API错误:', errorData);
        
        // 处理不同类型的OpenAI API错误
        if (errorData.error?.type === 'invalid_request_error') {
          throw new Error('无效的请求参数');
        } else if (errorData.error?.type === 'rate_limit_exceeded') {
          throw new Error('API调用次数已达上限，请稍后再试');
        } else {
          throw new Error(errorData.error?.message || '生成图像失败');
        }
      }

      const data = await openaiResponse.json();
      console.log('OpenAI响应成功');

      return new Response(
        JSON.stringify({ imageUrl: data.data[0].url }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        console.error('请求超时');
        throw new Error('生成图像超时，请稍后重试');
      }
      throw error;
    }
  } catch (error) {
    console.error('生成设计时出错:', error);
    
    // 根据错误类型返回适当的错误消息
    let statusCode = 500;
    let errorMessage = error.message || '生成设计时出现错误';
    
    if (error.message.includes('API调用次数已达上限')) {
      statusCode = 429;
    } else if (error.message.includes('无效的请求参数')) {
      statusCode = 400;
    }

    return new Response(
      JSON.stringify({ 
        error: {
          message: errorMessage,
          type: error.name,
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: statusCode
      }
    );
  }
});