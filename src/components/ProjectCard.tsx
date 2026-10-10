import Image from "next/image";
import type { Project } from "@/content/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] bg-sand">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />
      </div>
      {project.gallery && (
        <div
          className="mt-3 grid gap-3"
          style={{ gridTemplateColumns: `repeat(${project.gallery.length}, minmax(0, 1fr))` }}
        >
          {project.gallery.map((shot) => (
            <a
              key={shot.src}
              href={shot.src}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-2xl bg-sand"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width: 640px) 12vw, 25vw"
                className="object-cover transition duration-500 hover:scale-105"
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
      <h3 className="mt-4 font-display text-3xl font-extrabold tracking-tight">{project.title}</h3>
      <p className="mt-3 max-w-md leading-relaxed text-muted">{project.summary}</p>
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
