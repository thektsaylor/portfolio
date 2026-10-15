import { useEffect, useState, type RefObject } from "react";

export type Phase = "idle" | "hidden" | "shown";

// used by Reveal and ArchMedia.
// starts visible. if it loads below the fold, hide it and show it once it scrolls in
export function useScrollIn(ref: RefObject<HTMLElement | null>) {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setPhase("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return phase;
}
