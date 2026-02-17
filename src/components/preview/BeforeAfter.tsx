import { useRef, useState, useCallback } from "react";
import type { ImageItem } from "../../types";
import { useSettingsStore } from "../../store/useSettingsStore";

interface BeforeAfterProps {
  image: ImageItem;
}

export function BeforeAfter({ image }: BeforeAfterProps) {
  const [splitPos, setSplitPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const shadow = useSettingsStore((s) => s.shadow);
  const background = useSettingsStore((s) => s.background);
  const backgroundColor = useSettingsStore((s) => s.backgroundColor);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !dragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSplitPos(pct);
  }, []);

  const handlePointerDown = () => {
    dragging.current = true;
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    handleMove(e.clientX);
  };

  if (!image.resultUrl) return null;

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full overflow-hidden rounded-xl border border-border cursor-col-resize select-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      {/* Original (full) */}
      <img
        src={image.originalUrl}
        alt="원본"
        className="absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />

      {/* Result (clipped) */}
      <div
        className={`absolute inset-0 overflow-hidden ${
          background === "transparent" ? "checkerboard" : ""
        }`}
        style={{
          clipPath: `inset(0 ${100 - splitPos}% 0 0)`,
          ...(background !== "transparent"
            ? {
                backgroundColor:
                  background === "white" ? "#ffffff" : backgroundColor,
              }
            : {}),
        }}
      >
        <img
          src={image.resultUrl}
          alt="결과"
          className="h-full w-full object-contain transition-[filter] duration-200"
          style={
            shadow.enabled
              ? {
                  filter: `drop-shadow(${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px rgba(0,0,0,${shadow.opacity}))`,
                }
              : undefined
          }
          draggable={false}
        />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
        style={{ left: `${splitPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md text-xs font-bold text-text-secondary">
          &#x2194;
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
        원본
      </span>
      <span className="absolute top-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
        누끼
      </span>
    </div>
  );
}
