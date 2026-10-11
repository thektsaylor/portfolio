import Image from "next/image";
import { site } from "@/content/site";
import { Squiggle } from "./Decor";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pt-10 pb-24 sm:px-8 sm:pb-32">
      {/* Masthead meta row */}
      <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 text-xs tracking-[0.2em] text-muted uppercase">
        <span>Portfolio / {new Date().getFullYear()}</span>
        <span>Design · Data</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-leaf" aria-hidden />
          Open to UX &amp; MarTech roles
        </span>
      </div>

      {/* Below lg the portrait sits above the headline; from lg up it floats right and the
          headline wraps around its arch (see .arch-wrap in globals.css). */}
      <div className="mt-12 sm:mt-20 lg:mt-24">
        <div className="arch-wrap mx-auto mb-10 w-full max-w-[11rem] sm:max-w-[14rem] lg:float-right lg:mb-0 lg:ml-4 lg:max-w-[19rem]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-sand">
            <Image
              src={site.headshot}
              alt={`Portrait of ${site.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 19rem, 14rem"
              className="object-cover"
            />
          </div>
        </div>
        <h1 className="font-display text-6xl leading-[1.08] font-extrabold tracking-tight sm:text-8xl sm:leading-[0.9] text-center lg:pt-4 lg:text-right lg:text-[7.25rem]">
          Hi, I&apos;m {site.name.split(" ")[0]}. I&nbsp;make things{" "}
          <span className="relative inline-block whitespace-nowrap text-forest">
            look good
            <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-leaf sm:-bottom-3 sm:h-4" />
          </span>{" "}
          and make sense.
        </h1>
        <div className="clear-both" />
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
