import { pipeline, env } from "@huggingface/transformers";
import type { DeviceType } from "../types";

env.allowLocalModels = false;

const MODEL_ID = "onnx-community/ormbg-ONNX";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let segmenter: any = null;
let currentDevice: DeviceType | null = null;

async function detectDevice(): Promise<DeviceType> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gpu = (navigator as any).gpu;
    if (gpu) {
      const adapter = await gpu.requestAdapter();
      if (adapter) return "webgpu";
    }
  } catch {
    // WebGPU not available
  }
  return "wasm";
}

export async function loadModel(
  onProgress: (progress: number, text: string) => void
): Promise<{ device: DeviceType }> {
  if (segmenter && currentDevice) {
    return { device: currentDevice };
  }

  const device = await detectDevice();
  currentDevice = device;

  onProgress(0, "모델 준비 중...");

  segmenter = await pipeline("background-removal", MODEL_ID, {
    device,
    dtype: device === "webgpu" ? "fp16" : "uint8",
    progress_callback: (p: { progress?: number; status?: string }) => {
      if (p.progress != null) {
        onProgress(
          Math.round(p.progress),
          p.status === "download"
            ? "모델 다운로드 중..."
            : "모델 로딩 중..."
        );
      }
    },
  });

  onProgress(100, "모델 준비 완료!");
  return { device };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSegmenter(): any {
  if (!segmenter) throw new Error("모델이 로드되지 않았습니다");
  return segmenter;
}
