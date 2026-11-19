import Image from "next/image";

// instant-film prints: the photo sits under a frame image whose window is cut out.
// window insets (left, top, right, bottom) are % of the card, from the real film sizes
const films = {
  // instax mini: 54 x 86 mm card, 46 x 62 mm picture
  instax: { src: "/paper/instax-mini.webp", ratio: "54 / 86", window: ["7.407%", "8.14%", "7.407%", "19.767%"] },
  // polaroid 600: 88 x 107 mm card, 79 x 79 mm picture
  polaroid: { src: "/paper/polaroid.webp", ratio: "88 / 107", window: ["5.114%", "5.607%", "5.114%", "20.561%"] },
} as const;

export function InstantPhoto({
  film,
  src,
  alt,
  sizes,
  priority = false,
  photoClassName = "",
  children,
}: {
  film: keyof typeof films;
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  photoClassName?: string;
  // extra bits on the print, like a caption or tape
  children?: React.ReactNode;
}) {
  const f = films[film];
  const [left, top, right, bottom] = f.window;
  return (
    <div className="relative drop-shadow-[0_10px_14px_rgba(46,34,25,0.3)]" style={{ aspectRatio: f.ratio }}>
      <div className="absolute overflow-hidden bg-sand" style={{ left, top, right, bottom }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${photoClassName}`} />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element -- static frame overlay, no resizing needed */}
      <img src={f.src} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
      {children}
    </div>
  );
}
