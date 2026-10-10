import { skills } from "@/content/site";
import { Flower } from "./Decor";

export function Marquee() {
  const words = skills.flatMap((s) => s.items);
  // Duplicated so the loop is seamless at the -50% keyframe.
  const loop = [...words, ...words];
  return (
    <div className="overflow-hidden py-6" aria-hidden>
      <div className="-mx-4 -rotate-1 border-y-2 border-ink bg-leaf py-4">
        <div className="animate-marquee flex w-max gap-8">
          {loop.map((word, i) => (
            <span key={i} className="flex items-center gap-8 font-display text-2xl font-extrabold whitespace-nowrap">
              {word}
              <Flower className={`h-6 w-6 ${i % 2 ? "text-mustard" : "text-terracotta"}`} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
