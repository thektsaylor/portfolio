import Image from "next/image";
import type { Project } from "@/content/projects";
import { ArchMedia } from "./ArchMedia";
import { BrowserMockup } from "./BrowserMockup";
import { PhoneMockup } from "./PhoneMockup";
import { SiteStage } from "./SiteStage";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group">
      {project.site ? (
        <SiteStage>
          <BrowserMockup
            url={project.site.url}
            screenshot={project.site.screenshot}
            label={`Screenshot of the ${project.title} website`}
          />
        </SiteStage>
      ) : (
        <ArchMedia
          className={`relative aspect-[4/5] overflow-hidden rounded-2xl ${
            project.video ? "bg-[#ead9c8]" : "bg-sand"
          } ${project.film ? "film" : ""}`}
        >
          {project.video ? (
            <div className="absolute top-[13%] left-1/2 w-[52%] -translate-x-1/2">
              <PhoneMockup
                mp4={project.video.mp4}
                webm={project.video.webm}
                poster={project.video.poster}
                label={`Screen recording of the ${project.title} prototype`}
              />
            </div>
          ) : (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          )}
        </ArchMedia>
      )}
      {project.gallery && (
        <div
          className="mt-3 grid gap-3"
          style={{ gridTemplateColumns: `repeat(${project.gallery.length}, minmax(0, 1fr))` }}
        >
          {project.gallery.map((shot, i, all) => (
            <a
              key={shot.src}
              href={shot.href ?? shot.src}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative overflow-hidden rounded-xl transition duration-300 ease-out hover:z-20 hover:shadow-[0_18px_40px_-12px_rgba(46,34,25,0.5)] focus-visible:z-20 ${
                project.galleryFit === "contain"
                  ? "aspect-[3/2] hover:scale-[2.3] focus-visible:scale-[2.3]"
                  : "aspect-square hover:scale-[1.7] focus-visible:scale-[1.7]"
              } ${
                i === 0 ? "origin-bottom-left" : i === all.length - 1 ? "origin-bottom-right" : "origin-bottom"
              } ${project.galleryFit === "contain" ? "bg-[#fbf7f0]" : "bg-sand"} ${project.film ? "film" : ""}`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width: 640px) 20vw, 40vw"
                className={project.galleryFit === "contain" ? "object-contain p-1" : "object-cover object-top"}
              />
            </a>
          ))}
        </div>
      )}
      <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-line pb-3 text-xs tracking-[0.2em] text-muted uppercase">
        <span>
          <span className="text-forest">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-2">/</span>
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
              className="text-sm font-semibold underline decoration-leaf decoration-2 underline-offset-4 transition hover:text-forest"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
