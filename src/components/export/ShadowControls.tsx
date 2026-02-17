import { useSettingsStore } from "../../store/useSettingsStore";

export function ShadowControls() {
  const { shadow, setShadow } = useSettingsStore();

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <label className="text-xs font-medium text-text-secondary">
          그림자
        </label>
        <button
          onClick={() => setShadow({ enabled: !shadow.enabled })}
          className={`
            relative h-5 w-9 rounded-full transition-colors
            ${shadow.enabled ? "bg-primary" : "bg-border"}
          `}
        >
          <span
            className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all"
            style={{ left: shadow.enabled ? "18px" : "2px" }}
          />
        </button>
      </div>

      {shadow.enabled && (
        <div className="space-y-2 rounded-lg bg-surface p-3">
          <div>
            <label className="mb-1 flex items-center justify-between text-[11px] text-text-secondary">
              <span>블러</span>
              <span>{shadow.blur}px</span>
            </label>
            <input
              type="range"
              min={0}
              max={40}
              value={shadow.blur}
              onChange={(e) => setShadow({ blur: Number(e.target.value) })}
              className="w-full accent-primary"
            />
          </div>
          <div>
            <label className="mb-1 flex items-center justify-between text-[11px] text-text-secondary">
              <span>Y 오프셋</span>
              <span>{shadow.offsetY}px</span>
            </label>
            <input
              type="range"
              min={-20}
              max={20}
              value={shadow.offsetY}
              onChange={(e) => setShadow({ offsetY: Number(e.target.value) })}
              className="w-full accent-primary"
            />
          </div>
          <div>
            <label className="mb-1 flex items-center justify-between text-[11px] text-text-secondary">
              <span>투명도</span>
              <span>{Math.round(shadow.opacity * 100)}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(shadow.opacity * 100)}
              onChange={(e) =>
                setShadow({ opacity: Number(e.target.value) / 100 })
              }
              className="w-full accent-primary"
            />
          </div>
        </div>
      )}
    </div>
  );
}
