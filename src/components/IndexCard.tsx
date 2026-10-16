import { site } from "@/content/site";

// lined index card: small label on the red rule, typed text on the blue lines
export function IndexCard({
  label,
  children,
  style,
}: {
  label: string;
  children: React.ReactNode;
  // inline so it beats the .index-card defaults (tilt, right-aligned)
  style?: React.CSSProperties;
}) {
  return (
    <div className="index-card" style={style}>
      <p className="text-[11px] tracking-[0.2em] text-terracotta uppercase">{label}</p>
      <p>{children}</p>
    </div>
  );
}

// the intro, typed on a card
export function IntroCard() {
  return <IndexCard label="The short version">{site.intro}</IndexCard>;
}
