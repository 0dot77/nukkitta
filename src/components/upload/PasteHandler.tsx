import { useEffect } from "react";
import { useAppStore } from "../../store/useAppStore";
import { validateFiles } from "../../utils/file";

interface PasteHandlerProps {
  onPasted: () => void;
}

export function PasteHandler({ onPasted }: PasteHandlerProps) {
  const addImages = useAppStore((s) => s.addImages);

  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const files: File[] = [];
      for (const item of items) {
        if (item.kind === "file" && item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) files.push(file);
        }
      }

      if (files.length === 0) return;

      const { valid, errors } = validateFiles(files);
      if (errors.length > 0) alert(errors.join("\n"));
      if (valid.length > 0) {
        addImages(valid);
        onPasted();
      }
    };

    document.addEventListener("paste", handler);
    return () => document.removeEventListener("paste", handler);
  }, [addImages, onPasted]);

  return null;
}
