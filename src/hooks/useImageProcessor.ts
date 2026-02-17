import { useCallback, useRef } from "react";
import { useAppStore } from "../store/useAppStore";
import { useModelLoader } from "./useModelLoader";
import { useDailyQuota } from "./useDailyQuota";
import { runInference } from "../engine/inference";
import { applyMask } from "../engine/mask";

export function useImageProcessor() {
  const { images, updateImage, setProcessing, isProcessing } = useAppStore();
  const { ensureModel } = useModelLoader();
  const { canProcess, recordUsage } = useDailyQuota();
  const processingRef = useRef(false);

  const processQueue = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;
    setProcessing(true);

    try {
      await ensureModel();
    } catch {
      processingRef.current = false;
      setProcessing(false);
      return;
    }

    const queued = useAppStore
      .getState()
      .images.filter((i) => i.status === "queued");

    for (const item of queued) {
      if (!canProcess) {
        updateImage(item.id, {
          status: "error",
          error: "일일 무료 한도를 초과했습니다",
        });
        continue;
      }

      updateImage(item.id, { status: "processing", progress: 10 });

      try {
        // Load original image
        const img = new Image();
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = item.originalUrl;
        });

        updateImage(item.id, { progress: 30 });

        // Run inference
        const mask = await runInference(item.originalUrl);
        updateImage(item.id, { progress: 80 });

        // Apply mask
        const resultCanvas = applyMask(img, mask);

        // Convert to blob and URL
        const blob = await new Promise<Blob>((resolve, reject) => {
          resultCanvas.toBlob((b) => {
            if (b) resolve(b);
            else reject(new Error("변환 실패"));
          }, "image/png");
        });

        const resultUrl = URL.createObjectURL(blob);

        updateImage(item.id, {
          status: "done",
          resultUrl,
          resultBlob: blob,
          progress: 100,
        });

        recordUsage();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "처리 중 오류가 발생했습니다";
        updateImage(item.id, {
          status: "error",
          error: message,
          progress: 0,
        });
      }
    }

    processingRef.current = false;
    setProcessing(false);
  }, [ensureModel, canProcess, recordUsage, updateImage, setProcessing]);

  return { processQueue, isProcessing, images };
}
