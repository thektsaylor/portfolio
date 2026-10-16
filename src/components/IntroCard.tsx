import { site } from "@/content/site";

// the intro, typed on a lined index card
export function IntroCard() {
  return (
    <div className="index-card">
      <p className="text-[11px] tracking-[0.2em] text-terracotta uppercase">The short version</p>
      <p>{site.intro}</p>
    </div>
  );
}
