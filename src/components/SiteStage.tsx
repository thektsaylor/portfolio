"use client";

import { useEffect, useRef } from "react";

// site rises up out of the horizon line as you scroll (fully up if no JS)
export function SiteStage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight;
      // 0 as the card's top enters the bottom of the screen, 1 once it reaches 30% from the top
      const p = Math.max(0, Math.min(1, (vh - top) / (vh * 0.7)));
      el.style.setProperty("--rise", (1 - (1 - p) * (1 - p)).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="relative aspect-[4/5]" style={{ "--rise": 1 } as React.CSSProperties}>
      {/* clipped at the line */}
      <div className="absolute inset-x-0 top-0 bottom-[8%] overflow-hidden">
        <div className="site-rise absolute inset-x-[5%] top-[6%]">{children}</div>
      </div>
      <span className="absolute bottom-[8%] -left-6 -right-6 h-[2px] bg-ink" aria-hidden />
    </div>
  );
}
