"use client";

import { useEffect, useRef } from "react";
import { useScrollIn } from "./useScrollIn";

// arch frame: wipes up + settles from a zoom the first time, then drifts on scroll
export function ArchMedia({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const phase = useScrollIn(ref);

  // drift: -1 when the frame is at the bottom of the screen, 1 when it's at the top
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = 1 - ((rect.top + rect.height / 2) / (window.innerHeight + rect.height)) * 2;
      el.style.setProperty("--drift", Math.max(-1, Math.min(1, progress)).toFixed(3));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} data-arch={phase} className={className}>
      {/* clip the inner layer, not the observed one, or the observer never fires */}
      <div className="arch-clip absolute inset-0">
        <div className="arch-zoom absolute inset-0">
          <div className="arch-drift absolute inset-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
