import type { RawImage } from "@huggingface/transformers";
import type { MaskSettings } from "../types";

// Cache raw masks (single-channel) for re-processing without re-running inference
const rawMaskCache = new Map<string, { data: Uint8Array; width: number; height: number }>();

export function cacheRawMask(id: string, mask: RawImage) {
  const pixelCount = mask.width * mask.height;
  const channels = mask.data.length / pixelCount;
  let singleChannel: Uint8Array;

  if (channels === 1) {
    singleChannel = new Uint8Array(mask.data);
  } else {
    // Extract first channel only (grayscale mask)
    singleChannel = new Uint8Array(pixelCount);
    for (let i = 0; i < pixelCount; i++) {
      singleChannel[i] = mask.data[i * channels];
    }
  }

  rawMaskCache.set(id, {
    data: singleChannel,
    width: mask.width,
    height: mask.height,
  });
}

export function getCachedMask(id: string) {
  return rawMaskCache.get(id) ?? null;
}

export function clearMaskCache(id: string) {
  rawMaskCache.delete(id);
}

/**
 * Refine raw mask: threshold → erode → feather
 */
export function refineMask(
  rawData: Uint8Array,
  width: number,
  height: number,
  settings: MaskSettings
): Uint8Array {
  let mask = new Uint8Array(rawData);

  // 1. Threshold — clean binary separation
  if (settings.threshold > 0) {
    const t = settings.threshold;
    for (let i = 0; i < mask.length; i++) {
      mask[i] = mask[i] >= t ? 255 : 0;
    }
  }

  // 2. Erode — shrink mask to remove background color halo
  if (settings.erode > 0) {
    mask = erode(mask, width, height, settings.erode);
  }

  // 3. Feather — gaussian blur on mask for smooth edges
  if (settings.feather > 0) {
    mask = gaussianBlur(mask, width, height, settings.feather);
  }

  return mask;
}

/**
 * Morphological erosion: shrink foreground by radius pixels
 */
function erode(
  mask: Uint8Array,
  width: number,
  height: number,
  radius: number
): Uint8Array {
  const result = new Uint8Array(mask.length);
  const r = Math.ceil(radius);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let min = 255;
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (dx * dx + dy * dy > r * r) continue; // circular kernel
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            min = Math.min(min, mask[ny * width + nx]);
          } else {
            min = 0; // treat out-of-bounds as background
          }
        }
      }
      result[y * width + x] = min;
    }
  }

  return result;
}

/**
 * Approximate gaussian blur via 3-pass box blur (good enough for mask feathering)
 */
function gaussianBlur(
  mask: Uint8Array,
  width: number,
  height: number,
  radius: number
): Uint8Array {
  // Box blur radius for 3 passes that approximates gaussian
  const boxR = Math.max(1, Math.round(radius));
  let src = new Float32Array(mask);
  let dst = new Float32Array(mask.length);

  for (let pass = 0; pass < 3; pass++) {
    // Horizontal pass
    for (let y = 0; y < height; y++) {
      let sum = 0;
      const kernelSize = boxR * 2 + 1;

      // Initialize window
      for (let x = -boxR; x <= boxR; x++) {
        sum += src[y * width + Math.max(0, Math.min(width - 1, x))];
      }
      dst[y * width] = sum / kernelSize;

      for (let x = 1; x < width; x++) {
        const addIdx = Math.min(width - 1, x + boxR);
        const removeIdx = Math.max(0, x - boxR - 1);
        sum += src[y * width + addIdx] - src[y * width + removeIdx];
        dst[y * width + x] = sum / kernelSize;
      }
    }

    // Swap for vertical pass
    [src, dst] = [dst, src];

    // Vertical pass
    for (let x = 0; x < width; x++) {
      let sum = 0;
      const kernelSize = boxR * 2 + 1;

      for (let y = -boxR; y <= boxR; y++) {
        sum += src[Math.max(0, Math.min(height - 1, y)) * width + x];
      }
      dst[x] = sum / kernelSize;

      for (let y = 1; y < height; y++) {
        const addIdx = Math.min(height - 1, y + boxR);
        const removeIdx = Math.max(0, y - boxR - 1);
        sum += src[addIdx * width + x] - src[removeIdx * width + x];
        dst[y * width + x] = sum / kernelSize;
      }
    }

    [src, dst] = [dst, src];
  }

  const result = new Uint8Array(mask.length);
  for (let i = 0; i < result.length; i++) {
    result[i] = Math.max(0, Math.min(255, Math.round(src[i])));
  }
  return result;
}

/**
 * Apply refined mask as alpha channel to original image
 */
export function applyMask(
  originalImage: HTMLImageElement,
  maskData: Uint8Array,
  _width: number,
  _height: number
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = originalImage.naturalWidth;
  canvas.height = originalImage.naturalHeight;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(originalImage, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  for (let i = 0; i < maskData.length; i++) {
    pixels[i * 4 + 3] = maskData[i];
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
