import { useAppStore } from "../../store/useAppStore";

export function Header() {
  const device = useAppStore((s) => s.model.device);

  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
            N
          </div>
          <h1 className="text-lg font-bold text-text-primary">누끼따</h1>
          <span className="text-xs text-text-secondary">AI 배경 제거</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-text-secondary">
          {device && (
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-primary font-medium">
              {device === "webgpu" ? "GPU 가속" : "WASM"}
            </span>
          )}
          <span>100% 브라우저 처리</span>
        </div>
      </div>
    </header>
  );
}
