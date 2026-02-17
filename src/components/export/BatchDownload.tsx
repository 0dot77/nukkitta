import { useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import { useSettingsStore } from "../../store/useSettingsStore";
import { canvasToBlob, downloadAsZip } from "../../engine/export";
import { createCanvasFromBlob } from "../../utils/canvas";
import { applyShadow } from "../../engine/shadow";
import { getExportFilename } from "../../utils/file";

export function BatchDownload() {
  const images = useAppStore((s) => s.images);
  const settings = useSettingsStore();
  const [downloading, setDownloading] = useState(false);

  const doneImages = images.filter((i) => i.status === "done" && i.resultBlob);

  if (doneImages.length < 2) return null;

  const handleBatchDownload = async () => {
    setDownloading(true);
    try {
      const items = await Promise.all(
        doneImages.map(async (img) => {
          const canvas = await createCanvasFromBlob(img.resultBlob!);
          const withShadow = applyShadow(canvas, settings.shadow);
          const blob = await canvasToBlob(
            withShadow,
            settings.format,
            settings.jpegQuality,
            settings.background,
            settings.backgroundColor
          );
          return {
            blob,
            filename: getExportFilename(img.file.name, settings.format),
          };
        })
      );
      await downloadAsZip(items);
    } catch (err) {
      alert("ZIP 다운로드에 실패했습니다: " + (err instanceof Error ? err.message : "알 수 없는 오류"));
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleBatchDownload}
      disabled={downloading}
      className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
    >
      {downloading
        ? "ZIP 생성 중..."
        : `전체 다운로드 (${doneImages.length}장 ZIP)`}
    </button>
  );
}
