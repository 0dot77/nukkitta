import { pipeline, env } from "@huggingface/transformers";
import type { DeviceType } from "../types";

env.allowLocalModels = false;

// BiRefNet Lite: MIT, general-purpose, high quality (needs WebGPU)
// ORMBG: Apache 2.0, WASM-compatible fallback
const PRIMARY_MODEL = "onnx-community/BiRefNet_lite-ONNX";
const FALLBACK_MODEL = "onnx-community/ormbg-ONNX";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let segmenter: any = null;
let currentDevice: DeviceType | null = null;
let currentModel: string | null = null;

function makeProgressCallback(
  onProgress: (progress: number, text: string) => void
) {
  return (p: { progress?: number; status?: string }) => {
    if (p.progress != null) {
      onProgress(
        Math.round(p.progress),
        p.status === "download" ? "모델 다운로드 중..." : "모델 로딩 중..."
      );
    }
  };
}

async function hasWebGPU(): Promise<boolean> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gpu = (navigator as any).gpu;
    if (gpu) {
      const adapter = await gpu.requestAdapter();
      if (adapter) return true;
    }
  } catch {
    // WebGPU not available
  }
  return false;
}

async function createPipelineWithTest(
  modelId: string,
  device: "webgpu" | "wasm",
  dtype: "fp32" | "fp16" | "q8" | "int8" | "uint8",
  onProgress: (progress: number, text: string) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const seg = await pipeline("background-removal", modelId, {
    device,
    dtype,
    progress_callback: makeProgressCallback(onProgress),
  });

  // Run a tiny test inference to verify model actually works on this backend
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#888";
  ctx.fillRect(0, 0, 32, 32);
  const blob = await new Promise<Blob>((r) =>
    canvas.toBlob((b) => r(b!), "image/png")
  );
  const url = URL.createObjectURL(blob);
  try {
    await seg(url);
  } finally {
    URL.revokeObjectURL(url);
  }

  return seg;
}

export async function loadModel(
  onProgress: (progress: number, text: string) => void
): Promise<{ device: DeviceType }> {
  if (segmenter && currentDevice) {
    return { device: currentDevice };
  }

  onProgress(0, "모델 준비 중...");

  // Strategy: Try BiRefNet Lite on WebGPU first (best quality for products),
  // fall back to ORMBG on WASM (always works, lower quality on objects)
  if (await hasWebGPU()) {
    try {
      segmenter = await createPipelineWithTest(
        PRIMARY_MODEL, "webgpu", "fp16", onProgress
      );
      currentDevice = "webgpu";
      currentModel = PRIMARY_MODEL;
      onProgress(100, "모델 준비 완료!");
      return { device: "webgpu" };
    } catch {
      // BiRefNet failed on WebGPU, fall through
      segmenter = null;
    }
  }

  // WASM fallback with ORMBG
  segmenter = await createPipelineWithTest(
    FALLBACK_MODEL, "wasm", "uint8", onProgress
  );
  currentDevice = "wasm";
  currentModel = FALLBACK_MODEL;

  onProgress(100, "모델 준비 완료!");
  return { device: "wasm" };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSegmenter(): any {
  if (!segmenter) throw new Error("모델이 로드되지 않았습니다");
  return segmenter;
}

export function getModelName(): string {
  return currentModel ?? "";
}
