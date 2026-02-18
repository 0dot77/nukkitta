import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { DropZone } from "./components/upload/DropZone";
import { PasteHandler } from "./components/upload/PasteHandler";
import { ImageQueue } from "./components/processing/ImageQueue";
import { ProgressBar } from "./components/processing/ProgressBar";
import { BeforeAfter } from "./components/preview/BeforeAfter";
import { ExportPanel } from "./components/export/ExportPanel";
import { BatchDownload } from "./components/export/BatchDownload";
import { AdBanner } from "./components/layout/AdBanner";
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
    <>
      <PasteHandler onPasted={handleFilesAdded} />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 space-y-6">
        {/* Model loading indicator */}
        {model.status === "loading" && (
          <div className="rounded-xl border border-primary/20 bg-primary-light p-4">
            <p className="mb-2 text-sm font-medium text-primary">
              {model.progressText || "AI 모델 준비 중..."}
            </p>
            <ProgressBar progress={model.progress} />
            <p className="mt-2 text-xs text-primary/70">
              첫 방문 시 AI 모델을 다운로드합니다. 이후 브라우저 캐시를 사용합니다.
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

        {/* Ad: below upload area */}
        <AdBanner slot="1234567890" format="horizontal" />

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
              <ExportPanel />
              <BatchDownload />
            </div>
          </div>
        )}

        {/* Empty state: enriched content */}
        {!hasImages && (
          <div className="space-y-10">
            {/* Hero CTA */}
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
                  무제한 무료
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

            {/* Feature cards */}
            <section>
              <h3 className="mb-4 text-center text-lg font-bold text-text-primary">
                왜 누끼따인가요?
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-white p-5 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-lg">
                    🔒
                  </div>
                  <h4 className="mb-1 text-sm font-semibold text-text-primary">
                    100% 브라우저 처리
                  </h4>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    이미지가 서버로 전송되지 않아 개인정보와 영업 비밀이
                    완벽하게 보호됩니다.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-white p-5 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-lg">
                    ✨
                  </div>
                  <h4 className="mb-1 text-sm font-semibold text-text-primary">
                    전문 수준 결과물
                  </h4>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    최신 AI 모델(BiRefNet)이 머리카락, 반투명 소재까지
                    정밀하게 분리합니다.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-white p-5 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-lg">
                    📦
                  </div>
                  <h4 className="mb-1 text-sm font-semibold text-text-primary">
                    대량 처리 지원
                  </h4>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    여러 장을 동시에 업로드하고 결과를 ZIP으로 일괄
                    다운로드하세요.
                  </p>
                </div>
              </div>
            </section>

            {/* How to use */}
            <section>
              <h3 className="mb-4 text-center text-lg font-bold text-text-primary">
                이렇게 사용하세요
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    step: "1",
                    title: "이미지 업로드",
                    desc: "드래그&드롭, 파일 선택, 클립보드 붙여넣기(Ctrl+V)로 이미지를 추가하세요.",
                  },
                  {
                    step: "2",
                    title: "자동 배경 제거",
                    desc: "AI가 즉시 배경을 분석하고 제거합니다. 마스크 정밀도와 그림자를 조절할 수 있습니다.",
                  },
                  {
                    step: "3",
                    title: "다운로드",
                    desc: "PNG(투명) 또는 JPEG(흰색 배경)로 저장하세요. 여러 장은 ZIP으로 일괄 다운로드됩니다.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="rounded-xl border border-border bg-white p-5"
                  >
                    <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      {item.step}
                    </div>
                    <h4 className="mb-1 text-sm font-semibold text-text-primary">
                      {item.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-text-secondary">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-text-secondary">
                더 자세한 사용법은{" "}
                <Link to="/guide" className="text-primary underline hover:text-primary-hover">
                  사용 가이드
                </Link>
                를 확인하세요.
              </p>
            </section>
          </div>
        )}

        {/* Ad: above footer */}
        <AdBanner slot="0987654321" format="horizontal" />
      </main>
    </>
  );
}
