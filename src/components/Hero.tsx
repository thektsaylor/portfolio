import { site } from "@/content/site";
import { Squiggle } from "./Decor";
import { IntroCard } from "./IndexCard";
import { InstantPhoto } from "./InstantPhoto";
import { JumpButtons } from "./JumpButtons";

export function Hero() {
  return (
    <section id="top" className="hero-paper mx-auto max-w-6xl px-5 pt-10 pb-10 sm:px-8 sm:pb-8">
      {/* phones only: the nav is too narrow for this, so it sits above the portrait */}
      <p className="text-center text-xs tracking-[0.2em] text-muted uppercase sm:hidden">
        Open to UX &amp; MarTech roles
      </p>

      {/* phones: portrait on top. lg+: floats right as an instax print, headline wraps it (.arch-wrap) */}
      <div className="mt-6 sm:mt-10 lg:mt-12">
        <div className="arch-wrap mx-auto mb-10 w-full max-w-[11rem] sm:max-w-[13rem] lg:float-right lg:mb-0 lg:ml-6 lg:max-w-[16.5rem]">
          <div className="rotate-[2.5deg]">
            <InstantPhoto film="instax" src={site.headshot} alt={site.name} sizes="(min-width: 1024px) 15rem, 12rem" priority>
              <span className="washi washi-sage" style={{ top: "-0.6rem", width: "38%" }} aria-hidden />
            </InstantPhoto>
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
