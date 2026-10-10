import { site } from "@/content/site";

const items = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between border-b border-line px-5 py-4 sm:px-8">
        <a href="#top" className="font-display text-lg font-extrabold tracking-tight">
          {site.name}
          <span className="text-leaf">.</span>
        </a>
        <div className="flex items-center gap-6">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden text-sm text-muted transition hover:text-ink sm:block"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.resume}
            download
            className="text-sm font-semibold underline decoration-leaf decoration-2 underline-offset-4 transition hover:text-forest"
          >
            Resume ↓
          </a>
        </div>
      </nav>
    </header>
  );
}
