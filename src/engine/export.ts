import JSZip from "jszip";
import { saveAs } from "file-saver";
import type { ExportFormat, BackgroundType } from "../types";

function renderWithBackground(
  source: HTMLCanvasElement,
  bgType: BackgroundType,
  bgColor: string
): HTMLCanvasElement {
  if (bgType === "transparent") return source;

  const canvas = document.createElement("canvas");
  canvas.width = source.width;
  canvas.height = source.height;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = bgType === "white" ? "#ffffff" : bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(source, 0, 0);

  return canvas;
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: ExportFormat,
  jpegQuality: number,
  bgType: BackgroundType,
  bgColor: string
): Promise<Blob> {
  const finalCanvas = renderWithBackground(canvas, bgType, bgColor);
  const mimeType = format === "png" ? "image/png" : "image/jpeg";
  const quality = format === "jpeg" ? jpegQuality / 100 : undefined;

  return new Promise((resolve, reject) => {
    finalCanvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("이미지 변환에 실패했습니다"));
      },
      mimeType,
      quality
    );
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  saveAs(blob, filename);
}

export async function downloadAsZip(
  items: Array<{ blob: Blob; filename: string }>
) {
  const zip = new JSZip();
  for (const item of items) {
    zip.file(item.filename, item.blob);
  }
  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, "nukkitta-export.zip");
}
