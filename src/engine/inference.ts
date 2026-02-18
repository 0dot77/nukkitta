import { RawImage } from "@huggingface/transformers";
import { getSegmenter } from "./model";

export async function runInference(imageUrl: string): Promise<RawImage> {
  const segmenter = getSegmenter();

  // Pipeline returns RawImage[] with RGBA (alpha = mask)
  const results = await segmenter(imageUrl);
  const output: RawImage = results[0];

  // Extract alpha channel as single-channel mask
  const pixelCount = output.width * output.height;
  const channels = output.data.length / pixelCount;
  const maskArray = new Uint8Array(pixelCount);

  for (let i = 0; i < pixelCount; i++) {
    // Alpha is the last channel (index 3 for RGBA)
    maskArray[i] = output.data[i * channels + (channels - 1)];
  }

  // Return single-channel mask as RawImage
  return new RawImage(maskArray, output.width, output.height, 1);
}
