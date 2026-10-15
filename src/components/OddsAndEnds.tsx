import Image from "next/image";
import { Draggable } from "./Draggable";
import { Masthead } from "./Masthead";

// An open junk-journal spread: small print and logo work layered over ledger and
// graph paper with pressed botanicals, a knitted swatch, washi tape, clips, and stamps.
// Every piece can be picked up and moved with a mouse. Addresses and phone numbers
// on the pieces are blurred.

type Frame = "plain" | "stamp" | "torn" | "sticker" | "botanical" | "knit";
type Tape = "kraft" | "cream" | "sage" | "rose";

// Loose paper glued down under the pieces: same placement fields, plus width / height.
type Scrap = {
  kind: "kraft" | "ticket";
  ratio: number;
  d: [number, number, number, number, number];
  m?: [number, number, number, number, number];
};

const scraps: Scrap[] = [
  // The logo stickers sit on this sheet of kraft paper
  { kind: "kraft", ratio: 0.75, d: [43, 70.5, 27.5, 4, 2], m: [382, 6, 88, 3, 2] },
  { kind: "ticket", ratio: 0.42, d: [84, 40, 9, 4, 21], m: [470, 60, 30, 4, 21] },
];

type Piece = {
  src: string;
  w: number;
  h: number;
  alt: string;
  frame: Frame;
  // Desktop: top and left as % of the spread, width as % of its width, tilt, layer.
  d: [number, number, number, number, number];
  // Phones (optional): top in units of a 100-wide by MOBILE_H-tall page, then the same fields.
  m?: [number, number, number, number, number];
  tape?: Tape;
  clip?: boolean;
  binder?: boolean;
};

const MOBILE_H = 492;

