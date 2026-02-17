import { useCallback, useRef } from "react";
import { useAppStore } from "../store/useAppStore";
import { useSettingsStore } from "../store/useSettingsStore";
import { useModelLoader } from "./useModelLoader";
import { useDailyQuota } from "./useDailyQuota";
import { runInference } from "../engine/inference";
import {
  applyMask,
  cacheRawMask,
  getCachedMask,
  refineMask,
} from "../engine/mask";

export function useImageProcessor() {
  const { images, updateImage, setProcessing, isProcessing } = useAppStore();
  const { ensureModel } = useModelLoader();
  const { canProcess, recordUsage } = useDailyQuota();
  const maskSettings = useSettingsStore((s) => s.mask);
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

    const currentMask = useSettingsStore.getState().mask;

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
        const img = new Image();
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = item.originalUrl;
        });

        updateImage(item.id, { progress: 30 });

        // Run inference → raw mask → cache single-channel
        const rawMask = await runInference(item.originalUrl);
        cacheRawMask(item.id, rawMask);
        const cached = getCachedMask(item.id)!;

        updateImage(item.id, { progress: 70 });

        // Refine mask (threshold + erode + feather)
        const refined = refineMask(
          cached.data,
          cached.width,
          cached.height,
          currentMask
        );

        updateImage(item.id, { progress: 85 });

        // Apply refined mask to original
        const resultCanvas = applyMask(img, refined, cached.width, cached.height);

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
  }, [ensureModel, canProcess, recordUsage, updateImage, setProcessing, maskSettings]);

  // Re-apply mask refinement to already-processed images (no re-inference)
  const reprocessAll = useCallback(async () => {
    const doneImages = useAppStore
      .getState()
      .images.filter((i) => i.status === "done");
    const currentMask = useSettingsStore.getState().mask;

    for (const item of doneImages) {
      const cached = getCachedMask(item.id);
      if (!cached) continue;

      try {
        const img = new Image();
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = item.originalUrl;
        });

        const refined = refineMask(
          cached.data,
          cached.width,
          cached.height,
          currentMask
        );

        const resultCanvas = applyMask(img, refined, cached.width, cached.height);

        const blob = await new Promise<Blob>((resolve, reject) => {
          resultCanvas.toBlob((b) => {
            if (b) resolve(b);
            else reject(new Error("변환 실패"));
          }, "image/png");
        });

        // Revoke old URL
        if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);

        updateImage(item.id, {
          resultUrl: URL.createObjectURL(blob),
          resultBlob: blob,
        });
      } catch {
        // skip silently on re-process errors
      }
    }
  }, [updateImage]);

  return { processQueue, reprocessAll, isProcessing, images };
}
