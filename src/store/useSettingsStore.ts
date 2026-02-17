import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ExportSettings } from "../types";

interface SettingsStore extends ExportSettings {
  setFormat: (format: ExportSettings["format"]) => void;
  setJpegQuality: (quality: number) => void;
  setBackground: (bg: ExportSettings["background"]) => void;
  setBackgroundColor: (color: string) => void;
  setShadow: (update: Partial<ExportSettings["shadow"]>) => void;
  setMask: (update: Partial<ExportSettings["mask"]>) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      format: "png",
      jpegQuality: 92,
      background: "transparent",
      backgroundColor: "#ffffff",
      shadow: {
        enabled: false,
        blur: 12,
        offsetX: 0,
        offsetY: 4,
        opacity: 0.3,
        color: "#000000",
      },
      mask: {
        threshold: 128,
        feather: 1,
        erode: 1,
      },

      setFormat: (format) => set({ format }),
      setJpegQuality: (jpegQuality) => set({ jpegQuality }),
      setBackground: (background) => set({ background }),
      setBackgroundColor: (backgroundColor) => set({ backgroundColor }),
      setShadow: (update) =>
        set((state) => ({
          shadow: { ...state.shadow, ...update },
        })),
      setMask: (update) =>
        set((state) => ({
          mask: { ...state.mask, ...update },
        })),
    }),
    { name: "nukkitta-settings" }
  )
);
