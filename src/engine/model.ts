import {
  AutoModel,
  AutoProcessor,
  env,
  type PreTrainedModel,
  type Processor,
} from "@huggingface/transformers";
import type { DeviceType } from "../types";

env.allowLocalModels = false;

const MODEL_ID = "briaai/RMBG-1.4";

let model: PreTrainedModel | null = null;
let processor: Processor | null = null;
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
  if (model && processor && currentDevice) {
    return { device: currentDevice };
  }

  const device = await detectDevice();
  currentDevice = device;

  onProgress(0, "모델 준비 중...");

  const modelConfig: Record<string, unknown> = {
    dtype: "fp32",
  };

  if (device === "webgpu") {
    modelConfig.device = "webgpu";
  } else {
    modelConfig.device = "wasm";
  }

  model = await AutoModel.from_pretrained(MODEL_ID, {
    ...modelConfig,
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

  processor = await AutoProcessor.from_pretrained(MODEL_ID);

  onProgress(100, "모델 준비 완료!");
  return { device };
}

export function getModel(): PreTrainedModel {
  if (!model) throw new Error("모델이 로드되지 않았습니다");
  return model;
}

export function getProcessor(): Processor {
  if (!processor) throw new Error("프로세서가 로드되지 않았습니다");
  return processor;
}
