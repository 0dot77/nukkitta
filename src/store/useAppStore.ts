import { create } from "zustand";
import type { ImageItem, ModelState } from "../types";

interface AppStore {
  images: ImageItem[];
  model: ModelState;
  isProcessing: boolean;

  addImages: (files: File[]) => void;
  removeImage: (id: string) => void;
  clearAll: () => void;
  updateImage: (id: string, update: Partial<ImageItem>) => void;
  setModelState: (update: Partial<ModelState>) => void;
  setProcessing: (v: boolean) => void;
}

let idCounter = 0;

export const useAppStore = create<AppStore>((set) => ({
  images: [],
  model: {
    status: "idle",
    progress: 0,
    progressText: "",
    device: null,
    error: null,
  },
  isProcessing: false,

  addImages: (files) => {
    const newItems: ImageItem[] = files.map((file) => ({
      id: `img-${++idCounter}-${Date.now()}`,
      file,
      originalUrl: URL.createObjectURL(file),
      resultUrl: null,
      resultBlob: null,
      status: "queued",
      error: null,
      progress: 0,
    }));
    set((state) => ({ images: [...state.images, ...newItems] }));
  },

  removeImage: (id) =>
    set((state) => {
      const img = state.images.find((i) => i.id === id);
      if (img) {
        URL.revokeObjectURL(img.originalUrl);
        if (img.resultUrl) URL.revokeObjectURL(img.resultUrl);
      }
      return { images: state.images.filter((i) => i.id !== id) };
    }),

  clearAll: () =>
    set((state) => {
      for (const img of state.images) {
        URL.revokeObjectURL(img.originalUrl);
        if (img.resultUrl) URL.revokeObjectURL(img.resultUrl);
      }
      return { images: [] };
    }),

  updateImage: (id, update) =>
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, ...update } : img
      ),
    })),

  setModelState: (update) =>
    set((state) => ({
      model: { ...state.model, ...update },
    })),

  setProcessing: (v) => set({ isProcessing: v }),
}));
