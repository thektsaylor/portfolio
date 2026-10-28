"use client";

import { useEffect } from "react";

const MAX_STAMPS = 40;

// every mouse click inks a little grey CatHead stamp onto the page.
// they scroll with the page, oldest ones get peeled off past 40
export function ClickStamps() {
  useEffect(() => {
    const layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText = "position:absolute;top:0;left:0;width:100%;overflow:hidden;pointer-events:none;z-index:40";
    document.body.appendChild(layer);

    function onPointerDown(e: PointerEvent) {
      if (e.pointerType === "touch" || e.button !== 0) return;
      // dragging a journal piece isn't a stamp, and pages can opt out with data-no-stamps
      if ((e.target as Element).closest?.(".piece, [data-no-stamps]")) return;
      layer.style.height = `${document.documentElement.scrollHeight}px`;
      const stamp = document.createElement("img");
      stamp.src = "/cursor/stamp.png";
      stamp.alt = "";
      stamp.className = "click-stamp";
      stamp.style.left = `${e.pageX}px`;
      stamp.style.top = `${e.pageY}px`;
      // same tilt as the cursor, give or take a few degrees like a hand stamp
      stamp.style.rotate = `${-14 + (Math.random() * 20 - 10)}deg`;
      layer.appendChild(stamp);
      while (layer.childElementCount > MAX_STAMPS) layer.firstElementChild?.remove();
    }

    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      layer.remove();
    };
  }, []);

  return null;
}
