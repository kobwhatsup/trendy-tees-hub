import { supabase } from "@/integrations/supabase/client";

interface SaveDesignParams {
  userId: string;
  frontDesignImage?: string;
  backDesignImage?: string;
  frontPreviewImage?: string;
  backPreviewImage?: string;
  tshirtStyle: string;
  tshirtColor: string;
  tshirtGender: string;
  tshirtSize: string;
}

export const saveDesignToDatabase = async ({
  userId,
  frontDesignImage,
  backDesignImage,
  frontPreviewImage,
  backPreviewImage,
  tshirtStyle,
  tshirtColor,
  tshirtGender,
  tshirtSize,
}: SaveDesignParams) => {
  // 生成唯一的图片标识符
  const imageId = crypto.randomUUID();
  
  console.log('开始保存设计到数据库:', {
    frontPreviewImage,
    backPreviewImage
  });

  // 保存预览图到storage bucket
  if (frontPreviewImage) {
    try {
      // 将base64图片数据转换为Blob
      const frontPreviewBlob = await fetch(frontPreviewImage).then(r => r.blob());
      const frontPreviewPath = `preview-images/${imageId}-front.png`;
      
      const { error: frontUploadError } = await supabase.storage
        .from('design-images')
        .upload(frontPreviewPath, frontPreviewBlob, {
          contentType: 'image/png',
          upsert: true
        });

      if (frontUploadError) {
        console.error('上传正面预览图失败:', frontUploadError);
        throw frontUploadError;
      }

      frontPreviewImage = frontPreviewPath;
    } catch (error) {
      console.error('处理正面预览图失败:', error);
      throw error;
    }
  }

  if (backPreviewImage) {
    try {
      // 将base64图片数据转换为Blob
      const backPreviewBlob = await fetch(backPreviewImage).then(r => r.blob());
      const backPreviewPath = `preview-images/${imageId}-back.png`;
      
      const { error: backUploadError } = await supabase.storage
        .from('design-images')
        .upload(backPreviewPath, backPreviewBlob, {
          contentType: 'image/png',
          upsert: true
        });

      if (backUploadError) {
        console.error('上传背面预览图失败:', backUploadError);
        throw backUploadError;
      }

      backPreviewImage = backPreviewPath;
    } catch (error) {
      console.error('处理背面预览图失败:', error);
      throw error;
    }
  }

  // 保存设计方案，包含所有图片URL
  const { error: draftError } = await supabase
    .from('design_drafts')
    .insert({
      user_id: userId,
      design_front: frontDesignImage,
      design_back: backDesignImage,
      preview_front: frontPreviewImage,
      preview_back: backPreviewImage,
      title: `设计方案-${imageId}`,
    })
    .select()
    .single();

  if (draftError) throw draftError;

  // 添加到购物车，确保保存所有图片URL
  const { error: cartError } = await supabase
    .from('cart_items')
    .insert({
      user_id: userId,
      design_front: frontDesignImage,
      design_back: backDesignImage,
      preview_front: frontPreviewImage,
      preview_back: backPreviewImage,
      tshirt_style: tshirtStyle,
      tshirt_color: tshirtColor,
      tshirt_gender: tshirtGender,
      tshirt_size: tshirtSize,
    })
    .select()
    .single();

  if (cartError) throw cartError;
};