import Image from "next/image";
import type { Project } from "@/content/projects";
import { ArchMedia } from "./ArchMedia";
import { BrowserMockup } from "./BrowserMockup";
import { PhoneMockup } from "./PhoneMockup";
import { Showcase } from "./Showcase";
import { SiteStage } from "./SiteStage";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group">
      {project.site ? (
        <SiteStage>
          <BrowserMockup
            screenshot={project.site.screenshot}
            label={`${project.title} website`}
          />
        </SiteStage>
      ) : project.gallery ? (
        <Showcase project={project} />
      ) : (
        <ArchMedia
          className={`relative aspect-[4/5] ${
            project.video ? "" : "overflow-hidden rounded-2xl bg-sand"
          } ${project.film ? "film" : ""}`}
        >
          {project.video ? (
            <div className="absolute top-[8%] left-1/2 w-[48%] -translate-x-1/2">
              <PhoneMockup video={project.video} label={`${project.title} prototype demo`} />
            </div>
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          )}
        </ArchMedia>
      )}
      <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-line pb-3 text-xs tracking-[0.2em] text-muted uppercase">
        <span>
          {project.category}
        </span>
        <span>{project.year}</span>
      </div>
      <h3 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.035em]">{project.title}</h3>
      <p className="mt-3 max-w-md leading-relaxed text-muted">{project.summary}</p>
      {project.highlights && (
        <ul className="mt-4 max-w-md space-y-2 text-sm leading-relaxed text-muted">
          {project.highlights.map((point) => (
            <li key={point} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-sm text-muted">{project.tools.join(" · ")}</p>
      {project.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-5">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="squiggle-link text-sm font-semibold transition hover:text-forest"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
