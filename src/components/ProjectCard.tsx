import Image from "next/image";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border-2 border-ink bg-white transition hover:-translate-y-1 hover:shadow-[0_8px_0_0_var(--color-ink)]">
      <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-lime px-3 py-1 text-xs font-bold tracking-wide text-ink uppercase">
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl font-extrabold tracking-tight">{project.title}</h3>
          <span className="text-sm text-muted">{project.year}</span>
        </div>
        <p className="leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tools.map((tool) => (
            <li key={tool} className="rounded-full bg-lime-soft px-3 py-1 text-xs font-medium text-forest">
              {tool}
            </li>
          ))}
        </ul>
        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-4 pt-2">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline decoration-lime decoration-4 underline-offset-4 transition hover:text-forest"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
