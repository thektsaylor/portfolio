"use client";

import { useEffect, useRef, useState } from "react";

// The arched frame for a project. On first view the media wipes up into the arch
// and settles from a slight zoom; after that it drifts gently as the page scrolls.
export function ArchMedia({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 when the frame enters at the bottom, 1 when it leaves at the top.
      const progress = 1 - ((rect.top + rect.height / 2) / (vh + rect.height)) * 2;
      el.style.setProperty("--drift", Math.max(-1, Math.min(1, progress)).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (!reduceMotion) {
            update();
            window.addEventListener("scroll", onScroll, { passive: true });
          }
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} data-arch data-shown={shown || undefined} className={className}>
      <div className="arch-zoom absolute inset-0">
        <div className="arch-drift absolute inset-0">{children}</div>
      </div>
    </div>
  );
}
