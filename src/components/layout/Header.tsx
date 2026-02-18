import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";

const navLinks = [
  { to: "/", label: "누끼 도구" },
  { to: "/guide", label: "사용 가이드" },
  { to: "/about", label: "서비스 소개" },
  { to: "/faq", label: "FAQ" },
];

export function Header() {
  const device = useAppStore((s) => s.model.device);
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
            N
          </div>
          <h1 className="text-lg font-bold text-text-primary">누끼따</h1>
          <span className="text-xs text-text-secondary hidden sm:inline">AI 배경 제거</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                pathname === link.to
                  ? "bg-primary-light font-semibold text-primary"
                  : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: device badge + mobile menu button */}
        <div className="flex items-center gap-3">
          {device && (
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-xs text-primary font-medium">
              {device === "webgpu" ? "GPU 가속" : "WASM"}
            </span>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-hover md:hidden"
            aria-label="메뉴"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="border-t border-border px-4 py-2 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                pathname === link.to
                  ? "bg-primary-light font-semibold text-primary"
                  : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
