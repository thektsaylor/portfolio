import { education, experience } from "@/content/site";
import { SectionHead } from "./SectionHead";

type Entry = { years: string; role: string; org: string; summary: string };

function Timeline({ label, entries }: { label: string; entries: Entry[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
      <p className="text-xs tracking-[0.2em] text-ink/75 uppercase">{label}</p>
      <ol className="border-t border-ink/15">
        {entries.map((e) => (
          <li key={`${e.role}-${e.org}`} className="border-b border-ink/15">
            {/* date + title up front, the rest tucks into a native dropdown */}
            <details className="group">
              <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-start gap-x-8 gap-y-2 py-6 sm:grid-cols-[9rem_1fr_auto] [&::-webkit-details-marker]:hidden">
                <span className="col-span-2 text-xs tracking-[0.2em] text-ink/75 uppercase sm:col-span-1 sm:pt-1.5">
                  {e.years}
                </span>
                <h3 className="font-display text-xl font-extrabold tracking-[-0.03em] transition group-hover:text-forest sm:text-2xl">
                  {e.role}
                </h3>
                <span
                  className="mt-1 grid h-7 w-7 place-items-center rounded-full ring-1 ring-ink/20 transition group-open:rotate-45 group-hover:ring-forest"
                  aria-hidden
                >
                  <svg viewBox="0 0 12 12" className="h-3 w-3 stroke-current" strokeWidth="1.5" fill="none">
                    <path d="M6 1v10M1 6h10" />
                  </svg>
                </span>
              </summary>
              <div className="-mt-2 pb-6 sm:ml-[calc(9rem+2rem)] sm:pr-15">
                <p className="text-sm text-forest">{e.org}</p>
                {e.summary && <p className="mt-3 max-w-2xl leading-relaxed text-ink/75">{e.summary}</p>}
              </div>
            </details>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Experience() {
  // background fades in from the paper color above instead of a hard edge
  return (
    <section
      id="experience"
      className="scroll-mt-20 bg-[linear-gradient(to_bottom,var(--color-paper),var(--color-mushroom)_16rem)]"
    >
      <div className="mx-auto max-w-6xl px-5 pt-24 pb-32 sm:px-8 sm:pt-28 sm:pb-40">
        <SectionHead title="Experience" tape="fiber" />
        <div className="space-y-16">
          <Timeline label="Work" entries={experience} />
          <Timeline label="Education" entries={education} />
        </div>
      </div>
    </section>
  );
}
