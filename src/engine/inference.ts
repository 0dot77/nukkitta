import { RawImage } from "@huggingface/transformers";
import { getModel, getProcessor } from "./model";

export async function runInference(imageUrl: string): Promise<RawImage> {
  const image = await RawImage.fromURL(imageUrl);
  const processor = getProcessor();
  const model = getModel();

  const { pixel_values } = await processor(image);
  const { output_image } = await model({ input_image: pixel_values });

  const maskData = await RawImage.fromTensor(
    output_image[0].sigmoid().mul(255).to("uint8")
  ).resize(image.width, image.height);

  return maskData;
}
