"use client";

import { useRef } from "react";

// Shared across pieces so whatever was grabbed last sits on top.
let topLayer = 100;

// mouse/pen only, so phones can still scroll. resets on reload
export function Draggable({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ x: 0, y: 0, startX: 0, startY: 0, active: false });

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch" || e.button !== 0) return;
    const el = ref.current;
    if (!el) return;
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    drag.current.startX = e.clientX - drag.current.x;
    drag.current.startY = e.clientY - drag.current.y;
    drag.current.active = true;
    el.style.zIndex = String(++topLayer);
    el.dataset.dragging = "";
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    drag.current.x = e.clientX - drag.current.startX;
    drag.current.y = e.clientY - drag.current.startY;
    el.style.setProperty("--dx", `${drag.current.x}px`);
    el.style.setProperty("--dy", `${drag.current.y}px`);
  }

  function onPointerUp() {
    drag.current.active = false;
    delete ref.current?.dataset.dragging;
  }

  return (
    <div
      ref={ref}
      className={`drag ${className}`}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {children}
    </div>
  );
}
