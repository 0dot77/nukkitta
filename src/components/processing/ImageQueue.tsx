import { useAppStore } from "../../store/useAppStore";
import { ImageCard } from "./ImageCard";

export function ImageQueue() {
  const images = useAppStore((s) => s.images);
  const clearAll = useAppStore((s) => s.clearAll);

  if (images.length === 0) return null;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text-primary">
          작업 목록 ({images.length}장)
        </h2>
        <button
          onClick={clearAll}
          className="text-xs text-text-secondary hover:text-error transition-colors"
        >
          전체 삭제
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}
