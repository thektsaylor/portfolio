// little pointing-hand stamp (a manicule), drawn as line art in the current text color
export function PointingHand({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M33 10.5H6.5a2.6 2.6 0 0 0 0 5.2H30" />
      <path d="M33 10.5C36 7.5 41 6.8 46 7.6L50 8.2" />
      <path d="M50 29.5L44 30.2C40.5 30.5 37.5 29.8 35.5 28.3" />
      <path d="M30 15.7C26.5 15.9 25.6 20.2 29.6 20.4H34.5" />
      <path d="M33.6 20.4C29.8 20.7 30 24.8 33.8 24.8H37.5" />
      <path d="M36.6 24.8C33.4 25.2 33.6 28.4 36 28.6" />
      <path d="M34 15.7C38 15.3 41.5 16.2 43 18.4" />
      <path d="M50 7.4L54 7L54.6 30L50.4 30.4Z" />
      <path d="M54.2 7.2c3-1.2 5.6.6 4.6 3c2.8-.2 3.6 3 1.2 4.2c2.6.6 2.6 3.8 0 4.4c2.4 1.2 1.6 4.4-1.2 4.2c1 2.6-1.6 4.4-4.4 3" />
    </svg>
  );
}
