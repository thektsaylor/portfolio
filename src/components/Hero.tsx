import Image from "next/image";
import { site } from "@/content/site";
import { Squiggle } from "./Decor";
import { IntroCard } from "./IndexCard";
import { JumpButtons } from "./JumpButtons";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pt-10 pb-10 sm:px-8 sm:pb-8">
      {/* phones only: the nav is too narrow for this, so it sits above the portrait */}
      <p className="flex items-center justify-center gap-2 text-xs tracking-[0.2em] text-muted uppercase sm:hidden">
        <span className="h-1.5 w-1.5 rounded-full bg-leaf" aria-hidden />
        Open to UX &amp; MarTech roles
      </p>

      {/* phones: portrait on top. lg+: floats right, headline wraps the arch (.arch-wrap) */}
      <div className="mt-6 sm:mt-10 lg:mt-12">
        <div className="arch-wrap mx-auto mb-10 w-full max-w-[11rem] sm:max-w-[14rem] lg:float-right lg:mb-0 lg:ml-4 lg:max-w-[19rem]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-sand">
            <Image
              src={site.headshot}
              alt={site.name}
              fill
              priority
              sizes="(min-width: 1024px) 19rem, 14rem"
              className="object-cover"
            />
          </div>
        </div>
        <h1 className="font-display text-5xl leading-[1.08] font-extrabold tracking-tight sm:text-8xl sm:leading-[0.9] text-center lg:pt-4 lg:text-right lg:text-[7.25rem]">
          Hi, I&apos;m {site.name.split(" ")[0]}. I&nbsp;make things{" "}
          <span className="relative inline-block whitespace-nowrap">
            look good
            <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-leaf sm:-bottom-3 sm:h-4" />
          </span>{" "}
          and make sense.
        </h1>
        <div className="clear-both" />
      </div>

      {/* phones only: intro card + jump buttons. desktop has these in the work section */}
      <div className="mt-12 space-y-10 sm:hidden">
        <IntroCard />
        <JumpButtons />
      </div>
    </section>
  );
}
