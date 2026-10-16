import { nowItems, site, skills } from "@/content/site";
import { Collage } from "./Collage";
import { IndexCard } from "./IndexCard";
import { SectionHead } from "./SectionHead";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead title="About" tape="dots" tilt={1.2} />
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
          <IndexCard label="What I care about" style={{ marginInline: 0, rotate: "1.2deg" }}>
            I&apos;m interested in how people use intelligent systems, but bias, transparency, ethics, and
            security are all important to me. Knowing where automated logic still needs a creative, human
            touch is what turns good design into great design.
          </IndexCard>
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
