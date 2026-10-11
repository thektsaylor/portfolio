// A drawn browser window. The page is a tall screenshot that scrolls from top to
// bottom while the card is hovered, like someone browsing the site.
// The address bar stays generic so client domains never appear in the page text.
export function BrowserMockup({ screenshot, label }: { screenshot: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-xl bg-paper shadow-[0_30px_60px_-20px_rgba(46,34,25,0.55)] ring-1 ring-ink/15">
      <div className="flex items-center gap-2 border-b border-ink/10 bg-sand px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-terracotta/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-mustard/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-leaf/70" />
        </span>
        <span className="ml-2 flex-1 truncate rounded-full bg-paper px-3 py-0.5 text-center text-[0.65rem] text-muted">
          client site
        </span>
      </div>
      <div
        role="img"
        aria-label={label}
        className="site-scroll aspect-[4/5] bg-cover bg-top"
        style={{ backgroundImage: `url(${screenshot})` }}
      />
    </div>
  );
}
