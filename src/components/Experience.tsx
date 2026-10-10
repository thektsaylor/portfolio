import { education, experience } from "@/content/site";
import { SectionHead } from "./SectionHead";

type Entry = { years: string; role: string; org: string; summary: string };

function Timeline({ label, entries }: { label: string; entries: Entry[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
      <p className="text-xs tracking-[0.2em] text-ink/75 uppercase">{label}</p>
      <ol className="border-t border-ink/15">
        {entries.map((e) => (
          <li
            key={`${e.role}-${e.org}`}
            className="grid gap-x-8 gap-y-2 border-b border-ink/15 py-6 sm:grid-cols-[9rem_1fr]"
          >
            <span className="text-xs tracking-[0.2em] text-ink/75 uppercase sm:pt-1.5">{e.years}</span>
            <div>
              <h3 className="font-display text-xl font-extrabold tracking-[-0.03em] sm:text-2xl">{e.role}</h3>
              <p className="mt-1 text-sm text-forest">{e.org}</p>
              {e.summary && <p className="mt-3 max-w-2xl leading-relaxed text-ink/75">{e.summary}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 bg-mushroom">
      <div className="mx-auto max-w-6xl px-5 pt-24 pb-32 sm:px-8 sm:pt-28 sm:pb-40">
        <SectionHead index="03" title="Experience" />
        <div className="space-y-16">
          <Timeline label="Work" entries={experience} />
          <Timeline label="Education" entries={education} />
        </div>
      </div>
    </section>
  );
}
