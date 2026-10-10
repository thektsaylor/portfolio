import Image from "next/image";
import type { Category, Project } from "@/content/projects";

const tagColor: Record<Category, string> = {
  Photography: "bg-terracotta text-paper",
  "UX/UI": "bg-leaf text-ink",
  Web: "bg-mustard text-ink",
  Data: "bg-clay text-ink",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col rounded-[2rem] border-2 border-ink bg-[#fbf7ef] p-3 transition hover:-translate-y-1 hover:shadow-[0_8px_0_0_var(--color-ink)]">
      <div className="relative aspect-[5/6] overflow-hidden rounded-t-full rounded-b-2xl border-2 border-ink">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-3 pt-5 pb-3">
        <div className="flex items-center justify-between gap-4">
          <span className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${tagColor[project.category]}`}>
            {project.category}
          </span>
          <span className="text-sm text-muted">{project.year}</span>
        </div>
        <h3 className="font-display text-2xl font-extrabold tracking-tight">{project.title}</h3>
        <p className="leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tools.map((tool) => (
            <li key={tool} className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
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
                className="font-semibold underline decoration-leaf decoration-4 underline-offset-4 transition hover:text-forest"
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
