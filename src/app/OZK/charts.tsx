// charts for the OZK report. plain svg, no chart library (the CSP only allows our own scripts)

type Point = { row: number; col: number; lat: number; lng: number; position: number | null; leader: string | null };
type Landmark = { label: string; lat: number; lng: number };
type Shape = { name: string; parts: [number, number][][] };
// census TIGER city limits, roads and lakes for the grid area (build_basemap.py in the toolkit)
export type Basemap = { places: Shape[]; highways: Shape[]; roads: Shape[]; water: Shape[] };

// lng/lat rings -> one svg path
function toPath(shapes: Shape[], x: (lng: number) => number, y: (lat: number) => number, close: boolean) {
  return shapes
    .flatMap((s) => s.parts)
    .map((part) => part.map(([lng, lat], i) => `${i ? "L" : "M"}${x(lng).toFixed(1)} ${y(lat).toFixed(1)}`).join("") + (close ? "Z" : ""))
    .join("");
}

// position -> color. the site palette, darkest green for #1
export function rankColor(position: number | null) {
  if (position === 1) return "var(--color-forest)";
  if (position !== null && position <= 3) return "var(--color-leaf)";
  if (position !== null && position <= 10) return "var(--color-mustard)";
  if (position !== null) return "var(--color-terracotta)";
  return "var(--color-line)";
}

export function HeatMap({
  points,
  size,
  landmarks,
  shop,
  keyword,
  basemap,
}: {
  points: Point[];
  size: number;
  landmarks: Landmark[];
  shop: { lat: number; lng: number };
  keyword: string;
  basemap: Basemap | null;
}) {
  const cell = 64;
  const pad = 40;
  const span = (size - 1) * cell;
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  const [minLat, maxLat, minLng, maxLng] = [Math.min(...lats), Math.max(...lats), Math.min(...lngs), Math.max(...lngs)];
  // map coordinates -> svg, north up
  const x = (lng: number) => pad + ((lng - minLng) / (maxLng - minLng)) * span;
  const y = (lat: number) => pad + ((maxLat - lat) / (maxLat - minLat)) * span;
  const top3 = points.filter((p) => p.position !== null && p.position <= 3).length;

  return (
    <svg
      viewBox={`0 0 ${span + pad * 2} ${span + pad * 2}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Google Maps rank for "${keyword}" at ${points.length} points. OZK Customs is in the top 3 at ${top3}.`}
    >
      <defs>
        <clipPath id="ozk-map-clip">
          <rect x="4" y="4" width={span + pad * 2 - 8} height={span + pad * 2 - 8} rx="18" />
        </clipPath>
      </defs>
      <rect x="4" y="4" width={span + pad * 2 - 8} height={span + pad * 2 - 8} rx="18" fill="var(--color-sand)" />
      {basemap ? (
        <g clipPath="url(#ozk-map-clip)" aria-hidden>
          <path d={toPath(basemap.places, x, y, true)} fill="var(--color-paper)" stroke="var(--color-line)" strokeWidth="1" fillRule="evenodd" />
          <path d={toPath(basemap.water, x, y, true)} fill="#c9d6d3" stroke="#b3c4c0" strokeWidth="0.6" />
          <path d={toPath(basemap.roads, x, y, false)} fill="none" stroke="var(--color-line)" strokeWidth="1.1" strokeLinejoin="round" />
          <path d={toPath(basemap.highways, x, y, false)} fill="none" stroke="var(--color-muted)" strokeOpacity="0.55" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" />
        </g>
      ) : null}
      {points.map((p) => (
        <g key={`${p.row}-${p.col}`}>
          <circle cx={x(p.lng)} cy={y(p.lat)} r="16" fill={rankColor(p.position)} opacity="0.88" stroke="var(--color-paper)" strokeWidth="1.5" />
          <text
            x={x(p.lng)}
            y={y(p.lat)}
            dy="0.35em"
            textAnchor="middle"
            fontSize="15"
            fontWeight="600"
            fill={p.position === null ? "var(--color-muted)" : "var(--color-paper)"}
          >
            {p.position ?? "20+"}
          </text>
        </g>
      ))}
      {landmarks.map((l) => (
        <g key={l.label} transform={`translate(${x(l.lng)} ${y(l.lat)})`}>
          <rect x="-5" y="-5" width="10" height="10" transform="rotate(45)" fill="var(--color-ink)" stroke="var(--color-paper)" strokeWidth="2" />
          <Pill x={10} y={-30} text={l.label} />
        </g>
      ))}
      <g transform={`translate(${x(shop.lng)} ${y(shop.lat)})`}>
        <circle r="9" fill="var(--color-terracotta)" stroke="var(--color-paper)" strokeWidth="3" />
        <Pill x={10} y={8} text="OZK shop" bold />
      </g>
    </svg>
  );
}

// label on a paper-colored pill so it stays readable over the dots
function Pill({ x, y, text, bold = false }: { x: number; y: number; text: string; bold?: boolean }) {
  const w = text.length * 8.4 + 16;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height="24" rx="12" fill="var(--color-paper)" stroke="var(--color-line)" opacity="0.95" />
      <text x={w / 2} y="12" dy="0.35em" textAnchor="middle" fontSize="14" fontWeight={bold ? 700 : 600} fill="var(--color-ink)">
        {text}
      </text>
    </g>
  );
}

export function Legend() {
  const items: [string, number | null][] = [
    ["#1", 1],
    ["#2 to #3", 2],
    ["#4 to #10", 4],
    ["#11 to #20", 11],
    ["not in top 20", null],
  ];
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
      {items.map(([label, pos]) => (
        <li key={label} className="flex items-center gap-2">
          <span className="inline-block size-3.5 rounded-full" style={{ background: rankColor(pos) }} aria-hidden />
          {label}
        </li>
      ))}
    </ul>
  );
}

// one horizontal bar per business. used for review counts
export function Bars({ rows, highlight }: { rows: { label: string; value: number; note?: string }[]; highlight: string }) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li key={r.label} className="grid grid-cols-[minmax(0,9rem)_1fr] items-center gap-3 sm:grid-cols-[14rem_1fr]">
          <span className={`truncate text-sm ${r.label === highlight ? "font-semibold text-ink" : "text-muted"}`}>{r.label}</span>
          <span className="flex items-center gap-2">
            <span
              className="h-3.5 rounded-full"
              style={{
                width: `${Math.max((r.value / max) * 100, 1.5)}%`,
                background: r.label === highlight ? "var(--color-terracotta)" : "var(--color-mushroom)",
              }}
            />
            <span className="shrink-0 text-sm tabular-nums">
              {r.value}
              {r.note ? <span className="text-muted"> {r.note}</span> : null}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
