import { site } from "@/content/site";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-28 sm:pb-28">
      <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-sm font-medium text-muted">
        <span className="h-2 w-2 rounded-full bg-lime" aria-hidden />
        Open to internships and freelance work
      </p>
      <h1 className="font-display text-6xl leading-[0.95] font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
        Hi, I&apos;m {site.name.split(" ")[0]}.
        <br />
        I make things{" "}
        <span className="relative whitespace-nowrap">
          <span className="relative z-10">look good</span>
          <span
            className="absolute inset-x-0 bottom-[0.08em] -z-0 h-[0.35em] -rotate-1 bg-lime"
            aria-hidden
          />
        </span>
        <br />
        and make sense.
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{site.intro}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href="#work"
          className="rounded-full bg-lime px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-ink)]"
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
    </section>
  );
}
