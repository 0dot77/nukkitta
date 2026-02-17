import { useRef, useCallback } from "react";
import { useSettingsStore } from "../../store/useSettingsStore";
import { useImageProcessor } from "../../hooks/useImageProcessor";

export function MaskControls() {
  const { mask, setMask } = useSettingsStore();
  const { reprocessAll } = useImageProcessor();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleChange = useCallback(
    (update: Partial<typeof mask>) => {
      setMask(update);
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        reprocessAll();
      }, 300);
    },
    [setMask, reprocessAll]
  );

  return (
    <div>
      <h4 className="mb-2 text-xs font-medium text-text-secondary">
        마스크 보정
      </h4>
      <div className="space-y-2 rounded-lg bg-surface p-3">
        <div>
          <label className="mb-1 flex items-center justify-between text-[11px] text-text-secondary">
            <span>경계값 (Threshold)</span>
            <span>{mask.threshold}</span>
          </label>
          <input
            type="range"
            min={0}
            max={255}
            value={mask.threshold}
            onChange={(e) =>
              handleChange({ threshold: Number(e.target.value) })
            }
            className="w-full accent-primary"
          />
          <p className="mt-0.5 text-[10px] text-text-secondary/60">
            높을수록 반투명 잔여물 제거 (기본 128)
          </p>
        </div>

        <div>
          <label className="mb-1 flex items-center justify-between text-[11px] text-text-secondary">
            <span>침식 (Erode)</span>
            <span>{mask.erode}px</span>
          </label>
          <input
            type="range"
            min={0}
            max={5}
            step={1}
            value={mask.erode}
            onChange={(e) =>
              handleChange({ erode: Number(e.target.value) })
            }
            className="w-full accent-primary"
          />
          <p className="mt-0.5 text-[10px] text-text-secondary/60">
            가장자리 배경색 잔상 제거 (기본 1px)
          </p>
        </div>

        <div>
          <label className="mb-1 flex items-center justify-between text-[11px] text-text-secondary">
            <span>페더링 (Feather)</span>
            <span>{mask.feather}px</span>
          </label>
          <input
            type="range"
            min={0}
            max={5}
            step={1}
            value={mask.feather}
            onChange={(e) =>
              handleChange({ feather: Number(e.target.value) })
            }
            className="w-full accent-primary"
          />
          <p className="mt-0.5 text-[10px] text-text-secondary/60">
            가장자리 부드럽게 (기본 1px)
          </p>
        </div>
      </div>
    </div>
  );
}
