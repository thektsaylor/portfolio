import { nowItems, site, skills } from "@/content/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t-2 border-ink bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
            About me<span className="text-lime">.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            I live where design, tech, and people overlap. The psychology minor keeps me asking why
            users do what they do, the SEO job keeps me honest with real data, and the AI and security
            coursework keeps me curious about how all of it works under the hood.
          </p>
          <h3 className="mt-10 mb-4 text-sm font-bold tracking-widest text-forest uppercase">Right now</h3>
          <ul className="space-y-3">
            {nowItems.map((item) => (
              <li key={item} className="flex gap-3 text-lg">
                <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-lime" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            Based in {site.location}. Graduating {site.graduation}.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((s) => (
            <div key={s.group} className="rounded-3xl border-2 border-ink bg-paper p-6">
              <h3 className="font-display text-xl font-extrabold">{s.group}</h3>
              <ul className="mt-3 space-y-1.5 text-muted">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
