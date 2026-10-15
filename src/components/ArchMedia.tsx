"use client";

import { useEffect, useRef, useState } from "react";

// arch frame: wipes up + settles from a zoom the first time, then drifts on scroll
// starts visible, only hidden once the script runs
export function ArchMedia({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    // only wipe the ones below the fold
    if (el.getBoundingClientRect().top >= window.innerHeight) setPhase("hidden");

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
          setPhase((p) => (p === "hidden" ? "shown" : p));
          update();
          window.addEventListener("scroll", onScroll, { passive: true });
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
