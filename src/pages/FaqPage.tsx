import { AdBanner } from "../components/layout/AdBanner";
import { usePageMeta } from "../hooks/usePageMeta";

const faqs = [
  {
    q: "누끼따는 정말 무료인가요?",
    a: "네, 누끼따는 완전 무료로 이용할 수 있으며 사용 횟수 제한도 없습니다. 회원가입도 필요 없습니다. 브라우저에서 직접 처리하는 방식이라 서버 비용이 들지 않아 무제한 무료 제공이 가능합니다.",
  },
  {
    q: "이미지가 서버로 전송되나요?",
    a: "아닙니다. 누끼따의 가장 큰 특징은 모든 이미지 처리가 사용자의 브라우저에서 직접 수행된다는 점입니다. AI 모델이 브라우저에 다운로드되어 로컬에서 실행되므로 이미지가 외부 서버로 전송되지 않습니다. 상품 사진, 개인 사진 등 민감한 이미지를 안심하고 처리할 수 있습니다.",
  },
  {
    q: "어떤 이미지 형식을 지원하나요?",
    a: "JPEG(JPG), PNG, WebP 형식을 지원합니다. 이 형식들은 웹에서 가장 널리 사용되는 이미지 형식으로, 스마트폰 사진, 디지털 카메라 사진, 스크린샷 등 대부분의 이미지를 처리할 수 있습니다. 결과물은 PNG(투명 배경) 또는 JPEG(흰색 배경)로 저장할 수 있습니다.",
  },
  {
    q: "처리 속도는 얼마나 걸리나요?",
    a: "처리 속도는 사용자의 기기 사양에 따라 달라집니다. WebGPU를 지원하는 브라우저(Chrome, Edge 최신 버전)에서는 GPU 가속을 통해 이미지당 약 1~3초 내에 처리됩니다. WebGPU가 지원되지 않는 경우 WASM으로 자동 전환되며, 이 경우 5~15초 정도 소요될 수 있습니다. 첫 방문 시 AI 모델 다운로드에 추가 시간이 필요하지만 이후에는 캐시를 사용합니다.",
  },
  {
    q: "마스크 정밀도를 조절할 수 있나요?",
    a: "네, 임계값(Threshold), 블러(Blur), 오프셋(Offset) 세 가지 옵션으로 마스크를 세밀하게 조절할 수 있습니다. 임계값으로 배경 제거 범위를, 블러로 경계의 부드러움을, 오프셋으로 마스크 확장/축소를 조절합니다. 실시간 미리보기를 통해 최적의 설정을 찾을 수 있습니다.",
  },
  {
    q: "그림자를 추가할 수 있나요?",
    a: "네, 배경 제거 후 자연스러운 드롭 쉐도우를 추가할 수 있습니다. 그림자의 크기, 투명도, 위치(X/Y 오프셋)를 자유롭게 조절하여 쇼핑몰 상품 사진에 입체감과 현실감을 더할 수 있습니다. 그림자 설정도 실시간 미리보기로 확인할 수 있습니다.",
  },
  {
    q: "어떤 브라우저에서 사용할 수 있나요?",
    a: "대부분의 최신 브라우저에서 사용할 수 있습니다. 최적의 성능(GPU 가속)을 위해 Chrome 113 이상 또는 Edge 113 이상을 권장합니다. Firefox, Safari에서도 WASM 모드로 작동하지만 처리 속도가 다소 느릴 수 있습니다. Internet Explorer는 지원하지 않습니다.",
  },
  {
    q: "모바일에서도 사용할 수 있나요?",
    a: "기술적으로 모바일 브라우저에서도 접속은 가능합니다. 다만 AI 모델의 연산에 상당한 메모리와 처리 능력이 필요하여 모바일 환경에서는 속도가 느리거나 메모리 부족으로 처리가 실패할 수 있습니다. 최적의 경험을 위해 데스크톱 환경(PC, 노트북)을 권장합니다.",
  },
  {
    q: "여러 장의 이미지를 한 번에 다운로드할 수 있나요?",
    a: "네, 일괄 다운로드 기능을 제공합니다. 여러 장의 이미지를 처리한 후 '일괄 다운로드' 버튼을 클릭하면 모든 결과물이 ZIP 파일로 압축되어 한 번에 다운로드됩니다. 개별 이미지를 하나씩 다운로드할 수도 있습니다.",
  },
  {
    q: "쇼핑몰 마켓플레이스에 바로 사용할 수 있나요?",
    a: "네, 누끼따로 처리한 이미지는 네이버 스마트스토어, 쿠팡, 11번가 등 주요 마켓플레이스의 상품 등록 요구사항에 맞게 사용할 수 있습니다. JPEG(흰색 배경)로 내보내면 대부분의 마켓플레이스 가이드라인에 부합하며, PNG(투명 배경)로 저장하면 상세 페이지 디자인에 활용할 수 있습니다.",
  },
];

export default function FaqPage() {
  usePageMeta(
    "자주 묻는 질문",
    "누끼따에 대해 자주 묻는 질문과 답변입니다. 무료 이용, 개인정보 보호, 지원 형식, 처리 속도 등 궁금한 점을 확인하세요.",
  );

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 space-y-12">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-3xl font-bold text-text-primary">
          자주 묻는 질문
        </h1>
        <p className="mt-4 text-base text-text-secondary">
          누끼따 사용에 대해 궁금한 점을 확인하세요.
        </p>
      </section>

      {/* FAQ list */}
      <section className="space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded-xl border border-border bg-white"
          >
            <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-semibold text-text-primary hover:bg-surface-hover transition-colors rounded-xl">
              <span>{faq.q}</span>
              <span className="ml-4 shrink-0 text-text-secondary transition-transform group-open:rotate-180">
                ▼
              </span>
            </summary>
            <div className="px-6 pb-4">
              <p className="text-sm leading-relaxed text-text-secondary">
                {faq.a}
              </p>
            </div>
          </details>
        ))}
      </section>

      <AdBanner slot="4567890123" format="horizontal" />

      {/* Contact CTA */}
      <section className="rounded-xl border border-border bg-white p-6 text-center">
        <h2 className="mb-2 text-lg font-bold text-text-primary">
          원하는 답변을 찾지 못하셨나요?
        </h2>
        <p className="text-sm text-text-secondary">
          추가 문의사항이 있으시면 이메일로 연락해주세요.
        </p>
      </section>
    </main>
  );
}
