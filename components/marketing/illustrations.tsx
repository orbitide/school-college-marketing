/** Simple branded scenes used where a photograph would normally go. Replaced automatically by a photo with the same slot name. */
const base = "size-full";
const dark = "#1b3f73", mid = "#2b7a8c", pale = "#cfe0f7", sky = "#e6f0fb", gold = "#f5a623", white = "#ffffff";

function Windows({ x, y, cols, rows, w = 14, h = 16, gap = 10 }: { x: number; y: number; cols: number; rows: number; w?: number; h?: number; gap?: number }) {
  return <>{Array.from({ length: rows }).flatMap((_, r) => Array.from({ length: cols }).map((__, c) => <rect key={`${r}-${c}`} x={x + c * (w + gap)} y={y + r * (h + gap)} width={w} height={h} rx="2" fill={sky} />))}</>;
}

export function SchoolScene() {
  return (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className={base} role="img" aria-hidden>
      <rect width="320" height="180" fill="#dbe9f7" />
      <circle cx="268" cy="38" r="20" fill="#fde9b0" />
      <rect y="146" width="320" height="34" fill="#c3dccf" />
      <rect x="70" y="70" width="180" height="80" fill={dark} />
      <path d="M62 72 L160 28 L258 72 Z" fill={mid} />
      <rect x="146" y="108" width="28" height="42" rx="3" fill={gold} />
      <Windows x={84} y={86} cols={2} rows={1} />
      <Windows x={196} y={86} cols={2} rows={1} />
      <Windows x={84} y={116} cols={2} rows={1} />
      <Windows x={196} y={116} cols={2} rows={1} />
      <rect x="159" y="8" width="2" height="22" fill={white} />
      <path d="M161 8 L180 14 L161 20 Z" fill={gold} />
      <circle cx="40" cy="132" r="18" fill="#7fb89a" /><rect x="38" y="140" width="4" height="12" fill="#5a7f6a" />
      <circle cx="286" cy="134" r="16" fill="#7fb89a" /><rect x="284" y="142" width="4" height="10" fill="#5a7f6a" />
    </svg>
  );
}

export function CollegeScene() {
  return (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className={base} role="img" aria-hidden>
      <rect width="320" height="180" fill="#e3e9fa" />
      <circle cx="52" cy="40" r="18" fill="#fde9b0" />
      <rect y="150" width="320" height="30" fill="#d0dfcf" />
      <path d="M160 18 a22 22 0 0 1 22 22 h-44 a22 22 0 0 1 22 -22 Z" fill={mid} />
      <rect x="157" y="8" width="6" height="12" fill={dark} />
      <path d="M72 78 L160 36 L248 78 Z" fill={dark} />
      <rect x="72" y="78" width="176" height="10" fill={mid} />
      {[92, 124, 156, 188, 220].map((x) => <rect key={x} x={x - 6} y={88} width="12" height="52" fill={white} />)}
      <rect x="64" y="140" width="192" height="8" fill={pale} />
      <rect x="56" y="148" width="208" height="8" fill="#b9cfe9" />
      <rect x="140" y="108" width="40" height="32" fill={dark} opacity="0.12" />
    </svg>
  );
}

export function CampusGroupScene() {
  const pin = (x: number, y: number) => <g key={`${x}-${y}`}><circle cx={x} cy={y} r="9" fill={gold} /><circle cx={x} cy={y} r="3.5" fill={white} /></g>;
  return (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className={base} role="img" aria-hidden>
      <rect width="320" height="180" fill="#dff1ed" />
      <rect y="150" width="320" height="30" fill="#c6e0d3" />
      <rect x="30" y="86" width="64" height="64" fill={dark} /><Windows x={40} y={98} cols={3} rows={2} w={11} h={12} gap={5} />
      <rect x="128" y="52" width="64" height="98" fill={mid} /><Windows x={138} y={64} cols={3} rows={4} w={11} h={12} gap={5} />
      <rect x="226" y="100" width="64" height="50" fill={dark} /><Windows x={236} y={110} cols={3} rows={1} w={11} h={12} gap={5} />
      <path d="M62 70 Q160 20 258 84" fill="none" stroke={dark} strokeWidth="2" strokeDasharray="4 5" />
      {pin(62, 70)}{pin(160, 36)}{pin(258, 84)}
    </svg>
  );
}
