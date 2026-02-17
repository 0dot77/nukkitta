interface ProgressBarProps {
  progress: number;
  text?: string;
  className?: string;
}

export function ProgressBar({ progress, text, className = "" }: ProgressBarProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-1">
        {text && <span className="text-xs text-text-secondary">{text}</span>}
        <span className="text-xs font-medium text-text-secondary">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}
