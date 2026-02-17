import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useAppStore } from "../../store/useAppStore";
import { validateFiles } from "../../utils/file";

interface DropZoneProps {
  onFilesAdded: () => void;
}

export function DropZone({ onFilesAdded }: DropZoneProps) {
  const addImages = useAppStore((s) => s.addImages);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const { valid, errors } = validateFiles(acceptedFiles);
      if (errors.length > 0) {
        alert(errors.join("\n"));
      }
      if (valid.length > 0) {
        addImages(valid);
        onFilesAdded();
      }
    },
    [addImages, onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 20 * 1024 * 1024,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed
        px-6 py-16 text-center transition-colors
        ${
          isDragActive
            ? "border-primary bg-primary-light"
            : "border-border bg-white hover:border-primary/50 hover:bg-surface-hover"
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="mb-4 text-4xl">
        {isDragActive ? "👋" : "📸"}
      </div>
      <p className="mb-2 text-base font-semibold text-text-primary">
        {isDragActive
          ? "여기에 놓으세요!"
          : "상품 사진을 드래그하거나 클릭하세요"}
      </p>
      <p className="text-sm text-text-secondary">
        JPG, PNG, WebP &middot; 최대 20MB &middot; 여러 장 한번에 가능
      </p>
      <p className="mt-2 text-xs text-text-secondary">
        Ctrl+V로 클립보드에서 붙여넣기도 됩니다
      </p>
    </div>
  );
}
