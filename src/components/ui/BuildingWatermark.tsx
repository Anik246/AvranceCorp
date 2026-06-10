type Props = { className?: string };

function wins(
  x: number, y: number,
  cols: number, rows: number,
  cw: number, ch: number,
  gX: number, gY: number
) {
  const rects = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rects.push(
        <rect
          key={`${x}-${y}-${r}-${c}`}
          x={x + c * (cw + gX)}
          y={y + r * (ch + gY)}
          width={cw}
          height={ch}
        />
      );
    }
  }
  return rects;
}

export function BuildingWatermark({ className }: Props) {
  return (
    <svg
      viewBox="0 0 900 520"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Ground line */}
      <line x1="0" y1="519" x2="900" y2="519" strokeWidth="1.5" />

      {/* Building A — slim tall */}
      <rect x="60" y="80" width="80" height="440" strokeWidth="1.5" />
      <g strokeWidth="0.7">{wins(72, 100, 2, 13, 22, 18, 12, 12)}</g>

      {/* Building B — wide mid */}
      <rect x="160" y="220" width="145" height="300" strokeWidth="1.5" />
      <g strokeWidth="0.7">{wins(174, 240, 3, 8, 24, 19, 11, 13)}</g>

      {/* Building C — tallest center */}
      <rect x="325" y="20" width="90" height="500" strokeWidth="1.5" />
      <g strokeWidth="0.7">{wins(337, 40, 2, 15, 24, 17, 11, 12)}</g>

      {/* Building D — mid-rise */}
      <rect x="435" y="150" width="115" height="370" strokeWidth="1.5" />
      <g strokeWidth="0.7">{wins(449, 170, 2, 11, 26, 18, 11, 12)}</g>

      {/* Building E — slim right */}
      <rect x="570" y="70" width="75" height="450" strokeWidth="1.5" />
      <g strokeWidth="0.7">{wins(582, 90, 2, 14, 20, 17, 9, 12)}</g>

      {/* Building F — wide short */}
      <rect x="665" y="280" width="175" height="240" strokeWidth="1.5" />
      <g strokeWidth="0.7">{wins(679, 300, 4, 6, 24, 20, 10, 13)}</g>
    </svg>
  );
}
