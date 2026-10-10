"use client";

import { useEffect, useRef } from "react";

// A drawn phone frame that loops a muted screen recording. It autoplays natively,
// then pauses whenever it scrolls offscreen and resumes when it comes back.
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Respect reduced motion: show the first frame and let people press play themselves.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      video.currentTime = 0;
      video.controls = true;
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

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
        {/* Dynamic Island */}
        <span
          className="absolute top-[1.6%] left-1/2 h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-ink"
          aria-hidden
        />
      </div>
    </div>
  );
}
