import { useSettingsStore } from "../../store/useSettingsStore";
import { BackgroundPicker } from "../preview/BackgroundPicker";
import { ShadowControls } from "./ShadowControls";
import { MaskControls } from "./MaskControls";
import type { ExportFormat } from "../../types";

export function ExportPanel() {
  const { format, jpegQuality, setFormat, setJpegQuality } =
    useSettingsStore();

  return (
    <div className="space-y-4 rounded-xl border border-border bg-white p-4">
      <h3 className="text-sm font-semibold text-text-primary">내보내기 설정</h3>

      {/* Format */}
      <div>
        <label className="mb-2 block text-xs font-medium text-text-secondary">
          형식
        </label>
        <div className="flex gap-2">
          {(["png", "jpeg"] as ExportFormat[]).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`
                rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors
                ${
                  format === f
                    ? "border-primary bg-primary-light text-primary"
                    : "border-border bg-white text-text-secondary hover:border-primary/50"
                }
              `}
            >
              {f === "png" ? "PNG (투명)" : "JPEG"}
            </button>
          ))}
        </div>
      </div>

      {/* JPEG quality */}
      {format === "jpeg" && (
        <div>
          <label className="mb-1 flex items-center justify-between text-xs text-text-secondary">
            <span className="font-medium">JPEG 퀄리티</span>
            <span>{jpegQuality}%</span>
          </label>
          <input
            type="range"
            min={50}
            max={100}
            value={jpegQuality}
            onChange={(e) => setJpegQuality(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      )}

      <MaskControls />
      <BackgroundPicker />
      <ShadowControls />
    </div>
  );
}
