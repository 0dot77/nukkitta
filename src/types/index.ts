export type ImageStatus =
  | "queued"
  | "processing"
  | "done"
  | "error";

export interface ImageItem {
  id: string;
  file: File;
  originalUrl: string;
  resultUrl: string | null;
  resultBlob: Blob | null;
  status: ImageStatus;
  error: string | null;
  progress: number;
}

export type ModelStatus =
  | "idle"
  | "loading"
  | "ready"
  | "error";

export type DeviceType = "webgpu" | "wasm";

export interface ModelState {
  status: ModelStatus;
  progress: number;
  progressText: string;
  device: DeviceType | null;
  error: string | null;
}

export type ExportFormat = "png" | "jpeg";

export type BackgroundType = "transparent" | "white" | "custom";

export interface ShadowSettings {
  enabled: boolean;
  blur: number;
  offsetX: number;
  offsetY: number;
  opacity: number;
  color: string;
}

export interface MaskSettings {
  threshold: number;    // 0-255, 경계값 이하 투명 처리
  feather: number;      // 0-5px, 가장자리 블러
  erode: number;        // 0-5px, 배경색 잔상 제거
}

export interface ExportSettings {
  format: ExportFormat;
  jpegQuality: number;
  background: BackgroundType;
  backgroundColor: string;
  shadow: ShadowSettings;
  mask: MaskSettings;
}
