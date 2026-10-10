import { nowItems, site, skills } from "@/content/site";
import { Sprig, Wave } from "./Decor";

const cardColors = ["bg-leaf-soft", "bg-clay/60", "bg-mustard/40", "bg-paper"];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 bg-sand">
      <Wave className="absolute -top-[39px] left-0 h-10 w-full text-sand" />
      <div className="relative mx-auto grid max-w-6xl gap-12 overflow-hidden px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
            About me<span className="text-terracotta">.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            I live where design, tech, and people overlap. The psychology minor keeps me asking why
            users do what they do, the SEO job keeps me honest with real data, and the AI and security
            coursework keeps me curious about how all of it works under the hood.
          </p>
          <h3 className="mt-10 mb-4 text-sm font-bold tracking-widest text-terracotta uppercase">Right now</h3>
          <ul className="space-y-3">
            {nowItems.map((item) => (
              <li key={item} className="flex gap-3 text-lg">
                <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-forest" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            Based in {site.location}. Graduating {site.graduation}.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {skills.map((s, i) => (
            <div
              key={s.group}
              className={`rounded-t-[5rem] rounded-b-3xl border-2 border-ink px-5 pt-10 pb-6 text-center ${cardColors[i % cardColors.length]}`}
            >
              <h3 className="font-display text-xl font-extrabold">{s.group}</h3>
              <ul className="mt-3 space-y-1.5 text-muted">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Sprig className="pointer-events-none absolute -right-6 -bottom-8 hidden h-56 rotate-12 text-forest/30 lg:block" />
      </div>
    </section>
  );
}
