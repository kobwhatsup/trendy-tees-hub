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
  
  console.log('开始保存设计到数据库');

  // 并行处理前后预览图的上传
  const uploadTasks = [];
  let frontPreviewPath = frontPreviewImage;
  let backPreviewPath = backPreviewImage;

  if (frontPreviewImage && frontPreviewImage.startsWith('data:')) {
    console.log('开始处理正面预览图');
    const frontUploadTask = (async () => {
      try {
        const frontPreviewBlob = await fetch(frontPreviewImage).then(r => r.blob());
        const path = `preview-images/${imageId}-front.png`;
        
        const { error: frontUploadError } = await supabase.storage
          .from('design-images')
          .upload(path, frontPreviewBlob, {
            contentType: 'image/png',
            upsert: true
          });

        if (frontUploadError) throw frontUploadError;
        frontPreviewPath = path;
        console.log('正面预览图上传成功');
      } catch (error) {
        console.error('处理正面预览图失败:', error);
        throw error;
      }
    })();
    uploadTasks.push(frontUploadTask);
  }

  if (backPreviewImage && backPreviewImage.startsWith('data:')) {
    console.log('开始处理背面预览图');
    const backUploadTask = (async () => {
      try {
        const backPreviewBlob = await fetch(backPreviewImage).then(r => r.blob());
        const path = `preview-images/${imageId}-back.png`;
        
        const { error: backUploadError } = await supabase.storage
          .from('design-images')
          .upload(path, backPreviewBlob, {
            contentType: 'image/png',
            upsert: true
          });

        if (backUploadError) throw backUploadError;
        backPreviewPath = path;
        console.log('背面预览图上传成功');
      } catch (error) {
        console.error('处理背面预览图失败:', error);
        throw error;
      }
    })();
    uploadTasks.push(backUploadTask);
  }

  // 等待所有上传任务完成
  if (uploadTasks.length > 0) {
    console.log('等待所有预览图上传完成...');
    await Promise.all(uploadTasks);
    console.log('所有预览图上传完成');
  }

  // 保存设计方案，默认设置 is_public 为 true
  console.log('开始保存设计方案到数据库');
  const { error: draftError } = await supabase
    .from('design_drafts')
    .insert({
      user_id: userId,
      design_front: frontDesignImage,
      design_back: backDesignImage,
      preview_front: frontPreviewPath,
      preview_back: backPreviewPath,
      title: `设计方案-${imageId}`,
      is_public: true // 设置默认为分享状态
    })
    .select()
    .single();

  if (draftError) {
    console.error('保存设计方案失败:', draftError);
    throw draftError;
  }
  console.log('设计方案保存成功');

  // 添加到购物车
  console.log('开始添加到购物车');
  const { error: cartError } = await supabase
    .from('cart_items')
    .insert({
      user_id: userId,
      design_front: frontDesignImage,
      design_back: backDesignImage,
      preview_front: frontPreviewPath,
      preview_back: backPreviewPath,
      tshirt_style: tshirtStyle,
      tshirt_color: tshirtColor,
      tshirt_gender: tshirtGender,
      tshirt_size: tshirtSize,
    })
    .select()
    .single();

  if (cartError) {
    console.error('添加到购物车失败:', cartError);
    throw cartError;
  }
  console.log('成功添加到购物车');
};