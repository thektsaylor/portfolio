"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "hidden" | "shown";

// Fades and lifts its children into place the first time they scroll into view.
// Content is visible by default and is only hidden once this script runs, so the
// page still reads fine if JavaScript is blocked or slow to load.
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at load: leave it alone rather than flashing it out and back.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setPhase("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal={phase} style={{ transitionDelay: `${delay}ms` }} className={className}>
      {children}
    </div>
  );
}
