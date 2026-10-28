import { site } from "@/content/site";

// home: where the name links. the homepage scrolls to #top; other pages send it back to "/"
export function Nav({ home = "#top" }: { home?: string }) {
  return (
    <header className="nav-bar sticky top-0 z-50 pb-3">
      <nav className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-5 py-4 sm:px-8">
        <a href={home} className="justify-self-start font-display text-lg font-extrabold tracking-[-0.03em]">
          {site.name}
          <span className="text-leaf">.</span>
        </a>
        {/* centered between the name and the right side */}
        <span className="hidden text-xs tracking-[0.2em] text-muted uppercase md:block">Design · Data</span>
        <div className="col-start-3 flex items-center gap-6 justify-self-end">
          <span className="hidden text-xs tracking-[0.2em] text-muted uppercase sm:block">
            Open to UX &amp; MarTech roles
          </span>
          <a
            href={site.resume}
            download
            className="squiggle-link text-sm font-semibold transition hover:text-forest"
          >
            Resume <span className="arrow arrow-s" aria-hidden>↓</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
