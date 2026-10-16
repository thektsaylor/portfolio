"use client";

import { useState } from "react";
import { projects, type Category } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

const filters: ("All" | Category)[] = ["All", "Branding", "UX/UI", "Web", "Data"];

// which cards sit in the lower right column on desktop. picked by card height so
// both columns end close together (SEO is the tall one). filtered views just alternate
const rightColumn = new Set(["CatHead Biscuits", "SEO Performance Dashboards"]);

export function Work() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:pt-28 sm:pb-20">
      <SectionHead title="See my work" tape="rgb(111 191 115 / 0.55)">
        <div className="flex flex-wrap gap-x-5 gap-y-2" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={`text-sm transition ${
                active === f
                  ? "squiggle-link font-semibold text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </SectionHead>
      {/* two independent columns so each stacks tightly; the right one starts lower.
          on phones the columns dissolve (display: contents) and order puts cards back
          in their original sequence */}
      <div className="flex flex-col gap-y-20 sm:flex-row sm:gap-x-16">
        {[0, 1].map((col) => (
          <div key={col} className={`contents sm:flex sm:flex-1 sm:flex-col sm:gap-y-24 ${col ? "sm:pt-80" : ""}`}>
            {shown.map((project, i) =>
              (active === "All" ? rightColumn.has(project.title) : i % 2 === 1) === Boolean(col) ? (
                <Reveal
                  key={project.title}
                  delay={col ? 150 : 0}
                  className="order-(--o) sm:order-none"
                  style={{ "--o": i } as React.CSSProperties}
                >
                  <ProjectCard project={project} />
                </Reveal>
              ) : null,
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
