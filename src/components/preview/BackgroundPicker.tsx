import { useSettingsStore } from "../../store/useSettingsStore";
import type { BackgroundType } from "../../types";

const BG_OPTIONS: Array<{ value: BackgroundType; label: string; preview: string }> = [
  { value: "transparent", label: "투명", preview: "checkerboard" },
  { value: "white", label: "흰색", preview: "#ffffff" },
  { value: "custom", label: "커스텀", preview: "custom" },
];

export function BackgroundPicker() {
  const { background, backgroundColor, setBackground, setBackgroundColor } =
    useSettingsStore();

  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-text-secondary">
        배경색
      </label>
      <div className="flex items-center gap-2">
        {BG_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setBackground(opt.value)}
            className={`
              flex h-8 w-8 items-center justify-center rounded-lg border-2 transition-colors
              ${
                background === opt.value
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              }
            `}
          >
            {opt.preview === "checkerboard" ? (
              <div className="checkerboard h-full w-full rounded-md" />
            ) : opt.preview === "custom" ? (
              <div
                className="h-full w-full rounded-md"
                style={{ backgroundColor }}
              />
            ) : (
              <div
                className="h-full w-full rounded-md"
                style={{ backgroundColor: opt.preview }}
              />
            )}
          </button>
        ))}
        {background === "custom" && (
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="h-8 w-8 cursor-pointer rounded border-0"
          />
        )}
        <span className="text-xs text-text-secondary">
          {BG_OPTIONS.find((o) => o.value === background)?.label}
        </span>
      </div>
    </div>
  );
}
