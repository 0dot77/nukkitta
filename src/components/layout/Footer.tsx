export function Footer() {
  return (
    <footer className="border-t border-border bg-white py-6">
      <div className="mx-auto max-w-5xl px-4 text-center text-xs text-text-secondary space-y-1">
        <p className="font-medium">
          모든 사진은 브라우저에서만 처리됩니다. 서버로 전송되지 않습니다.
        </p>
        <p>
          누끼따 &copy; {new Date().getFullYear()} &middot; AI 모델:{" "}
          <a
            href="https://huggingface.co/briaai/RMBG-1.4"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            RMBG-1.4
          </a>
        </p>
      </div>
    </footer>
  );
}
