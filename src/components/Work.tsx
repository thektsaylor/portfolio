import { projects } from "@/content/projects";
import { IntroCard } from "./IndexCard";
import { JumpButtons } from "./JumpButtons";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

// which cards sit in the lower right column on desktop. picked by card height so
// both columns end close together (SEO is the tall one)
const rightColumn = new Set(["CatHead Biscuits", "SEO Performance Dashboards"]);

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-6 pb-20 sm:px-8 sm:pt-16 sm:pb-20">
      <SectionHead title="See my work" tape="squiggle">
        <JumpButtons className="hidden sm:flex" />
      </SectionHead>
      {/* two independent columns so each stacks tightly; the right one starts lower.
          on phones the columns dissolve (display: contents) and order puts cards back
          in their original sequence */}
      <div className="flex flex-col gap-y-20 sm:flex-row sm:gap-x-16">
        {[0, 1].map((col) => (
          <div key={col} className={`contents sm:flex sm:flex-1 sm:flex-col sm:gap-y-24 ${col ? "sm:pt-6" : ""}`}>
            {/* intro card tops the right column on desktop (phones get it in the hero) */}
            {col === 1 && (
              <Reveal className="hidden sm:block">
                <IntroCard />
              </Reveal>
            )}
            {projects.map((project, i) =>
              rightColumn.has(project.title) === Boolean(col) ? (
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
