import { useCallback, useEffect } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { DropZone } from "./components/upload/DropZone";
import { PasteHandler } from "./components/upload/PasteHandler";
import { ImageQueue } from "./components/processing/ImageQueue";
import { ProgressBar } from "./components/processing/ProgressBar";
import { BeforeAfter } from "./components/preview/BeforeAfter";
import { ExportPanel } from "./components/export/ExportPanel";
import { BatchDownload } from "./components/export/BatchDownload";
import { PricingBanner } from "./components/pricing/PricingBanner";
import { useAppStore } from "./store/useAppStore";
import { useImageProcessor } from "./hooks/useImageProcessor";

export default function App() {
  const { processQueue, isProcessing, images } = useImageProcessor();
  const model = useAppStore((s) => s.model);

  const hasImages = images.length > 0;
  const firstDone = images.find((i) => i.status === "done");
  const hasQueued = images.some((i) => i.status === "queued");

  const handleFilesAdded = useCallback(() => {
    // Trigger processing after files are added
    setTimeout(() => processQueue(), 100);
  }, [processQueue]);

  // Auto-process queued images
  useEffect(() => {
    if (hasQueued && !isProcessing) {
      processQueue();
    }
  }, [hasQueued, isProcessing, processQueue]);

  return (
    <div className="flex min-h-screen flex-col">
      <PasteHandler onPasted={handleFilesAdded} />
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 space-y-6">
        {/* Model loading indicator */}
        {model.status === "loading" && (
          <div className="rounded-xl border border-primary/20 bg-primary-light p-4">
            <p className="mb-2 text-sm font-medium text-primary">
              {model.progressText || "AI 모델 준비 중..."}
            </p>
            <ProgressBar progress={model.progress} />
            <p className="mt-2 text-xs text-primary/70">
              첫 방문 시 약 45MB 모델을 다운로드합니다. 이후 브라우저 캐시를 사용합니다.
            </p>
          </div>
        )}

        {model.status === "error" && (
          <div className="rounded-xl border border-error/30 bg-red-50 p-4">
            <p className="text-sm font-medium text-error">
              모델 로딩 실패: {model.error}
            </p>
            <p className="mt-1 text-xs text-error/70">
              페이지를 새로고침한 후 다시 시도해주세요.
            </p>
          </div>
        )}

        {/* Upload area */}
        <DropZone onFilesAdded={handleFilesAdded} />

        {/* Main content layout */}
        {hasImages && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
            <div className="space-y-6">
              {/* Before/After preview */}
              {firstDone && (
                <div>
                  <h2 className="mb-2 text-sm font-semibold text-text-primary">
                    미리보기 (좌우 드래그)
                  </h2>
                  <BeforeAfter image={firstDone} />
                </div>
              )}

              {/* Image queue */}
              <ImageQueue />
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <PricingBanner />
              <ExportPanel />
              <BatchDownload />
            </div>
          </div>
        )}

        {/* Empty state CTA */}
        {!hasImages && (
          <div className="py-8 text-center">
            <h2 className="mb-2 text-xl font-bold text-text-primary">
              쇼핑몰 셀러를 위한 AI 누끼 자동화
            </h2>
            <p className="mx-auto max-w-md text-sm text-text-secondary">
              상품 사진을 업로드하면 AI가 자동으로 배경을 제거합니다.
              서버 업로드 없이 브라우저에서 바로 처리되어 개인정보가 안전합니다.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-text-secondary">
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-success" />
                하루 50장 무료
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-success" />
                서버 업로드 없음
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-success" />
                PNG 투명 배경
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-success" />
                그림자 추가
              </span>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
