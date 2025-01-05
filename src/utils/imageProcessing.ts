import { pipeline, env } from '@huggingface/transformers';

// 配置transformers.js始终下载模型
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;

function resizeImageIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    return true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);
  return false;
}

export const removeBackground = async (imageElement: HTMLImageElement): Promise<Blob> => {
  try {
    console.log('开始背景去除处理...');
    const segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512', {
      device: 'webgpu',
    });
    
    // 将HTMLImageElement转换为canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('无法获取canvas上下文');
    
    // 如果需要,调整图像大小并绘制到canvas
    const wasResized = resizeImageIfNeeded(canvas, ctx, imageElement);
    console.log(`图像${wasResized ? '已' : '未'}调整大小。最终尺寸: ${canvas.width}x${canvas.height}`);
    
    // 获取图像数据为base64格式
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    console.log('图像已转换为base64格式');
    
    // 使用分割模型处理图像
    console.log('正在使用分割模型处理...');
    const result = await segmenter(imageData);
    
    console.log('分割结果:', result);
    
    if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
      throw new Error('无效的分割结果');
    }
    
    // 创建新的canvas用于遮罩图像
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = canvas.width;
    outputCanvas.height = canvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    
    if (!outputCtx) throw new Error('无法获取输出canvas上下文');
    
    // 绘制原始图像
    outputCtx.drawImage(canvas, 0, 0);
    
    // 应用遮罩
    const outputImageData = outputCtx.getImageData(
      0, 0,
      outputCanvas.width,
      outputCanvas.height
    );
    const data = outputImageData.data;
    
    // 将反转的遮罩应用到alpha通道
    for (let i = 0; i < result[0].mask.data.length; i++) {
      // 反转遮罩值(1 - value)以保留主体而不是背景
      const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
      data[i * 4 + 3] = alpha;
    }
    
    outputCtx.putImageData(outputImageData, 0, 0);
    console.log('遮罩已成功应用');
    
    // 将canvas转换为blob
    return new Promise((resolve, reject) => {
      outputCanvas.toBlob(
        (blob) => {
          if (blob) {
            console.log('成功创建最终blob');
            resolve(blob);
          } else {
            reject(new Error('创建blob失败'));
          }
        },
        'image/png',
        1.0
      );
    });
  } catch (error) {
    console.error('去除背景时出错:', error);
    throw error;
  }
};

export const loadImage = (file: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};