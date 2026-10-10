import { skills } from "@/content/site";

export function Marquee() {
  const words = skills.flatMap((s) => s.items);
  // Duplicated so the loop is seamless at the -50% keyframe.
  const loop = [...words, ...words];
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-lime py-4" aria-hidden>
      <div className="animate-marquee flex w-max gap-8">
        {loop.map((word, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-2xl font-extrabold whitespace-nowrap">
            {word}
            <span className="text-forest">✱</span>
          </span>
        ))}
      </div>
    </div>
  );
}
