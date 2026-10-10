import { site } from "@/content/site";

export function Contact() {
  const links = [
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "Instagram", href: site.links.instagram },
    { label: "Cathead on Instagram", href: site.links.catheadInstagram },
    { label: "GitHub", href: site.links.github },
  ];

  return (
    <section id="contact" className="scroll-mt-20 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <h2 className="font-display text-6xl leading-[0.95] font-extrabold tracking-tight sm:text-8xl">
          Let&apos;s make
          <br />
          something <span className="text-lime">good.</span>
        </h2>
        <p className="mt-6 max-w-xl text-lg text-paper/70">
          Internships, freelance sites, design work, or just talking shop. Find me here.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={site.resume}
            download
            className="rounded-full bg-lime px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5"
          >
            Download resume
          </a>
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border-2 border-paper/30 px-6 py-3 font-semibold transition hover:border-lime hover:text-lime"
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
              className="rounded-full border-2 border-paper/30 px-6 py-3 font-semibold transition hover:border-lime hover:text-lime"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
        <footer className="mt-24 flex flex-col justify-between gap-2 border-t border-paper/15 pt-6 text-sm text-paper/50 sm:flex-row">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Built with Next.js</span>
        </footer>
      </div>
    </section>
  );
}
