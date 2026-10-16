// About + Experience jump links. sit next to See my work on desktop, under the hero on phones
export function JumpButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <a href="#about" className="btn-offset">
        About <span className="arrow arrow-e" aria-hidden>→</span>
      </a>
      <a href="#experience" className="btn-offset leaf">
        Experience <span className="arrow arrow-e" aria-hidden>→</span>
      </a>
    </div>
  );
}
