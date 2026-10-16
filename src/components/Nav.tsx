import { site } from "@/content/site";

export function Nav() {
  return (
    <header className="nav-bar sticky top-0 z-50 pb-3">
      <nav className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-5 py-4 sm:px-8">
        <a href="#top" className="justify-self-start font-display text-lg font-extrabold tracking-[-0.03em]">
          {site.name}
          <span className="text-leaf">.</span>
        </a>
        {/* centered between the name and the right side */}
        <span className="hidden text-xs tracking-[0.2em] text-muted uppercase md:block">Design · Data</span>
        <div className="col-start-3 flex items-center gap-6 justify-self-end">
          <span className="hidden items-center gap-2 text-xs tracking-[0.2em] text-muted uppercase sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-leaf" aria-hidden />
            Open to UX &amp; MarTech roles
          </span>
          <a
            href={site.resume}
            download
            className="text-sm font-semibold underline decoration-leaf decoration-2 underline-offset-4 transition hover:text-forest"
          >
            Resume <span className="arrow arrow-s" aria-hidden>↓</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
