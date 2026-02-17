import type { ImageItem } from "../../types";
import { useAppStore } from "../../store/useAppStore";
import { useSettingsStore } from "../../store/useSettingsStore";
import { canvasToBlob, downloadBlob } from "../../engine/export";
import { getExportFilename } from "../../utils/file";
import { createCanvasFromBlob } from "../../utils/canvas";
import { applyShadow } from "../../engine/shadow";
import { ProgressBar } from "./ProgressBar";

interface ImageCardProps {
  image: ImageItem;
}

export function ImageCard({ image }: ImageCardProps) {
  const removeImage = useAppStore((s) => s.removeImage);
  const settings = useSettingsStore();

  const handleDownload = async () => {
    if (!image.resultBlob) return;

    const canvas = await createCanvasFromBlob(image.resultBlob);
    const withShadow = applyShadow(canvas, settings.shadow);
    const blob = await canvasToBlob(
      withShadow,
      settings.format,
      settings.jpegQuality,
      settings.background,
      settings.backgroundColor
    );
    const filename = getExportFilename(image.file.name, settings.format);
    downloadBlob(blob, filename);
  };

  const statusBadge = () => {
    switch (image.status) {
      case "queued":
        return (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-text-secondary">
            대기중
          </span>
        );
      case "processing":
        return (
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
            처리중
          </span>
        );
      case "done":
        return (
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
            완료
          </span>
        );
      case "error":
        return (
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">
            오류
          </span>
        );
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      <div className="grid grid-cols-2 gap-0">
        {/* Original */}
        <div className="relative aspect-square overflow-hidden border-r border-border bg-gray-50">
          <img
            src={image.originalUrl}
            alt="원본"
            className="h-full w-full object-contain"
          />
          <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
            원본
          </span>
        </div>

        {/* Result */}
        <div className="relative aspect-square overflow-hidden">
          {image.resultUrl ? (
            <div className="checkerboard h-full w-full">
              <img
                src={image.resultUrl}
                alt="결과"
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-50 text-sm text-text-secondary">
              {image.status === "processing" ? "처리중..." : "결과"}
            </div>
          )}
          <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
            누끼
          </span>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-border px-3 py-2">
        <div className="flex items-center gap-2 min-w-0">
          {statusBadge()}
          <span className="truncate text-xs text-text-secondary">
            {image.file.name}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {image.status === "done" && (
            <button
              onClick={handleDownload}
              className="rounded-lg bg-primary px-3 py-1 text-xs font-medium text-white hover:bg-primary-hover transition-colors"
            >
              저장
            </button>
          )}
          <button
            onClick={() => removeImage(image.id)}
            className="rounded-lg px-2 py-1 text-xs text-text-secondary hover:bg-red-50 hover:text-error transition-colors"
          >
            삭제
          </button>
        </div>
      </div>

      {/* Progress */}
      {image.status === "processing" && (
        <div className="px-3 pb-2">
          <ProgressBar progress={image.progress} />
        </div>
      )}

      {/* Error */}
      {image.status === "error" && image.error && (
        <div className="border-t border-red-100 bg-red-50 px-3 py-2 text-xs text-error">
          {image.error}
        </div>
      )}
    </div>
  );
}