const pieces: Piece[] = [
  // Print work
  { src: "/odds/fall-festival.webp", w: 387, h: 516, alt: "Fall birthday poster", frame: "plain", binder: true, d: [3, 3, 14, -4, 10], m: [4, 4, 44, -3, 10] },
  { src: "/odds/thanksgiving.webp", w: 377, h: 528, alt: "Thanksgiving invitation", frame: "stamp", d: [5, 16.5, 13, 3, 11], m: [10, 52, 43, 3, 11] },
  { src: "/odds/knit-swatch.webp", w: 900, h: 605, alt: "Knitted swatch", frame: "knit", d: [10, 30.5, 18.5, -3, 14], m: [196, 8, 80, -3, 14] },
  { src: "/odds/cookbook.webp", w: 1000, h: 591, alt: "Family cookbook cover", frame: "plain", tape: "rose", d: [7, 52.5, 24, -2, 12], m: [322, 4, 90, -2, 12] },
  { src: "/odds/brand-board.webp", w: 344, h: 581, alt: "Home inspection brand board", frame: "plain", tape: "sage", d: [3, 83, 12, 4, 11], m: [250, 54, 38, 3, 11] },
  { src: "/odds/secrets.webp", w: 632, h: 316, alt: "Women Who Smuggled Secrets header", frame: "torn", tape: "cream", d: [52, 2, 21, -2, 12], m: [76, 6, 88, -2, 12] },
  { src: "/odds/weenie.webp", w: 377, h: 528, alt: "Hot dog birthday invitation", frame: "plain", clip: true, d: [44, 24, 13, 5, 13], m: [132, 52, 42, -4, 13] },
  { src: "/odds/bbq.webp", w: 376, h: 532, alt: "Fourth of July BBQ poster", frame: "stamp", d: [38, 39, 13, -3, 10], m: [126, 5, 43, 2, 10] },
  { src: "/odds/tea.webp", w: 377, h: 528, alt: "Bridal tea invitation", frame: "torn", d: [42, 56, 12.5, 2, 13], m: [256, 6, 43, -2, 13] },

  // Logo stickers, stuck on the kraft paper
  { src: "/odds/rapscallion.webp", w: 520, h: 195, alt: "Rapscallion Station logo", frame: "sticker", d: [46, 72, 14, -4, 20], m: [386, 10, 50, -4, 20] },
  { src: "/odds/slipstitch.webp", w: 499, h: 520, alt: "Slip Stitch logo", frame: "sticker", d: [64, 87, 8.5, 8, 20], m: [384, 66, 26, 8, 20] },
  { src: "/odds/logistics-logo.webp", w: 420, h: 316, alt: "Logistics company logo", frame: "sticker", d: [60, 71.5, 7, 6, 20], m: [408, 10, 22, 6, 20] },
  { src: "/odds/sailor.webp", w: 151, h: 197, alt: "Sailor logo", frame: "sticker", d: [71, 72, 4, -6, 20], m: [410, 36, 12, -6, 20] },

  { src: "/odds/truck-patch.webp", w: 360, h: 360, alt: "Truck Patch logo", frame: "sticker", d: [45, 87.5, 8.5, 8, 20], m: [410, 50, 22, 8, 20] },
  { src: "/odds/sheep.webp", w: 279, h: 340, alt: "Fiberglass sheep", frame: "sticker", d: [54, 79.5, 6.5, -6, 20], m: [430, 74, 20, -6, 20] },
  { src: "/odds/cathead.webp", w: 400, h: 372, alt: "CatHead logo", frame: "sticker", d: [73.5, 81, 7.5, -5, 21], m: [446, 54, 22, -5, 20] },
  { src: "/odds/saylor-made.webp", w: 520, h: 171, alt: "Saylor Made logo", frame: "sticker", d: [81, 70.5, 10.5, -3, 20], m: [440, 10, 44, -3, 20] },

  // Pressed botanicals, some tucked under the pieces and some laid on top
  { src: "/odds/bot/sweetgum.webp", w: 294, h: 240, alt: "", frame: "botanical", d: [79, 7, 8, 20, 4], m: [190, 70, 24, 20, 4] },
  { src: "/odds/bot/sweetgum-2.webp", w: 289, h: 244, alt: "", frame: "botanical", d: [30, 76, 7, -15, 3] },
  { src: "/odds/bot/rose-peach.webp", w: 240, h: 229, alt: "", frame: "botanical", d: [36, 68.5, 5, 12, 5], m: [300, 86, 13, 12, 25] },
  { src: "/odds/bot/cosmos.webp", w: 187, h: 184, alt: "", frame: "botanical", d: [76, 50, 4.5, -8, 25], m: [52, 2, 12, -8, 25] },
  { src: "/odds/bot/dandelion-2.webp", w: 186, h: 185, alt: "", frame: "botanical", d: [78, 30, 4.5, 10, 5] },
  { src: "/odds/bot/skeleton-leaf.webp", w: 144, h: 219, alt: "", frame: "botanical", d: [16, 28.5, 4, -20, 5], m: [244, 42, 13, -20, 25] },
  { src: "/odds/bot/rose-peach.webp", w: 240, h: 229, alt: "", frame: "botanical", d: [40, 0.5, 6.5, 0, 25], m: [116, 2, 18, 0, 25] },
  { src: "/odds/bot/rose-gold.webp", w: 162, h: 170, alt: "", frame: "botanical", d: [84, 60, 5, 15, 25], m: [472, 8, 14, 15, 25] },
  { src: "/odds/bot/dandelion.webp", w: 182, h: 189, alt: "", frame: "botanical", d: [88, 92, 4.5, 0, 25], m: [186, 4, 14, 0, 25] },
  { src: "/odds/bot/dandelion-2.webp", w: 186, h: 185, alt: "", frame: "botanical", d: [28, 49, 4, 0, 25] },
  { src: "/odds/bot/cosmos.webp", w: 187, h: 184, alt: "", frame: "botanical", d: [82, 24.5, 5, 10, 25], m: [364, 84, 13, 10, 25] },
  { src: "/odds/bot/cosmos-2.webp", w: 205, h: 230, alt: "", frame: "botanical", d: [64, 52.5, 4.5, -10, 25] },
  { src: "/odds/bot/marigold.webp", w: 169, h: 290, alt: "", frame: "botanical", d: [24, 47, 3, 8, 25], m: [22, 88, 9, 8, 25] },
  { src: "/odds/bot/daisy-stem.webp", w: 100, h: 295, alt: "", frame: "botanical", d: [50, 96.5, 2.4, -6, 25] },
  { src: "/odds/bot/pasque.webp", w: 165, h: 298, alt: "", frame: "botanical", d: [3, 0.3, 3.5, 8, 25] },
  { src: "/odds/bot/rosebud.webp", w: 121, h: 207, alt: "", frame: "botanical", d: [86, 68, 3, 30, 25], m: [474, 90, 8, 30, 25] },
  { src: "/odds/bot/tulip.webp", w: 105, h: 113, alt: "", frame: "botanical", d: [38, 21, 3, -12, 25] },
  { src: "/odds/bot/pansy.webp", w: 86, h: 87, alt: "", frame: "botanical", d: [12, 29.5, 2.2, 0, 25], m: [124, 92, 6, 0, 25] },
];

