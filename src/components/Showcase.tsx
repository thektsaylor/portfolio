"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/content/projects";
import { ArchMedia } from "./ArchMedia";

// Main image plus a sideways-scrolling strip (4 thumbnails visible). Hovering, focusing,
// or tapping a thumbnail swaps it into the main image; it stays until another is chosen.
export function Showcase({ project }: { project: Project }) {
  const gallery = project.gallery ?? [];
  // Index of the chosen thumbnail; -1 shows the project's default image.
  const [picked, setPicked] = useState(-1);
  // For chart-style galleries: the thumbnail under the pointer, shown enlarged above the strip.
  const [zoomed, setZoomed] = useState(-1);
  const contain = project.galleryFit === "contain";
  const current = picked >= 0 ? gallery[picked] : undefined;
  const active = current ? (current.full ?? current.src) : project.image;

  return (
    <>
      <ArchMedia
        className={`relative aspect-[4/5] overflow-hidden rounded-2xl ${contain ? "bg-[#fbf7f0]" : "bg-sand"} ${
          project.film ? "film" : ""
        }`}
      >
        <Image
          key={active}
          src={active}
          alt={current?.alt ?? `A first look at ${project.title}`}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className={`showcase-fade ${contain ? "object-contain p-3" : "object-cover"}`}
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
        {/* The padding (offset by the negative margin) leaves room for the selected ring,
            which a scrolling container would otherwise clip. */}
        <div className="thumb-strip -mx-1 mt-2 flex snap-x scroll-px-1 gap-3 overflow-x-auto p-1 pb-3">
          {gallery.map((shot, i) => {
            const on = i === picked || (picked < 0 && (shot.full ?? shot.src) === project.image && i === gallery.findIndex((g) => (g.full ?? g.src) === project.image));
            return (
              <button
                key={shot.src}
                type="button"
                aria-label={`Take a closer look: ${shot.alt}`}
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
