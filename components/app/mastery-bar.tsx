export function MasteryBar({ percent, color, label }: { percent: number; color: string; label: string }) {
  return (
    <div
      role="meter"
      aria-label={`${label} mastery`}
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-2 overflow-hidden rounded-full bg-muted"
    >
      <div className="h-full rounded-full" style={{ width: `${percent}%`, background: color }} />
    </div>
  );
}
