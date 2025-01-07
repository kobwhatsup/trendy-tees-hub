import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // 处理CORS预检请求
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    })
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

    // 调用OpenAI API生成图像
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
        response_format: "b64_json",
        style: "natural"
      })
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.error('OpenAI API错误:', errorData);
      throw new Error(errorData.error?.message || '生成图像失败');
    }

    const data = await openaiResponse.json();
    console.log('OpenAI响应成功，获取到base64图像数据');

    // 将base64数据转换为Blob并上传到Supabase存储
    const imageData = data.data[0].b64_json;
    const imageBlob = Uint8Array.from(atob(imageData), c => c.charCodeAt(0));
    
    // 创建Supabase客户端
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

    // 生成唯一的文件名
    const fileName = `${crypto.randomUUID()}.png`;
    
    // 上传到Supabase存储
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('design-images')
      .upload(fileName, imageBlob, {
        contentType: 'image/png',
        upsert: false
      });

    if (uploadError) {
      console.error('上传到Supabase存储失败:', uploadError);
      throw new Error('保存图像失败');
    }

    // 获取公开访问URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('design-images')
      .getPublicUrl(fileName);

    return new Response(
      JSON.stringify({ imageUrl: publicUrl }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

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
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 500
      }
    );
  }
});