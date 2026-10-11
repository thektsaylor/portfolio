import Image from "next/image";
import { Draggable } from "./Draggable";
import { SectionHead } from "./SectionHead";

// An open junk-journal spread: small print and logo work layered over ledger and
// graph paper with pressed botanicals, a knitted swatch, washi tape, and stamps.
// Every piece can be picked up and moved with a mouse. Addresses and phone numbers
// on the pieces are blurred.

type Frame = "plain" | "stamp" | "torn" | "sticker" | "botanical" | "knit";
type Tape = "kraft" | "cream" | "sage" | "rose";

// Loose paper glued down under the pieces: same placement fields, plus width / height.
type Scrap = {
  kind: "kraft" | "newsprint" | "gingham" | "ticket";
  ratio: number;
  d: [number, number, number, number, number];
  m?: [number, number, number, number, number];
};

const scraps: Scrap[] = [
  { kind: "newsprint", ratio: 0.85, d: [2, 14, 20, -3, 2], m: [60, 30, 60, 4, 2] },
  { kind: "kraft", ratio: 0.95, d: [60, 39, 15, 6, 2], m: [196, 50, 46, -4, 2] },
  { kind: "gingham", ratio: 1.15, d: [58, 69, 16, -8, 2], m: [318, 46, 48, 6, 2] },
  { kind: "kraft", ratio: 1.3, d: [3, 63, 14, 5, 2] },
  { kind: "ticket", ratio: 2.4, d: [88, 39, 10, 4, 21], m: [408, 30, 30, 4, 21] },
];

type Piece = {
  src: string;
  w: number;
  h: number;
  alt: string;
  frame: Frame;
  // Desktop: top and left as % of the spread, width as % of its width, tilt, layer.
  d: [number, number, number, number, number];
  // Phones (optional): top in units of a 100-wide by 420-tall page, then the same fields.
  m?: [number, number, number, number, number];
  tape?: Tape;
  clip?: boolean;
};

const MOBILE_H = 420;

