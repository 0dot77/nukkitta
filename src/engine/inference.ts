import { RawImage } from "@huggingface/transformers";
import { getModel, getProcessor } from "./model";

export async function runInference(imageUrl: string): Promise<RawImage> {
  const image = await RawImage.fromURL(imageUrl);
  const processor = getProcessor();
  const model = getModel();

  const { pixel_values } = await processor(image);
  const { output } = await model({ input: pixel_values });

  const maskData = await RawImage.fromTensor(
    output[0].mul(255).to("uint8")
  ).resize(image.width, image.height);

  return maskData;
}
