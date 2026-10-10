import { site } from "@/content/site";

const items = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="font-display text-xl font-extrabold tracking-tight">
          kt<span className="text-forest">.</span>
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-muted transition hover:text-ink sm:block"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.resume}
            download
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition hover:bg-forest"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
