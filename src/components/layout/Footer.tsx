import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white py-6">
      <div className="mx-auto max-w-5xl px-4 space-y-4">
        {/* Navigation links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
          <Link to="/" className="hover:text-primary transition-colors">
            누끼 도구
          </Link>
          <Link to="/guide" className="hover:text-primary transition-colors">
            사용 가이드
          </Link>
          <Link to="/about" className="hover:text-primary transition-colors">
            서비스 소개
          </Link>
          <Link to="/faq" className="hover:text-primary transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="text-center text-xs text-text-secondary space-y-1">
          <p className="font-medium">
            모든 사진은 브라우저에서만 처리됩니다. 서버로 전송되지 않습니다.
          </p>
          <p>
            누끼따 &copy; {new Date().getFullYear()} &middot; AI 모델:{" "}
            <a
              href="https://huggingface.co/ZhengPeng7/BiRefNet_lite"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              BiRefNet Lite
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
