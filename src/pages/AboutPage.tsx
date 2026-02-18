import { AdBanner } from "../components/layout/AdBanner";
import { usePageMeta } from "../hooks/usePageMeta";

export default function AboutPage() {
  usePageMeta(
    "서비스 소개",
    "누끼따는 AI 기반 배경 제거 서비스입니다. 브라우저에서 바로 처리되어 개인정보가 안전하며, 전문 수준의 누끼 결과물을 무료로 제공합니다.",
  );

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 space-y-12">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-3xl font-bold text-text-primary">
          누끼따란?
        </h1>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          누끼따는 인공지능(AI)을 활용하여 이미지 배경을 자동으로 제거하는 웹
          서비스입니다. 별도의 프로그램 설치 없이 브라우저에서 바로 사용할 수
          있으며, 모든 이미지 처리는 사용자의 기기에서 직접 수행되어 개인정보가
          외부 서버로 전송되지 않습니다.
        </p>
      </section>

      {/* Why nukkitta */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-text-primary">
          왜 누끼따인가요?
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-white p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-lg">
              🔒
            </div>
            <h3 className="mb-2 text-base font-semibold text-text-primary">
              100% 브라우저 처리
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              이미지가 서버로 전송되지 않습니다. AI 모델이 브라우저에서 직접
              실행되므로 개인정보와 영업 비밀이 완벽하게 보호됩니다. 인터넷
              연결이 불안정한 환경에서도 안정적으로 작동합니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-lg">
              ✨
            </div>
            <h3 className="mb-2 text-base font-semibold text-text-primary">
              전문 수준 결과물
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              최신 AI 모델(BiRefNet Lite)을 사용하여 머리카락, 반투명 소재 등
              복잡한 영역도 정밀하게 분리합니다. 마스크 정밀도 조절과 자연스러운
              그림자 추가로 쇼핑몰 상품 사진에 최적화된 결과를 제공합니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-lg">
              🎁
            </div>
            <h3 className="mb-2 text-base font-semibold text-text-primary">
              무료 & 간편
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              회원가입 없이 무제한 무료로 이용할 수 있습니다.
              드래그&드롭 또는 클립보드 붙여넣기만으로 즉시 배경 제거가
              시작됩니다. 복잡한 설정이나 학습 과정이 필요 없습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Target users */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-text-primary">
          이런 분들에게 추천합니다
        </h2>
        <ul className="space-y-3">
          {[
            {
              emoji: "🛒",
              title: "쇼핑몰 셀러",
              desc: "상품 사진 배경을 빠르게 제거하여 깔끔한 상세 페이지를 만들고 싶은 분",
            },
            {
              emoji: "📸",
              title: "사진 작가 / 디자이너",
              desc: "포토샵 없이 빠르게 누끼 작업이 필요한 분",
            },
            {
              emoji: "📱",
              title: "SNS 마케터",
              desc: "인스타그램, 블로그용 이미지에서 배경을 제거하고 싶은 분",
            },
            {
              emoji: "🎓",
              title: "학생 / 일반 사용자",
              desc: "발표 자료, 프로필 사진 등 일상적인 이미지 편집이 필요한 분",
            },
            {
              emoji: "🏢",
              title: "중소기업",
              desc: "비용 부담 없이 대량의 상품 이미지를 처리해야 하는 기업",
            },
          ].map((item) => (
            <li
              key={item.title}
              className="flex items-start gap-3 rounded-lg border border-border bg-white p-4"
            >
              <span className="text-xl">{item.emoji}</span>
              <div>
                <strong className="text-sm font-semibold text-text-primary">
                  {item.title}
                </strong>
                <p className="mt-0.5 text-sm text-text-secondary">
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <AdBanner slot="2345678901" format="horizontal" />

      {/* Technology */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-text-primary">
          사용 기술
        </h2>
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left font-semibold text-text-primary">
                  기술
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text-primary">
                  설명
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-medium text-text-primary">
                  BiRefNet Lite
                </td>
                <td className="px-4 py-3 text-text-secondary">
                  MIT 라이선스의 고정밀 이미지 분할 AI 모델로, 다양한 이미지
                  유형에서 높은 정확도의 배경 제거를 제공합니다.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-text-primary">
                  WebGPU / WASM
                </td>
                <td className="px-4 py-3 text-text-secondary">
                  GPU 가속(WebGPU)을 우선 사용하고, 미지원 브라우저에서는
                  WebAssembly(WASM)로 자동 전환하여 호환성을 보장합니다.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-text-primary">
                  ONNX Runtime Web
                </td>
                <td className="px-4 py-3 text-text-secondary">
                  브라우저에서 AI 모델을 실행하기 위한 런타임으로, 서버 없이도
                  고성능 추론이 가능합니다.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-text-primary">
                  React + Vite
                </td>
                <td className="px-4 py-3 text-text-secondary">
                  빠른 개발과 최적화된 빌드를 위한 모던 프론트엔드 스택입니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
