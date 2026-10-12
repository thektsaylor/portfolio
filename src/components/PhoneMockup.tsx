"use client";

import { useEffect, useRef, useState } from "react";

// A drawn phone frame that loops a muted screen recording. It autoplays natively,
// then pauses whenever it scrolls offscreen and resumes when it comes back. When the
// browser blocks autoplay (iPhone Low Power Mode, data saver) or the visitor prefers
// reduced motion, a play button appears instead.
export function PhoneMockup({
  mp4,
  webm,
  poster,
  label,
}: {
  mp4: string;
  webm: string;
  poster: string;
  label: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);
  // Once someone presses play, keep it playing on screen like the autoplay would.
  const started = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // iOS checks the property, not just the attribute, before allowing muted autoplay.
    video.muted = true;
    // Respect reduced motion: show the first frame and let people press play themselves.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      video.pause();
      video.currentTime = 0;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return video.pause();
      if (reduceMotion && !started.current) return setBlocked(true);
      video.play().then(
        () => setBlocked(false),
        () => setBlocked(true),
      );
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  function playNow() {
    const video = videoRef.current;
    if (!video) return;
    started.current = true;
    video.muted = true;
    video.play().then(() => setBlocked(false), () => {});
  }

  return (
    <div className="relative rounded-[2.6rem] bg-ink p-[3.5%] shadow-[0_30px_60px_-20px_rgba(46,34,25,0.55)]">
      <div className="relative aspect-[540/1170] overflow-hidden rounded-[2.1rem] bg-paper">
        <video
          ref={videoRef}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={mp4} type='video/mp4; codecs="avc1.640028"' />
          <source src={webm} type='video/webm; codecs="vp9"' />
        </video>
        {blocked && (
          <button
            type="button"
            onClick={playNow}
            aria-label={`Play: ${label}`}
            className="absolute inset-0 grid place-items-center bg-ink/10 transition hover:bg-ink/0"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-paper/90 shadow-lg ring-1 ring-ink/10">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-ink" aria-hidden>
                <path d="M7 4.5v15l12-7.5z" />
              </svg>
            </span>
          </button>
        )}
        {/* Dynamic Island */}
        <span
          className="absolute top-[1.6%] left-1/2 h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-ink"
          aria-hidden
        />
      </div>
    </div>
  );
}
