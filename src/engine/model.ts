import { pipeline, env } from "@huggingface/transformers";
import type { DeviceType } from "../types";

env.allowLocalModels = false;

const MODEL_ID = "onnx-community/ormbg-ONNX";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let segmenter: any = null;
let currentDevice: DeviceType | null = null;

export async function loadModel(
  onProgress: (progress: number, text: string) => void
): Promise<{ device: DeviceType }> {
  if (segmenter && currentDevice) {
    return { device: currentDevice };
  }

  onProgress(0, "모델 준비 중...");

  // ORMBG uses MaxPool ceil_mode which WebGPU doesn't support,
  // so always use WASM + uint8 quantized (44MB)
  segmenter = await pipeline("background-removal", MODEL_ID, {
    device: "wasm",
    dtype: "uint8",
    progress_callback: (p: { progress?: number; status?: string }) => {
      if (p.progress != null) {
        onProgress(
          Math.round(p.progress),
          p.status === "download" ? "모델 다운로드 중..." : "모델 로딩 중..."
        );
      }
    },
  });
  currentDevice = "wasm";

  onProgress(100, "모델 준비 완료!");
  return { device: "wasm" };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSegmenter(): any {
  if (!segmenter) throw new Error("모델이 로드되지 않았습니다");
  return segmenter;
}
