import { AdBanner } from "../components/layout/AdBanner";
import { usePageMeta } from "../hooks/usePageMeta";

export default function GuidePage() {
  usePageMeta(
    "사용 가이드",
    "누끼따 사용법을 단계별로 안내합니다. 이미지 업로드부터 마스크 조절, 그림자 추가, 내보내기까지 모든 기능을 알아보세요.",
  );

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 space-y-12">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-3xl font-bold text-text-primary">사용 가이드</h1>
        <p className="mt-4 text-base text-text-secondary">
          누끼따의 모든 기능을 단계별로 안내합니다.
        </p>
      </section>

      {/* Getting started */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-text-primary">
          시작하기
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-text-secondary">
          누끼따는 3단계만으로 배경이 제거된 이미지를 얻을 수 있습니다. 별도의
          회원가입이나 프로그램 설치가 필요 없으며, 사용 횟수 제한 없이 웹
          브라우저만 있으면 됩니다.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "사이트 접속",
              desc: "누끼따 홈페이지에 접속합니다. 첫 방문 시 AI 모델(약 45MB)이 자동으로 다운로드되며, 이후에는 브라우저 캐시를 사용하여 빠르게 로딩됩니다.",
            },
            {
              step: "2",
              title: "이미지 업로드",
              desc: "드래그&드롭, 클릭하여 파일 선택, 또는 Ctrl+V(클립보드 붙여넣기)로 이미지를 추가합니다. JPG, PNG, WebP 형식을 지원하며 여러 장을 동시에 업로드할 수 있습니다.",
            },
            {
              step: "3",
              title: "자동 처리 & 다운로드",
              desc: "업로드 즉시 AI가 배경을 제거합니다. 완료된 이미지를 확인하고 개별 또는 일괄 다운로드할 수 있습니다.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-xl border border-border bg-white p-6"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {item.step}
              </div>
              <h3 className="mb-2 text-base font-semibold text-text-primary">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mask control */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-text-primary">
          마스크 정밀도 조절
        </h2>
        <div className="rounded-xl border border-border bg-white p-6 space-y-4">
          <p className="text-sm leading-relaxed text-text-secondary">
            AI가 생성한 배경 제거 마스크의 경계를 세밀하게 조절할 수 있습니다.
            이미지 처리 완료 후 내보내기 패널에서 마스크 컨트롤을 사용합니다.
          </p>
          <div className="space-y-3">
            <div className="rounded-lg bg-surface p-4">
              <h4 className="mb-1 text-sm font-semibold text-text-primary">
                임계값 (Threshold)
              </h4>
              <p className="text-sm text-text-secondary">
                배경과 피사체를 구분하는 기준값입니다. 값을 높이면 더 많은
                영역이 제거되고, 낮추면 더 많은 영역이 보존됩니다. 기본값은
                대부분의 이미지에 적합하지만, 복잡한 배경이나 반투명 소재가
                있는 경우 조절하면 더 나은 결과를 얻을 수 있습니다.
              </p>
            </div>
            <div className="rounded-lg bg-surface p-4">
              <h4 className="mb-1 text-sm font-semibold text-text-primary">
                블러 (Blur)
              </h4>
              <p className="text-sm text-text-secondary">
                마스크 경계에 부드러운 페더링 효과를 적용합니다. 값을 높이면
                경계가 더 부드러워져 자연스러운 합성에 유리하고, 0으로 설정하면
                선명한 경계를 유지합니다.
              </p>
            </div>
            <div className="rounded-lg bg-surface p-4">
              <h4 className="mb-1 text-sm font-semibold text-text-primary">
                오프셋 (Offset)
              </h4>
              <p className="text-sm text-text-secondary">
                마스크 경계를 안쪽 또는 바깥쪽으로 확장합니다. 양수 값은
                마스크를 축소하여 피사체 주변의 배경 잔여물을 제거하고, 음수
                값은 마스크를 확장하여 잘려나간 부분을 복구합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shadow */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-text-primary">
          그림자 설정
        </h2>
        <div className="rounded-xl border border-border bg-white p-6 space-y-4">
          <p className="text-sm leading-relaxed text-text-secondary">
            배경을 제거한 이미지에 자연스러운 그림자를 추가하여 쇼핑몰 상품
            사진의 완성도를 높일 수 있습니다. 내보내기 패널에서 그림자 옵션을
            활성화합니다.
          </p>
          <div className="space-y-3">
            <div className="rounded-lg bg-surface p-4">
              <h4 className="mb-1 text-sm font-semibold text-text-primary">
                그림자 크기
              </h4>
              <p className="text-sm text-text-secondary">
                그림자의 퍼짐 정도를 조절합니다. 값이 클수록 더 넓고 부드러운
                그림자가 생성됩니다.
              </p>
            </div>
            <div className="rounded-lg bg-surface p-4">
              <h4 className="mb-1 text-sm font-semibold text-text-primary">
                그림자 투명도
              </h4>
              <p className="text-sm text-text-secondary">
                그림자의 진하기를 조절합니다. 0%는 투명, 100%는 완전 불투명한
                그림자를 만듭니다. 상품 사진에는 20~40% 정도가 자연스럽습니다.
              </p>
            </div>
            <div className="rounded-lg bg-surface p-4">
              <h4 className="mb-1 text-sm font-semibold text-text-primary">
                그림자 위치
              </h4>
              <p className="text-sm text-text-secondary">
                그림자의 X, Y 방향 오프셋을 설정합니다. 양수 값은 오른쪽/아래,
                음수 값은 왼쪽/위 방향으로 이동합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AdBanner slot="3456789012" format="horizontal" />

      {/* Export */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-text-primary">
          내보내기 옵션
        </h2>
        <div className="rounded-xl border border-border bg-white p-6 space-y-4">
          <p className="text-sm leading-relaxed text-text-secondary">
            배경이 제거된 이미지를 다양한 형식으로 저장할 수 있습니다. 용도에
            맞는 형식을 선택하세요.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-surface p-4">
              <h4 className="mb-1 text-sm font-semibold text-text-primary">
                PNG (투명 배경)
              </h4>
              <p className="text-sm text-text-secondary">
                투명 배경을 유지한 채 저장합니다. 쇼핑몰 상세 페이지, 배너
                디자인 등 합성 작업에 최적입니다. 파일 크기가 다소 크지만 품질
                손실이 없습니다.
              </p>
            </div>
            <div className="rounded-lg bg-surface p-4">
              <h4 className="mb-1 text-sm font-semibold text-text-primary">
                JPEG (흰색 배경)
              </h4>
              <p className="text-sm text-text-secondary">
                흰색 배경으로 저장합니다. 파일 크기가 작아 웹 업로드에
                유리합니다. 품질을 조절하여 용량과 화질의 균형을 맞출 수
                있습니다. 마켓플레이스 등록에 적합합니다.
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-text-secondary">
            여러 장의 이미지를 처리한 경우 <strong>일괄 다운로드</strong>{" "}
            기능으로 모든 결과물을 ZIP 파일로 한 번에 받을 수 있습니다.
          </p>
        </div>
      </section>

      {/* Tips */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-text-primary">
          최적의 결과를 위한 팁
        </h2>
        <div className="space-y-3">
          {[
            {
              title: "고해상도 이미지 사용",
              desc: "해상도가 높을수록 AI가 피사체와 배경의 경계를 더 정밀하게 인식합니다. 가능하면 원본 크기의 이미지를 사용하세요.",
            },
            {
              title: "피사체와 배경의 대비",
              desc: "피사체와 배경 색상의 대비가 클수록 더 정확한 결과를 얻을 수 있습니다. 배경이 단순할수록 좋습니다.",
            },
            {
              title: "Chrome / Edge 브라우저 권장",
              desc: "WebGPU를 지원하는 Chrome 또는 Edge 최신 버전에서 가장 빠른 처리 속도를 경험할 수 있습니다.",
            },
            {
              title: "마스크 미세 조정 활용",
              desc: "자동 결과가 완벽하지 않다면 임계값과 블러, 오프셋을 조절하여 최적의 결과를 찾아보세요.",
            },
            {
              title: "배경색 미리보기 확인",
              desc: "흰색, 검정, 체크무늬 등 다양한 배경색으로 미리보기하여 결과물이 실제 사용 환경에서 어떻게 보이는지 확인하세요.",
            },
          ].map((tip) => (
            <div
              key={tip.title}
              className="flex items-start gap-3 rounded-lg border border-border bg-white p-4"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success text-xs text-white">
                ✓
              </span>
              <div>
                <strong className="text-sm font-semibold text-text-primary">
                  {tip.title}
                </strong>
                <p className="mt-0.5 text-sm text-text-secondary">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
