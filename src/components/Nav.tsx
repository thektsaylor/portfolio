import { site } from "@/content/site";
import { WaveLine } from "./Decor";

const items = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur">
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="font-display text-lg font-extrabold tracking-[-0.03em]">
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
        <WaveLine className="absolute inset-x-0 -bottom-1 h-2 w-full text-line sm:-bottom-1.5 sm:h-3" />
      </nav>
    </header>
  );
}
