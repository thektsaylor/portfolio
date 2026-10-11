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
          alt={current?.alt ?? `${project.title} preview`}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className={`showcase-fade ${contain ? "object-contain p-3" : "object-cover"}`}
        />
      </ArchMedia>
      {gallery.length > 0 && (
        <div className="thumb-strip mt-3 flex snap-x gap-3 overflow-x-auto pb-2">
          {gallery.map((shot, i) => {
            const on = i === picked || (picked < 0 && (shot.full ?? shot.src) === project.image && i === gallery.findIndex((g) => (g.full ?? g.src) === project.image));
            return (
              <button
                key={shot.src}
                type="button"
                aria-label={`Show ${shot.alt}`}
                aria-pressed={on}
                onMouseEnter={() => setPicked(i)}
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
      )}
    </>
  );
}
