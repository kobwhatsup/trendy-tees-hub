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