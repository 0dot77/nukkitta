import { useCallback } from "react";
import { useAppStore } from "../store/useAppStore";
import { loadModel } from "../engine/model";

export function useModelLoader() {
  const { model, setModelState } = useAppStore();

  const ensureModel = useCallback(async () => {
    if (model.status === "ready") return;
    if (model.status === "loading") return;

    setModelState({ status: "loading", error: null });

    try {
      const { device } = await loadModel((progress, text) => {
        setModelState({ progress, progressText: text });
      });
      setModelState({ status: "ready", device, progress: 100 });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "모델 로딩에 실패했습니다";
      setModelState({ status: "error", error: message });
      throw err;
    }
  }, [model.status, setModelState]);

  return { model, ensureModel };
}
