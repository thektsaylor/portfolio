// section title on a washi-taped label + thin rule
export function SectionHead({
  title,
  tape,
  tilt = -1.2,
  children,
}: {
  title: string;
  // washi tape color
  tape?: string;
  tilt?: number;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-col gap-6 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
      <h2
        className="washi-label self-start font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
        style={{ "--tape": tape, rotate: `${tilt}deg` } as React.CSSProperties}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
