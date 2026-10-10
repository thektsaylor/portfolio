// Small hand-drawn touches. Decorative only, so hidden from screen readers.

type Props = { className?: string };

// A fine-line sun setting on the horizon, drawn to sit inside the hero arch.
export function SunLine({ className }: Props) {
  const rays = [-60, -40, -20, 0, 20, 40, 60];
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M60 100a40 40 0 0 1 80 0" />
        {rays.map((deg) => (
          <line key={deg} x1="100" y1="44" x2="100" y2="30" transform={`rotate(${deg} 100 100)`} />
        ))}
        <line x1="10" y1="100" x2="190" y2="100" />
        <line x1="40" y1="110" x2="160" y2="110" opacity="0.5" />
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
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Scalloped edge that softens the jump into the dark contact section.
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
