import { education, experience } from "@/content/site";
import { SectionHead } from "./SectionHead";

type Entry = { years: string; role: string; org: string; summary: string };

function Timeline({ label, entries }: { label: string; entries: Entry[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">{label}</p>
      <ol className="border-t border-line">
        {entries.map((e) => (
          <li
            key={`${e.role}-${e.org}`}
            className="grid gap-x-8 gap-y-2 border-b border-line py-6 sm:grid-cols-[9rem_1fr]"
          >
            <span className="text-xs tracking-[0.2em] text-muted uppercase sm:pt-1.5">{e.years}</span>
            <div>
              <h3 className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">{e.role}</h3>
              <p className="mt-1 text-sm text-forest">{e.org}</p>
              {e.summary && <p className="mt-3 max-w-2xl leading-relaxed text-muted">{e.summary}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-8 pb-28 sm:px-8 sm:pb-36">
      <SectionHead index="03" title="Experience" />
      <div className="space-y-16">
        <Timeline label="Work" entries={experience} />
        <Timeline label="Education" entries={education} />
      </div>
    </section>
  );
}
