import { nowItems, site, skills } from "@/content/site";
import { Collage } from "./Collage";
import { SectionHead } from "./SectionHead";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead index="02" title="About" />
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div className="space-y-10 text-sm">
          <Collage />
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
          <p className="font-display text-3xl leading-snug font-semibold tracking-[-0.03em] sm:text-4xl">
            I&apos;m as interested in how intelligent systems get built as in{" "}
            <span className="text-forest">how people actually use them</span>. That means thinking about
            bias, transparency, privacy, and security from the start, and knowing exactly where automated
            logic still needs a creative, human touch.
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