const pieces: Piece[] = [
  // Background layer: a strip of knitted fabric glued down first
  { src: "/odds/knit-cream.webp", w: 700, h: 525, alt: "Close-up of cream stockinette knitting", frame: "torn", d: [33, 14, 26, -6, 1], m: [116, 26, 64, -5, 1] },

  // Print work
  { src: "/odds/fall-festival.webp", w: 387, h: 516, alt: "Fall birthday party poster with a watercolor pumpkin and hanging stars", frame: "plain", tape: "kraft", d: [5, 3, 16.5, -4, 10], m: [4, 4, 44, -3, 10] },
  { src: "/odds/thanksgiving.webp", w: 377, h: 528, alt: "Red line-art Thanksgiving dinner invitation in an arched frame", frame: "stamp", d: [8, 19.5, 15, 3, 11], m: [10, 52, 43, 3, 11] },
  { src: "/odds/secrets.webp", w: 632, h: 316, alt: "Article header reading Women Who Smuggled Secrets over a knitted cipher chart", frame: "torn", tape: "cream", d: [57, 2, 25, -2, 12], m: [80, 6, 88, -2, 12] },
  { src: "/odds/weenie.webp", w: 377, h: 528, alt: "Hot dog themed third birthday invitation on red gingham", frame: "plain", clip: true, d: [46, 27.5, 15, 5, 13], m: [140, 52, 42, -4, 13] },
  { src: "/odds/knit-swatch.webp", w: 900, h: 605, alt: "Teal knitted swatch hanging from a wooden needle", frame: "knit", d: [0, 38, 22, -3, 14], m: [206, 4, 82, -3, 14] },
  { src: "/odds/bbq.webp", w: 376, h: 532, alt: "Fourth of July BBQ party poster with a grill and rocket pops", frame: "stamp", d: [25, 51, 15, -3, 10], m: [132, 5, 43, 2, 10] },
  { src: "/odds/brand-board.webp", w: 344, h: 581, alt: "Brand board for a home inspection company: logo, palette, fonts, and mood board", frame: "plain", tape: "sage", d: [4, 84, 13, 4, 11], m: [262, 54, 38, 3, 11] },
  { src: "/odds/cookbook.webp", w: 381, h: 493, alt: "Family cookbook cover with red line-drawn baking tools", frame: "plain", tape: "rose", d: [23, 67, 14.5, -4, 12], m: [338, 8, 42, 3, 12] },
  { src: "/odds/tea.webp", w: 377, h: 528, alt: "Watercolor wildflower invitation to a bridal tea", frame: "torn", d: [55, 55, 14, 2, 13], m: [268, 6, 43, -2, 13] },

  // Logo stickers
  { src: "/odds/slipstitch.webp", w: 351, h: 364, alt: "Slip Stitch Heirlooms retro sunset logo sticker", frame: "sticker", d: [1, 29.5, 11.5, 8, 20], m: [66, 64, 30, 8, 20] },
  { src: "/odds/sailor.webp", w: 151, h: 197, alt: "Bearded sailor icon logo sticker", frame: "sticker", d: [77, 11, 5.5, -6, 20], m: [214, 82, 14, -6, 20] },
  { src: "/odds/rapscallion.webp", w: 383, h: 141, alt: "Rapscallion Station ransom-note bar logo sticker", frame: "sticker", d: [81, 70, 19, -3, 20], m: [340, 52, 44, -4, 20] },
  { src: "/odds/logistics-logo.webp", w: 300, h: 221, alt: "Logistics company logo sticker", frame: "sticker", d: [56, 87.5, 10, 6, 20], m: [372, 58, 28, 6, 20] },

  // Pressed botanicals, some tucked under the pieces and some laid on top
  { src: "/odds/bot/sweetgum.webp", w: 300, h: 258, alt: "", frame: "botanical", d: [79, 37, 10, 20, 4], m: [190, 70, 26, 20, 4] },
  { src: "/odds/bot/sweetgum-2.webp", w: 290, h: 247, alt: "", frame: "botanical", d: [1, 73, 9, -15, 3] },
  { src: "/odds/bot/meadow-rue.webp", w: 209, h: 300, alt: "", frame: "botanical", d: [44, 77, 7, 12, 5], m: [300, 84, 15, 12, 25] },
  { src: "/odds/bot/fern.webp", w: 165, h: 300, alt: "", frame: "botanical", d: [62, 46, 6, -8, 25], m: [56, 2, 14, -8, 25] },
  { src: "/odds/bot/yarrow.webp", w: 190, h: 284, alt: "", frame: "botanical", d: [64, 21, 6, 10, 5] },
  { src: "/odds/bot/skeleton-leaf.webp", w: 144, h: 220, alt: "", frame: "botanical", d: [17, 31, 5, -20, 5], m: [250, 40, 14, -20, 25] },
  { src: "/odds/bot/rose-peach.webp", w: 239, h: 226, alt: "", frame: "botanical", d: [38, 1, 8, 0, 25], m: [118, 2, 20, 0, 25] },
  { src: "/odds/bot/rose-gold.webp", w: 160, h: 170, alt: "", frame: "botanical", d: [85, 52, 6, 15, 25], m: [396, 10, 16, 15, 25] },
  { src: "/odds/bot/dandelion.webp", w: 183, h: 187, alt: "", frame: "botanical", d: [37, 90, 6, 0, 25], m: [190, 4, 15, 0, 25] },
  { src: "/odds/bot/dandelion-2.webp", w: 184, h: 185, alt: "", frame: "botanical", d: [47, 44.5, 5, 0, 25] },
  { src: "/odds/bot/cosmos.webp", w: 185, h: 183, alt: "", frame: "botanical", d: [89, 20, 5.5, 10, 25], m: [330, 40, 15, 10, 25] },
  { src: "/odds/bot/cosmos-2.webp", w: 205, h: 229, alt: "", frame: "botanical", d: [72, 47, 6, -10, 25] },
  { src: "/odds/bot/marigold.webp", w: 167, h: 288, alt: "", frame: "botanical", d: [29, 47, 3.5, 8, 25], m: [24, 88, 10, 8, 25] },
  { src: "/odds/bot/daisy-stem.webp", w: 104, h: 300, alt: "", frame: "botanical", d: [42, 95.5, 2.8, -6, 25] },
  { src: "/odds/bot/pasque.webp", w: 167, h: 300, alt: "", frame: "botanical", d: [5, 0.5, 4, 8, 25] },
  { src: "/odds/bot/rosebud.webp", w: 123, h: 207, alt: "", frame: "botanical", d: [88, 65, 3.5, 30, 25], m: [404, 88, 9, 30, 25] },
  { src: "/odds/bot/tulip.webp", w: 107, h: 117, alt: "", frame: "botanical", d: [74, 91, 3.5, -12, 25] },
  { src: "/odds/bot/pansy.webp", w: 84, h: 89, alt: "", frame: "botanical", d: [23, 47.5, 2.5, 0, 25], m: [130, 92, 6, 0, 25] },
  { src: "/odds/bot/dandelion-2.webp", w: 184, h: 185, alt: "", frame: "botanical", d: [92, 3, 0, 0, 0], m: [262, 92, 8, 0, 25] },
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
      <SectionHead title="Odds & Ends" />
      <div className="journal relative aspect-[100/420] overflow-hidden rounded-md shadow-[0_40px_70px_-35px_rgba(46,34,25,0.6)] md:aspect-[16/10]">
        {/* Paper: ledger lines on the left page, graph paper on the right, a gutter between */}
        <div className="journal-ledger absolute inset-y-0 left-0 hidden w-1/2 md:block" aria-hidden />
        <div className="journal-graph absolute inset-y-0 right-0 hidden w-1/2 md:block" aria-hidden />
        <div className="journal-ledger absolute inset-0 md:hidden" aria-hidden />
        <div className="journal-gutter absolute inset-y-0 left-1/2 hidden w-24 -translate-x-1/2 md:block" aria-hidden />

        {/* Decoupage: oversized botanicals soaked into the paper */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image src="/odds/bot/fern.webp" alt="" width={165} height={300} className="decoupage absolute top-[8%] left-[1%] w-[14%]" />
          <Image src="/odds/bot/sweetgum.webp" alt="" width={300} height={258} className="decoupage absolute right-[4%] bottom-[2%] w-[22%] rotate-12" />
          <Image src="/odds/bot/meadow-rue.webp" alt="" width={209} height={300} className="decoupage absolute top-[30%] left-[42%] w-[16%] -rotate-12" />
        </div>

        {scraps.map((sc, i) => (
          <ScrapView key={`scrap-${i}`} scrap={sc} index={i} />
        ))}
        {pieces.map((p, i) => (
          <PieceView key={`${p.src}-${i}`} piece={p} index={i} />
        ))}
      </div>
      <p className="mt-4 hidden text-xs tracking-[0.2em] text-muted uppercase md:block">
        Go ahead, move things around.
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
