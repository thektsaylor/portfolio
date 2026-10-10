import { site } from "@/content/site";
import { Sun, Wave } from "./Decor";

export function Contact() {
  const links = [
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "Instagram", href: site.links.instagram },
    { label: "Cathead on Instagram", href: site.links.catheadInstagram },
    { label: "GitHub", href: site.links.github },
  ];

  return (
    <section id="contact" className="relative scroll-mt-20 bg-ink text-paper">
      <Wave className="absolute -top-[39px] left-0 h-10 w-full text-ink" />
      <div className="relative mx-auto max-w-6xl overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
        <Sun className="animate-spin-slow pointer-events-none absolute -top-10 -right-16 w-72 text-mustard/20 sm:w-96" />
        <h2 className="relative font-display text-6xl leading-[0.95] font-extrabold tracking-tight sm:text-8xl">
          Let&apos;s make
          <br />
          something <span className="text-leaf">good.</span>
        </h2>
        <p className="relative mt-6 max-w-xl text-lg text-paper/70">
          Internships, freelance sites, design work, or just talking shop. Find me here.
        </p>
        <div className="relative mt-10 flex flex-wrap gap-3">
          <a
            href={site.resume}
            download
            className="rounded-full bg-leaf px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5"
          >
            Download resume
          </a>
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border-2 border-paper/30 px-6 py-3 font-semibold transition hover:border-mustard hover:text-mustard"
            >
              Email me
            </a>
          )}
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-paper/30 px-6 py-3 font-semibold transition hover:border-mustard hover:text-mustard"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
        <footer className="relative mt-24 flex flex-col justify-between gap-2 border-t border-paper/15 pt-6 text-sm text-paper/50 sm:flex-row">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Built with Next.js</span>
        </footer>
      </div>
    </section>
  );
}
