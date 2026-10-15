"use client";

import { useState } from "react";
import { projects, type Category } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

const filters: ("All" | Category)[] = ["All", "Branding", "UX/UI", "Web", "Data"];

export function Work() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead title="Selected work">
        <div className="flex flex-wrap gap-x-5 gap-y-2" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={`text-sm transition ${
                active === f
                  ? "font-semibold text-ink underline decoration-leaf decoration-2 underline-offset-8"
                  : "text-muted hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </SectionHead>
      {/* each card spans two rows and the right column starts a row lower,
          so cards sit beside the gap between two others, not next to one */}
      <div className="grid gap-x-16 gap-y-20 sm:grid-cols-2 sm:gap-y-10">
        {shown.map((project, i) => (
          <Reveal
            key={project.title}
            delay={i % 2 === 1 ? 150 : 0}
            className="sm:col-start-(--col) sm:row-span-2 sm:row-start-(--row)"
            style={{ "--col": (i % 2) + 1, "--row": i + 1 } as React.CSSProperties}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
