import { site } from "@/content/site";
import { Rainbow, Sprig, Squiggle, Sun } from "./Decor";

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28 lg:grid-cols-[1.4fr_1fr]"
    >
      <div>
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-sm font-medium text-muted">
          <span className="h-2 w-2 rounded-full bg-leaf" aria-hidden />
          Open to internships and freelance work
        </p>
        <h1 className="font-display text-6xl leading-[0.95] font-extrabold tracking-tight sm:text-8xl">
          Hi, I&apos;m {site.name.split(" ")[0]}.
          <br />
          I make things{" "}
          <span className="relative inline-block whitespace-nowrap text-forest">
            look good
            <Squiggle className="absolute -bottom-3 left-0 h-4 w-full text-leaf sm:-bottom-4 sm:h-5" />
          </span>
          <br />
          and make sense.
        </h1>
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{site.intro}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#work"
            className="rounded-full bg-leaf px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-forest)]"
          >
            See my work
          </a>
          <a
            href={site.resume}
            download
            className="rounded-full border-2 border-ink px-6 py-3 font-semibold transition hover:bg-ink hover:text-paper"
          >
            Download resume
          </a>
        </div>
      </div>

      {/* Arched window with a slow-turning sun */}
      <div className="relative mx-auto w-full max-w-[15rem] sm:max-w-sm" aria-hidden>
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] border-2 border-ink bg-sand">
          <Sun className="animate-spin-slow absolute top-[14%] left-1/2 w-1/2 -translate-x-1/2 text-mustard" />
          <Rainbow className="absolute -bottom-1 left-1/2 w-[115%] -translate-x-1/2" />
        </div>
        <Sprig className="absolute -bottom-6 -left-10 h-48 -rotate-12 text-forest" />
        <Sprig className="absolute -right-8 bottom-10 h-36 rotate-[20deg] text-terracotta" />
      </div>
    </section>
  );
}
