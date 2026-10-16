import { site } from "@/content/site";
import { Wave } from "./Decor";

export function Contact() {
  const links = [
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "CatHead on Instagram", href: site.links.catheadInstagram },
    { label: "GitHub", href: site.links.github },
  ];

  return (
    <section id="contact" className="relative scroll-mt-20 bg-ink text-paper">
      <Wave className="absolute -top-[39px] left-0 h-10 w-full text-ink" />
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-8 sm:px-8 sm:pt-20 sm:pb-10">
        <h2 className="font-display text-6xl leading-[0.9] font-extrabold tracking-tight sm:text-7xl">
          Let&apos;s make
          <br />
          something <span className="text-leaf">good.</span>
        </h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="max-w-xs text-paper/70">
              UX &amp; MarTech roles, or coffee &amp; shop talk.
            </p>
            <a
              href={site.resume}
              download
              className="btn-offset leaf on-ink mt-6"
            >
              Download resume
            </a>
          </div>
          <ul>
            {site.email && (
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-3 py-3 font-display text-2xl font-semibold transition hover:text-leaf"
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
                  className="inline-flex items-center gap-3 py-3 font-display text-2xl font-semibold transition hover:text-leaf"
                >
                  {link.label} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <footer className="mt-12 flex flex-col justify-between gap-2 text-xs tracking-[0.2em] text-paper/40 uppercase sm:flex-row">
          <span>© {new Date().getFullYear()} {site.name}</span>
        </footer>
      </div>
    </section>
  );
}
