import type { RawImage } from "@huggingface/transformers";

export function applyMask(
  originalImage: HTMLImageElement,
  mask: RawImage
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = originalImage.naturalWidth;
  canvas.height = originalImage.naturalHeight;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(originalImage, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  const maskPixels = mask.data;

  for (let i = 0; i < maskPixels.length; i++) {
    pixels[i * 4 + 3] = maskPixels[i];
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}
