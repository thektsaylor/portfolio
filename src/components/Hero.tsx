import Image from "next/image";
import { site } from "@/content/site";
import { Squiggle } from "./Decor";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pt-10 pb-24 sm:px-8 sm:pb-32">
      {/* Masthead meta row */}
      <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 text-xs tracking-[0.2em] text-muted uppercase">
        <span>Portfolio / {new Date().getFullYear()}</span>
        <span>Design · Data · AI</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-leaf" aria-hidden />
          Open to data &amp; UX roles
        </span>
      </div>

      <div className="mt-16 grid items-end gap-12 sm:mt-24 lg:grid-cols-[1.6fr_1fr]">
        <h1 className="font-display text-6xl leading-[0.9] font-extrabold tracking-tight sm:text-8xl">
          Hi, I&apos;m {site.name.split(" ")[0]}.
          <br />
          I make things{" "}
          <span className="relative inline-block whitespace-nowrap text-forest">
            look good
            <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-leaf sm:-bottom-3 sm:h-4" />
          </span>
          <br />
          and make sense.
        </h1>

        {/* The one boho moment: an arched portrait */}
        <div className="mx-auto w-full max-w-[11rem] sm:max-w-[14rem] lg:mr-0 lg:max-w-[18rem]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-sand">
            <Image
              src={site.headshot}
              alt={`Portrait of ${site.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 18rem, 14rem"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-8 border-t border-line pt-8 sm:mt-20 lg:grid-cols-[1fr_2fr]">
        <p className="text-xs tracking-[0.2em] text-muted uppercase">Introduction</p>
        <div>
          <p className="max-w-2xl text-lg leading-relaxed sm:text-xl">{site.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-forest"
            >
              See my work
            </a>
            <a
              href={site.resume}
              download
              className="rounded-full border border-ink px-6 py-3 text-sm font-semibold transition hover:border-forest hover:text-forest"
            >
              Download resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
