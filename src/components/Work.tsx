"use client";

import { useState } from "react";
import { projects, type Category } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

const filters: ("All" | Category)[] = ["All", "UX/UI", "Web", "Data", "Photography"];

export function Work() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
          Selected work<span className="text-terracotta">.</span>
        </h2>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={`rounded-full border-2 border-ink px-4 py-1.5 text-sm font-semibold transition ${
                active === f ? "bg-ink text-paper" : "bg-paper hover:bg-leaf"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
