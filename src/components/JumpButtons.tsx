// About, Experience and Scrapbook jump links, inked like rubber stamps.
// next to See my work on desktop, under the hero on phones
export function JumpButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <a href="#about" className="btn-stamp">
        About
      </a>
      <a href="#experience" className="btn-stamp green">
        Experience
      </a>
      <a href="#odds" className="btn-stamp">
        Scrapbook
      </a>
    </div>
  );
}
