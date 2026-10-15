"use client";

import { useEffect, useRef, useState } from "react";

// A drawn phone frame that loops a muted screen recording. It plays while on screen,
// and a pause button stays available the whole time (WCAG 2.2.2). If the visitor
// pauses it, prefers reduced motion, or the browser blocks autoplay (iPhone Low Power
// Mode), it waits for a tap on the play button instead.
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
  const [playing, setPlaying] = useState(false);
  // Hide the play button until the first autoplay attempt settles, so it doesn't flash.
  const [settled, setSettled] = useState(false);
  const wantsPlay = useRef(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // iOS checks the property, not just the attribute, before allowing muted autoplay.
    video.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) wantsPlay.current = false;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return video.pause();
      if (!wantsPlay.current) return setSettled(true);
      video.play().catch(() => {}).finally(() => setSettled(true));
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    wantsPlay.current = video.paused;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }

  return (
    <div className="relative rounded-[2.6rem] bg-ink p-[3.5%] shadow-[0_30px_60px_-20px_rgba(46,34,25,0.55)]">
      <div className="relative aspect-[540/1170] overflow-hidden rounded-[2.1rem] bg-paper">
        <video
          ref={videoRef}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={mp4} type="video/mp4" />
          <source src={webm} type="video/webm" />
        </video>
        {playing ? (
          <button
            type="button"
            onClick={toggle}
            aria-label="Pause the demo"
            className="absolute right-3 bottom-3 grid h-9 w-9 place-items-center rounded-full bg-paper/85 shadow ring-1 ring-ink/10 transition hover:bg-paper"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-ink" aria-hidden>
              <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
            </svg>
          </button>
        ) : (
          settled && (
            <button
              type="button"
              onClick={toggle}
              aria-label="Play the demo"
              className="absolute inset-0 grid place-items-center bg-ink/10 transition hover:bg-ink/0"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-paper/90 shadow-lg ring-1 ring-ink/10">
                <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-ink" aria-hidden>
                  <path d="M7 4.5v15l12-7.5z" />
                </svg>
              </span>
            </button>
          )
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
