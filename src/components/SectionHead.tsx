// Editorial section opener: title and hairline rule.
export function SectionHead({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-col gap-6 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">{title}</h2>
      {children}
    </div>
  );
}
