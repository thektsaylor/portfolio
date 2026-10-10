import { nowItems, site, skills } from "@/content/site";
import { SectionHead } from "./SectionHead";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead index="02" title="About" />
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div className="space-y-8 text-sm">
          <div>
            <p className="mb-3 text-xs tracking-[0.2em] text-muted uppercase">Right now</p>
            <ul className="space-y-2">
              {nowItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs tracking-[0.2em] text-muted uppercase">Based in</p>
            <p>
              {site.location}. Graduating {site.graduation}.
            </p>
          </div>
        </div>
        <div>
          <p className="font-display text-3xl leading-snug font-semibold tracking-tight sm:text-4xl">
            I live where design, tech, and people overlap. The psychology minor keeps me asking{" "}
            <span className="text-forest">why users do what they do</span>, the SEO job keeps me honest
            with real data, and the AI and security coursework keeps me curious about how all of it
            works under the hood.
          </p>
          <dl className="mt-14 border-t border-line">
            {skills.map((s) => (
              <div key={s.group} className="grid gap-2 border-b border-line py-4 sm:grid-cols-[10rem_1fr]">
                <dt className="text-xs tracking-[0.2em] text-muted uppercase sm:pt-0.5">{s.group}</dt>
                <dd>{s.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
