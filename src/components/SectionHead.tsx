// Editorial section opener: number, title, hairline rule.
export function SectionHead({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-col gap-6 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-baseline gap-5">
        <span className="font-display text-sm font-semibold text-forest">{index}</span>
        <h2 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}
