"use client";

import { useState } from "react";
import { projects, type Category } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionHead } from "./SectionHead";

const filters: ("All" | Category)[] = ["All", "Branding", "UX/UI", "Web", "Data"];

export function Work() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead index="01" title="Selected work">
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
      {/* Two columns, right column dropped down for a magazine-style stagger */}
      <div className="grid gap-x-16 gap-y-20 sm:grid-cols-2">
        {shown.map((project, i) => (
          <div key={project.title} className={i % 2 === 1 ? "sm:mt-32" : ""}>
            <ProjectCard project={project} index={projects.indexOf(project)} />
          </div>
        ))}
      </div>
    </section>
  );
}
