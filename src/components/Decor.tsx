// Hand-drawn boho ornaments. All decorative, so hidden from screen readers.

type Props = { className?: string };

export function Sun({ className }: Props) {
  const rays = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        {rays.map((deg) => (
          <line key={deg} x1="100" y1="18" x2="100" y2="40" transform={`rotate(${deg} 100 100)`} />
        ))}
      </g>
      <circle cx="100" cy="100" r="46" fill="currentColor" />
    </svg>
  );
}

export function Rainbow({ className }: Props) {
  return (
    <svg viewBox="0 0 200 110" className={className} aria-hidden>
      <path d="M10 105a90 90 0 0 1 180 0" fill="none" stroke="var(--color-terracotta)" strokeWidth="18" />
      <path d="M36 105a64 64 0 0 1 128 0" fill="none" stroke="var(--color-mustard)" strokeWidth="18" />
      <path d="M62 105a38 38 0 0 1 76 0" fill="none" stroke="var(--color-leaf)" strokeWidth="18" />
    </svg>
  );
}

export function Sprig({ className }: Props) {
  return (
    <svg viewBox="0 0 120 220" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M60 215C58 160 62 90 60 10" />
        {[40, 75, 110, 145, 180].map((y, i) => (
          <g key={y}>
            <path d={`M60 ${y + 10}c-18-4-32-16-36-34 18 2 32 14 36 34z`} fill={i % 2 ? "currentColor" : "none"} />
            <path d={`M60 ${y}c18-4 32-16 36-34-18 2-32 14-36 34z`} fill={i % 2 ? "none" : "currentColor"} />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function Squiggle({ className }: Props) {
  return (
    <svg viewBox="0 0 300 24" preserveAspectRatio="none" className={className} aria-hidden>
      <path
        d="M4 14c20-12 36 10 56 0s36-12 56 0 36 10 56 0 36-12 56 0 36 8 68-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Scalloped edge to soften the jump between sections.
export function Wave({ className }: Props) {
  return (
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className={className} aria-hidden>
      <path
        d="M0 40V20C50 0 100 0 150 20s100 20 150 0 100-20 150 0 100 20 150 0 100-20 150 0 100 20 150 0 100-20 150 0 100 20 150 0v20z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Flower({ className }: Props) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse key={deg} cx="20" cy="9" rx="6" ry="9" fill="currentColor" transform={`rotate(${deg} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="5" fill="var(--color-paper)" />
    </svg>
  );
}
