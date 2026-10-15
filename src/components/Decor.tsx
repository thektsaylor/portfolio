// hand-drawn doodles (aria-hidden)

type Props = { className?: string };

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

// scallops into the dark contact section
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

