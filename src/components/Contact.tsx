import { site } from "@/content/site";
import { Wave } from "./Decor";

export function Contact() {
  const links = [
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "Instagram", href: site.links.instagram },
    { label: "CatHead on Instagram", href: site.links.catheadInstagram },
    { label: "GitHub", href: site.links.github },
  ];

  return (
    <section id="contact" className="relative scroll-mt-20 bg-ink text-paper">
      <Wave className="absolute -top-[39px] left-0 h-10 w-full text-ink" />
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <p className="text-xs tracking-[0.2em] text-paper/50 uppercase">
          <span className="text-leaf">03</span>
          <span className="mx-2">/</span>
          Contact
        </p>
        <h2 className="mt-8 font-display text-6xl leading-[0.95] font-extrabold tracking-tight sm:text-8xl">
          Let&apos;s make
          <br />
          something <span className="text-leaf">good.</span>
        </h2>
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="max-w-xs text-paper/70">
              Internships, design roles, or just talking shop.
            </p>
            <a
              href={site.resume}
              download
              className="mt-6 inline-block rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-ink transition hover:bg-paper"
            >
              Download resume
            </a>
          </div>
          <ul className="border-t border-paper/15">
            {site.email && (
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center justify-between border-b border-paper/15 py-5 font-display text-2xl font-semibold transition hover:text-leaf"
                >
                  Email <span aria-hidden>↗</span>
                </a>
              </li>
            )}
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border-b border-paper/15 py-5 font-display text-2xl font-semibold transition hover:text-leaf"
                >
                  {link.label} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <footer className="mt-24 flex flex-col justify-between gap-2 text-xs tracking-[0.2em] text-paper/40 uppercase sm:flex-row">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Built with Next.js</span>
        </footer>
      </div>
    </section>
  );
}
