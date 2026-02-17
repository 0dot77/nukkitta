import { useDailyQuota } from "../../hooks/useDailyQuota";

export function PricingBanner() {
  const { used, remaining, limit } = useDailyQuota();

  const percentage = (used / limit) * 100;
  const isLow = remaining <= 10;
  const isExhausted = remaining === 0;

  return (
    <div
      className={`
        rounded-xl border p-4 transition-colors
        ${
          isExhausted
            ? "border-error/30 bg-red-50"
            : isLow
              ? "border-warning/30 bg-amber-50"
              : "border-border bg-white"
        }
      `}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-text-primary">
          오늘의 무료 이용량
        </span>
        <span
          className={`text-sm font-bold ${
            isExhausted
              ? "text-error"
              : isLow
                ? "text-warning"
                : "text-primary"
          }`}
        >
          {remaining}/{limit}장 남음
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-border">
        <div
          className={`h-full rounded-full transition-all ${
            isExhausted
              ? "bg-error"
              : isLow
                ? "bg-warning"
                : "bg-primary"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {isExhausted ? (
        <p className="text-xs text-error">
          오늘의 무료 한도를 모두 사용했습니다. 내일 자정(KST)에 초기화됩니다.
        </p>
      ) : isLow ? (
        <p className="text-xs text-text-secondary">
          무료 한도가 얼마 남지 않았습니다.
        </p>
      ) : null}

      <div className="mt-3 rounded-lg bg-primary-light p-3">
        <p className="text-xs font-medium text-primary">
          무제한 이용: 월 4,900원
        </p>
        <p className="mt-0.5 text-[11px] text-primary/70">
          하루 50장 제한 없이 무제한으로 사용하세요 (준비 중)
        </p>
      </div>
    </div>
  );
}
