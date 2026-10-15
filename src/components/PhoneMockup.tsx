"use client";

import { useEffect, useRef, useState } from "react";

// phone frame looping a muted screen recording, plays while on screen.
// pause is always there (WCAG 2.2.2). reduced motion or blocked autoplay
// (looking at you, iPhone low power mode) = wait for a tap on play
export function PhoneMockup({ video, label }: { video: { mp4: string; poster: string }; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // hide play until autoplay settles so it doesn't flash
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    // iOS checks the property, not just the attribute, before it allows muted autoplay
    el.muted = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return el.pause();
      if (reduceMotion) return setSettled(true);
      el.play().catch(() => {}).finally(() => setSettled(true));
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function toggle() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  }

  return (
    <div className="phone">
      <div className="phone-screen">
        <video
          ref={videoRef}
          src={video.mp4}
          poster={video.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />
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
        <span className="island" aria-hidden />
      </div>
    </div>
  );
}