// Ragged edges for torn paper, generated once so they match between renders.
function tornPath(seed: number) {
  let s = seed;
  const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const top: string[] = [];
  const bottom: string[] = [];
  for (let x = 0; x <= 100; x += 4) top.push(`${x}% ${(rand() * 3).toFixed(1)}%`);
  for (let x = 100; x >= 0; x -= 4) bottom.push(`${x}% ${(97 + rand() * 3).toFixed(1)}%`);
  return `polygon(${[...top, ...bottom].join(",")})`;
}

export function OddsAndEnds() {
  return (
    <section id="odds" className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
      {/* The lookbook title overlaps the top edge of the spread like a magazine masthead */}
      <div className="relative z-30 -mb-7 sm:-mb-9">
        <Masthead />
      </div>
      <div className="journal relative mx-auto aspect-[100/492] max-w-5xl overflow-hidden rounded-md shadow-[0_40px_70px_-35px_rgba(46,34,25,0.6)] md:aspect-[11/5]">
        {/* Paper: ledger lines on the left page, graph paper on the right, a gutter between */}
        <div className="journal-ledger absolute inset-y-0 left-0 hidden w-1/2 md:block" aria-hidden />
        <div className="journal-graph absolute inset-y-0 right-0 hidden w-1/2 md:block" aria-hidden />
        <div className="journal-ledger absolute inset-0 md:hidden" aria-hidden />
        <div className="journal-gutter absolute inset-y-0 left-1/2 hidden w-24 -translate-x-1/2 md:block" aria-hidden />

        {/* Decoupage: oversized botanicals soaked into the paper */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image src="/odds/bot/fern.webp" alt="" width={165} height={296} className="decoupage absolute top-[8%] left-[1%] w-[14%]" />
          <Image src="/odds/bot/sweetgum.webp" alt="" width={294} height={240} className="decoupage absolute right-[4%] bottom-[2%] w-[22%] rotate-12" />
          <Image src="/odds/bot/meadow-rue.webp" alt="" width={206} height={295} className="decoupage absolute top-[30%] left-[42%] w-[16%] -rotate-12" />
        </div>

        {scraps.map((sc, i) => (
          <ScrapView key={`scrap-${i}`} scrap={sc} index={i} />
        ))}
        {pieces.map((p, i) => (
          <PieceView key={`${p.src}-${i}`} piece={p} index={i} />
        ))}
      </div>
      <p className="mx-auto mt-4 max-w-5xl text-xs tracking-[0.2em] text-muted uppercase">
        <span className="hidden md:inline">Go ahead, move things around.</span>
        <span className="md:hidden">Go ahead, move things around. Hop on a desktop to try it.</span>
      </p>
    </section>
  );
}

function PieceView({ piece: p, index }: { piece: Piece; index: number }) {
  const [top, left, width, tilt, z] = p.d;
  const m = p.m;
  const vars = {
    "--t": `${top}%`,
    "--l": `${left}%`,
    "--w": `${width}%`,
    "--tilt": `${tilt}deg`,
    "--mt": m ? `${(m[0] / MOBILE_H) * 100}%` : "0",
    "--ml": m ? `${m[1]}%` : "0",
    "--mw": m ? `${m[2]}%` : "0",
    "--mtilt": m ? `${m[3]}deg` : "0deg",
    zIndex: z || (m ? m[4] : 1),
  } as React.CSSProperties;

  const visibility = [m ? "block" : "hidden", width > 0 ? "md:block" : "md:hidden"].join(" ");

  return (
    <Draggable
      className={`piece absolute top-(--mt) left-(--ml) w-(--mw) md:top-(--t) md:left-(--l) md:w-(--w) ${visibility} piece-${p.frame}`}
      style={vars}
    >
      <div
        className={p.frame === "stamp" ? "stamp" : p.frame === "torn" ? "torn-wrap" : ""}
        style={p.frame === "torn" ? ({ clipPath: tornPath(index * 7 + 3) } as React.CSSProperties) : undefined}
      >
        <Image
          src={p.src}
          alt={p.alt}
          width={p.w}
          height={p.h}
          draggable={false}
          sizes={p.frame === "botanical" ? "8rem" : "(min-width: 768px) 22vw, 45vw"}
          className="block h-auto w-full select-none"
          aria-hidden={p.alt ? undefined : true}
        />
      </div>
      {p.tape && <span className={`washi washi-${p.tape}`} aria-hidden />}
      {p.clip && <PaperClip />}
      {p.binder && <BinderClip />}
    </Draggable>
  );
}

function ScrapView({ scrap, index }: { scrap: Scrap; index: number }) {
  const [top, left, width, tilt, z] = scrap.d;
  const m = scrap.m;
  const vars = {
    "--t": `${top}%`,
    "--l": `${left}%`,
    "--w": `${width}%`,
    "--tilt": `${tilt}deg`,
    "--mt": m ? `${(m[0] / MOBILE_H) * 100}%` : "0",
    "--ml": m ? `${m[1]}%` : "0",
    "--mw": m ? `${m[2]}%` : "0",
    "--mtilt": m ? `${m[3]}deg` : "0deg",
    zIndex: z,
  } as React.CSSProperties;
  return (
    <Draggable
      className={`piece absolute top-(--mt) left-(--ml) w-(--mw) md:top-(--t) md:left-(--l) md:w-(--w) ${m ? "block" : "hidden md:block"}`}
      style={vars}
    >
      <div
        className={`scrap scrap-${scrap.kind}`}
        style={{ aspectRatio: `1 / ${scrap.ratio}`, clipPath: scrap.kind === "ticket" ? undefined : tornPath(index * 13 + 5) }}
        aria-hidden
      />
    </Draggable>
  );
}

// A metal binder clip gripping the top edge
function BinderClip() {
  return (
    <svg viewBox="0 0 60 56" className="absolute -top-[9%] left-1/2 w-[34%] -translate-x-1/2" aria-hidden>
      <defs>
        <linearGradient id="binder-steel" x1="0" x2="1">
          <stop offset="0" stopColor="#8d9096" />
          <stop offset=".45" stopColor="#e4e6e9" />
          <stop offset="1" stopColor="#7c7f85" />
        </linearGradient>
      </defs>
      <path d="M17 26C10 14 14 3 22 3M43 26c7-12 3-23-5-23" fill="none" stroke="url(#binder-steel)" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 3h16" stroke="url(#binder-steel)" strokeWidth="3" strokeLinecap="round" />
      <path d="M8 26h44l-5 26H13z" fill="#26272b" />
      <path d="M8 26h44l-1 5H9z" fill="#4a4c52" />
    </svg>
  );
}

function PaperClip() {
  return (
    <svg viewBox="0 0 24 64" className="absolute -top-4 right-[18%] w-[9%] min-w-3" aria-hidden>
      <path
        d="M8 46V12a6 6 0 0 1 12 0v40a9 9 0 0 1-18 0V18"
        fill="none"
        stroke="#9a9a96"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path d="M8 46V12a6 6 0 0 1 12 0" fill="none" stroke="#e9e8e2" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}
