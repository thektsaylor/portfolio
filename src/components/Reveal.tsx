"use client";

import { useRef } from "react";
import { useScrollIn } from "./useScrollIn";

// fade + lift on first scroll-in. no JS = everything just shows
export function Reveal({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const phase = useScrollIn(ref);

  return (
    <div ref={ref} data-reveal={phase} style={{ ...style, transitionDelay: `${delay}ms` }} className={className}>
      {children}
    </div>
  );
}
