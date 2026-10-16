"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/content/projects";
import { ArchMedia } from "./ArchMedia";

// big image + thumb strip. hover/focus/tap a thumb to swap it in
export function Showcase({ project }: { project: Project }) {
  const gallery = project.gallery ?? [];
  // -1 = default image
  const [picked, setPicked] = useState(-1);
  // charts: hovered thumb pops up bigger above the strip
  const [zoomed, setZoomed] = useState(-1);
  const contain = project.galleryFit === "contain";
  const current = picked >= 0 ? gallery[picked] : undefined;
  const active = current ? (current.full ?? current.src) : project.image;

  return (
    <>
      <ArchMedia
        className={`relative aspect-[4/5] ${contain ? "" : "overflow-hidden rounded-2xl bg-sand"} ${
          project.film ? "film" : ""
        }`}
      >
        <Image
          key={active}
          src={active}
          alt={current?.alt ?? project.title}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className={`showcase-fade ${
            // no backdrop for reports, just a drop shadow around the page like the Fiberglass phone
            contain ? "object-contain p-8 drop-shadow-[0_22px_22px_rgba(46,34,25,0.4)]" : "object-cover"
          }`}
        />
      </ArchMedia>
      {gallery.length > 0 && (
        <div className="relative">
        {contain && zoomed >= 0 && (
          <div
            className="zoom-pop pointer-events-none absolute inset-x-0 bottom-[calc(100%+0.5rem)] z-30 rounded-2xl bg-[#fbf7f0] p-2 shadow-[0_24px_50px_-16px_rgba(46,34,25,0.55)] ring-1 ring-ink/10"
            aria-hidden
          >
            <Image
              src={gallery[zoomed].src}
              alt=""
              width={900}
              height={600}
              sizes="(min-width: 640px) 50vw, 100vw"
              className="h-auto max-h-[70vh] w-full object-contain"
            />
          </div>
        )}
        {/* padding + negative margin so the selected ring doesn't get clipped */}
        <div className="thumb-strip -mx-1 mt-2 flex snap-x scroll-px-1 gap-3 overflow-x-auto p-1 pb-3">
          {gallery.map((shot, i) => {
            const on = i === picked || (picked < 0 && (shot.full ?? shot.src) === project.image && i === gallery.findIndex((g) => (g.full ?? g.src) === project.image));
            return (
              <button
                key={shot.src}
                type="button"
                aria-label={shot.alt}
                aria-pressed={on}
                onMouseEnter={() => {
                  setPicked(i);
                  setZoomed(i);
                }}
                onMouseLeave={() => setZoomed(-1)}
                onFocus={() => setPicked(i)}
                onClick={() => setPicked(i)}
                className={`relative w-[calc((100%-2.25rem)/4)] shrink-0 snap-start overflow-hidden rounded-xl transition ${
                  contain ? "aspect-[3/2] bg-[#fbf7f0]" : "aspect-square bg-sand"
                } ${on ? "ring-2 ring-forest ring-offset-2 ring-offset-paper" : "opacity-80 hover:opacity-100"} ${
                  project.film ? "film" : ""
                }`}
              >
                <Image
                  src={shot.src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 12vw, 25vw"
                  className={contain ? "object-contain p-1" : "object-cover object-top"}
                />
              </button>
            );
          })}
        </div>
        </div>
      )}
    </>
  );
}
