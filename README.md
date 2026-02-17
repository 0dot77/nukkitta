# 누끼따 (NukkiTta)

**쇼핑몰 셀러를 위한 AI 배경 제거 도구**

상품 사진을 드래그하면 AI가 자동으로 배경을 제거합니다.
모든 처리는 브라우저에서 이루어지며 사진이 서버로 전송되지 않습니다.

**[nukkitta.pages.dev](https://nukkitta.pages.dev)**

## 주요 기능

- **AI 배경 제거** — RMBG-1.4 모델, WebGPU 가속 (WASM 폴백)
- **마스크 보정** — Threshold / Erosion / Feathering 슬라이더로 미세 조정
- **그림자 추가** — Drop shadow + Contact shadow, 실시간 프리뷰
- **일괄 처리** — 여러 장 한번에 업로드, ZIP 다운로드
- **PNG / JPEG 내보내기** — 투명 배경 또는 커스텀 배경색
- **100% 클라이언트** — 서버 업로드 없음, 개인정보 안전

## remove.bg와 비교

| | 누끼따 | remove.bg |
|---|---|---|
| 무료 | 하루 50장 | 1장 (저해상도) |
| 고해상도 | 제한 없음 | 유료만 |
| 일괄 처리 | 무료 | 유료만 |
| 그림자 | 무료 | 유료만 |
| 개인정보 | 브라우저 처리 | 서버 업로드 |

## 기술 스택

- React 19 + Vite 6 + TypeScript
- Tailwind CSS v4
- Zustand (상태관리)
- `@huggingface/transformers` + RMBG-1.4
- WebGPU / WASM
- Canvas 2D API (그림자, 마스크)
- JSZip + FileSaver.js (내보내기)
- Cloudflare Pages (배포)

## 로컬 실행

```bash
git clone https://github.com/0dot77/nukkitta.git
cd nukkitta
npm install
npm run dev
```

http://localhost:5173 에서 확인

## 배포

```bash
npm run build
npx wrangler pages deploy dist --project-name=nukkitta
```

## 프로젝트 구조

```
src/
├── engine/         # AI 추론, 마스크 보정, 그림자, 내보내기
├── store/          # Zustand 스토어 (앱 상태, 설정)
├── hooks/          # 모델 로딩, 이미지 처리, 쿼터
├── components/
│   ├── layout/     # Header, Footer, AdBanner
│   ├── upload/     # DropZone, PasteHandler
│   ├── processing/ # ImageQueue, ImageCard, ProgressBar
│   ├── preview/    # BeforeAfter, BackgroundPicker
│   ├── export/     # ExportPanel, ShadowControls, MaskControls
│   └── pricing/    # PricingBanner
├── utils/          # 캔버스, 파일, 쿼터 유틸리티
└── types/          # TypeScript 인터페이스
```

## 라이선스

MIT
