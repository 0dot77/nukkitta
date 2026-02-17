import { useEffect, useRef } from "react";

// TODO: AdSense 승인 후 본인의 퍼블리셔 ID로 교체
const ADSENSE_PUB_ID = "ca-pub-1932451002760068";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "horizontal" | "rectangle";
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdBanner({
  slot,
  format = "auto",
  className = "",
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet
    }
  }, []);

  // Don't render if placeholder ID
  if (ADSENSE_PUB_ID.includes("XXXX")) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg border border-dashed border-border bg-surface py-3 text-xs text-text-secondary ${className}`}
      >
        광고 영역 (AdSense 승인 후 활성화)
      </div>
    );
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle block ${className}`}
      style={{ display: "block" }}
      data-ad-client={ADSENSE_PUB_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
