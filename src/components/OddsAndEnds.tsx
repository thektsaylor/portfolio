import Image from "next/image";
import { Draggable } from "./Draggable";
import { Masthead } from "./Masthead";

// junk journal spread: print + logo work over ledger and graph paper,
// pressed flowers, knit swatch, washi, clips, stamps. all draggable.
// addresses + phone numbers blurred

type Frame = "plain" | "stamp" | "torn" | "sticker" | "botanical" | "knit";
type Tape = "kraft" | "cream" | "sage" | "rose";

// where something sits on the spread. desktop numbers are % of the spread.
// on phones, top is out of MOBILE_H (the page is way taller there), the rest is still %
type Spot = { top: number; left: number; width: number; tilt: number; layer?: number };

// paper glued under everything
type Scrap = {
  kind: "kraft" | "ticket";
  ratio: number;
  desk: Spot;
  phone?: Spot;
};

const scraps: Scrap[] = [
  // the logo stickers sit on this
  { kind: "kraft", ratio: 0.75, desk: { top: 43, left: 70.5, width: 27.5, tilt: 4, layer: 2 }, phone: { top: 382, left: 6, width: 88, tilt: 3 } },
  { kind: "ticket", ratio: 0.42, desk: { top: 84, left: 40, width: 9, tilt: 4, layer: 21 }, phone: { top: 470, left: 60, width: 30, tilt: 4 } },
];

type Piece = {
  src: string;
  w: number;
  h: number;
  alt: string;
  frame: Frame;
  desk: Spot;
  phone?: Spot; // leave off to hide it on phones
  tape?: Tape;
  clip?: boolean;
  binder?: boolean;
};

const MOBILE_H = 492;

const pieces: Piece[] = [
  // Print work
  { src: "/odds/fall-festival.webp", w: 387, h: 516, alt: "Fall birthday poster", frame: "plain", binder: true, desk: { top: 3, left: 3, width: 14, tilt: -4, layer: 10 }, phone: { top: 4, left: 4, width: 44, tilt: -3 } },
  { src: "/odds/thanksgiving.webp", w: 377, h: 528, alt: "Thanksgiving invitation", frame: "stamp", desk: { top: 5, left: 16.5, width: 13, tilt: 3, layer: 11 }, phone: { top: 10, left: 52, width: 43, tilt: 3 } },
  { src: "/odds/knit-swatch.webp", w: 900, h: 605, alt: "Knitted swatch", frame: "knit", desk: { top: 10, left: 30.5, width: 18.5, tilt: -3, layer: 14 }, phone: { top: 196, left: 8, width: 80, tilt: -3 } },
  { src: "/odds/cookbook.webp", w: 1000, h: 591, alt: "Family cookbook cover", frame: "plain", tape: "rose", desk: { top: 7, left: 52.5, width: 24, tilt: -2, layer: 12 }, phone: { top: 322, left: 4, width: 90, tilt: -2 } },
  { src: "/odds/brand-board.webp", w: 344, h: 581, alt: "Home inspection brand board", frame: "plain", tape: "sage", desk: { top: 3, left: 83, width: 12, tilt: 4, layer: 11 }, phone: { top: 250, left: 54, width: 38, tilt: 3 } },
  { src: "/odds/secrets.webp", w: 632, h: 316, alt: "Women Who Smuggled Secrets header", frame: "torn", tape: "cream", desk: { top: 52, left: 2, width: 21, tilt: -2, layer: 12 }, phone: { top: 76, left: 6, width: 88, tilt: -2 } },
  { src: "/odds/weenie.webp", w: 377, h: 528, alt: "Hot dog birthday invitation", frame: "plain", clip: true, desk: { top: 44, left: 24, width: 13, tilt: 5, layer: 13 }, phone: { top: 132, left: 52, width: 42, tilt: -4 } },
  { src: "/odds/bbq.webp", w: 376, h: 532, alt: "Fourth of July BBQ poster", frame: "stamp", desk: { top: 38, left: 39, width: 13, tilt: -3, layer: 10 }, phone: { top: 126, left: 5, width: 43, tilt: 2 } },
  { src: "/odds/tea.webp", w: 377, h: 528, alt: "Bridal tea invitation", frame: "torn", desk: { top: 42, left: 56, width: 12.5, tilt: 2, layer: 13 }, phone: { top: 256, left: 6, width: 43, tilt: -2 } },

  // Logo stickers, stuck on the kraft paper
  { src: "/odds/rapscallion.webp", w: 520, h: 195, alt: "Rapscallion Station logo", frame: "sticker", desk: { top: 46, left: 72, width: 14, tilt: -4, layer: 20 }, phone: { top: 386, left: 10, width: 50, tilt: -4 } },
  { src: "/odds/slipstitch.webp", w: 499, h: 520, alt: "Slip Stitch logo", frame: "sticker", desk: { top: 64, left: 87, width: 8.5, tilt: 8, layer: 20 }, phone: { top: 384, left: 66, width: 26, tilt: 8 } },
  { src: "/odds/logistics-logo.webp", w: 420, h: 316, alt: "Logistics company logo", frame: "sticker", desk: { top: 60, left: 71.5, width: 7, tilt: 6, layer: 20 }, phone: { top: 408, left: 10, width: 22, tilt: 6 } },
  { src: "/odds/sailor.webp", w: 151, h: 197, alt: "Sailor logo", frame: "sticker", desk: { top: 71, left: 72, width: 4, tilt: -6, layer: 20 }, phone: { top: 410, left: 36, width: 12, tilt: -6 } },

  { src: "/odds/truck-patch.webp", w: 360, h: 360, alt: "Truck Patch logo", frame: "sticker", desk: { top: 45, left: 87.5, width: 8.5, tilt: 8, layer: 20 }, phone: { top: 410, left: 50, width: 22, tilt: 8 } },
  { src: "/odds/sheep.webp", w: 279, h: 340, alt: "Fiberglass sheep", frame: "sticker", desk: { top: 54, left: 79.5, width: 6.5, tilt: -6, layer: 20 }, phone: { top: 430, left: 74, width: 20, tilt: -6 } },
  { src: "/odds/cathead.webp", w: 400, h: 372, alt: "CatHead logo", frame: "sticker", desk: { top: 73.5, left: 81, width: 7.5, tilt: -5, layer: 21 }, phone: { top: 446, left: 54, width: 22, tilt: -5 } },
  { src: "/odds/saylor-made.webp", w: 520, h: 171, alt: "Saylor Made logo", frame: "sticker", desk: { top: 81, left: 70.5, width: 10.5, tilt: -3, layer: 20 }, phone: { top: 440, left: 10, width: 44, tilt: -3 } },

  // Pressed botanicals, some tucked under the pieces and some laid on top
  { src: "/odds/bot/sweetgum.webp", w: 294, h: 240, alt: "", frame: "botanical", desk: { top: 79, left: 7, width: 8, tilt: 20, layer: 4 }, phone: { top: 190, left: 70, width: 24, tilt: 20 } },
  { src: "/odds/bot/sweetgum-2.webp", w: 289, h: 244, alt: "", frame: "botanical", desk: { top: 30, left: 76, width: 7, tilt: -15, layer: 3 } },
  { src: "/odds/bot/rose-peach.webp", w: 240, h: 229, alt: "", frame: "botanical", desk: { top: 36, left: 68.5, width: 5, tilt: 12, layer: 5 }, phone: { top: 300, left: 86, width: 13, tilt: 12 } },
  { src: "/odds/bot/cosmos.webp", w: 187, h: 184, alt: "", frame: "botanical", desk: { top: 76, left: 50, width: 4.5, tilt: -8, layer: 25 }, phone: { top: 52, left: 2, width: 12, tilt: -8 } },
  { src: "/odds/bot/dandelion-2.webp", w: 186, h: 185, alt: "", frame: "botanical", desk: { top: 78, left: 30, width: 4.5, tilt: 10, layer: 5 } },
  { src: "/odds/bot/skeleton-leaf.webp", w: 144, h: 219, alt: "", frame: "botanical", desk: { top: 16, left: 28.5, width: 4, tilt: -20, layer: 5 }, phone: { top: 244, left: 42, width: 13, tilt: -20 } },
  { src: "/odds/bot/rose-peach.webp", w: 240, h: 229, alt: "", frame: "botanical", desk: { top: 40, left: 0.5, width: 6.5, tilt: 0, layer: 25 }, phone: { top: 116, left: 2, width: 18, tilt: 0 } },
  { src: "/odds/bot/rose-gold.webp", w: 162, h: 170, alt: "", frame: "botanical", desk: { top: 84, left: 60, width: 5, tilt: 15, layer: 25 }, phone: { top: 472, left: 8, width: 14, tilt: 15 } },
  { src: "/odds/bot/dandelion.webp", w: 182, h: 189, alt: "", frame: "botanical", desk: { top: 88, left: 92, width: 4.5, tilt: 0, layer: 25 }, phone: { top: 186, left: 4, width: 14, tilt: 0 } },
  { src: "/odds/bot/dandelion-2.webp", w: 186, h: 185, alt: "", frame: "botanical", desk: { top: 28, left: 49, width: 4, tilt: 0, layer: 25 } },
  { src: "/odds/bot/cosmos.webp", w: 187, h: 184, alt: "", frame: "botanical", desk: { top: 82, left: 24.5, width: 5, tilt: 10, layer: 25 }, phone: { top: 364, left: 84, width: 13, tilt: 10 } },
  { src: "/odds/bot/cosmos-2.webp", w: 205, h: 230, alt: "", frame: "botanical", desk: { top: 64, left: 52.5, width: 4.5, tilt: -10, layer: 25 } },
  { src: "/odds/bot/marigold.webp", w: 169, h: 290, alt: "", frame: "botanical", desk: { top: 24, left: 47, width: 3, tilt: 8, layer: 25 }, phone: { top: 22, left: 88, width: 9, tilt: 8 } },
  { src: "/odds/bot/daisy-stem.webp", w: 100, h: 295, alt: "", frame: "botanical", desk: { top: 50, left: 96.5, width: 2.4, tilt: -6, layer: 25 } },
  { src: "/odds/bot/pasque.webp", w: 165, h: 298, alt: "", frame: "botanical", desk: { top: 3, left: 0.3, width: 3.5, tilt: 8, layer: 25 } },
  { src: "/odds/bot/rosebud.webp", w: 121, h: 207, alt: "", frame: "botanical", desk: { top: 86, left: 68, width: 3, tilt: 30, layer: 25 }, phone: { top: 474, left: 90, width: 8, tilt: 30 } },
  { src: "/odds/bot/tulip.webp", w: 105, h: 113, alt: "", frame: "botanical", desk: { top: 38, left: 21, width: 3, tilt: -12, layer: 25 } },
  { src: "/odds/bot/pansy.webp", w: 86, h: 87, alt: "", frame: "botanical", desk: { top: 12, left: 29.5, width: 2.2, tilt: 0, layer: 25 }, phone: { top: 124, left: 92, width: 6, tilt: 0 } },
];

// torn top and bottom edges: two for the torn prints, one for the kraft paper
const ragged = [
  "polygon(0 1%, 8% 2.5%, 15% 0.5%, 24% 2%, 33% 0, 41% 2.8%, 50% 1%, 58% 2.2%, 67% 0.3%, 75% 2.6%, 84% 1.2%, 92% 2.9%, 100% 0.8%, 100% 98.5%, 91% 97.2%, 83% 99.6%, 74% 97.8%, 66% 99.1%, 57% 97%, 49% 99.4%, 40% 97.6%, 32% 99.8%, 23% 97.4%, 15% 99%, 7% 97.3%, 0 99.5%)",
  "polygon(0 2%, 9% 0.4%, 17% 2.6%, 26% 1%, 34% 2.9%, 43% 0.6%, 51% 2.1%, 60% 0.2%, 68% 2.7%, 77% 1.4%, 85% 2.4%, 93% 0.5%, 100% 2%, 100% 97.8%, 92% 99.5%, 84% 97.1%, 75% 99%, 67% 97.5%, 58% 99.7%, 50% 97.9%, 41% 99.2%, 33% 97.2%, 24% 99.4%, 16% 97.7%, 8% 99.8%, 0 97.6%)",
  "polygon(0 0.6%, 7% 2.2%, 16% 1.1%, 25% 2.9%, 33% 0.4%, 42% 1.8%, 50% 0.2%, 59% 2.5%, 66% 1.3%, 76% 2.8%, 83% 0.7%, 92% 2.3%, 100% 1.5%, 100% 99%, 93% 97.4%, 85% 99.7%, 76% 97.6%, 68% 98.8%, 59% 97.1%, 51% 99.5%, 42% 97.9%, 34% 99.3%, 25% 97.2%, 17% 99.6%, 9% 97.8%, 0 98.6%)",
];

// css variables for where a piece or scrap sits (desktop + phone)
function spotVars(desk: Spot, phone?: Spot) {
  return {
    "--t": `${desk.top}%`,
    "--l": `${desk.left}%`,
    "--w": `${desk.width}%`,
    "--tilt": `${desk.tilt}deg`,
    "--mt": phone ? `${(phone.top / MOBILE_H) * 100}%` : "0",
    "--ml": phone ? `${phone.left}%` : "0",
    "--mw": phone ? `${phone.width}%` : "0",
    "--mtilt": phone ? `${phone.tilt}deg` : "0deg",
    zIndex: desk.layer ?? 1,
  } as React.CSSProperties;
}

export function OddsAndEnds() {
  return (
    <section id="odds" className="scroll-mt-20 mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
      {/* title hangs over the top edge */}
      <div className="relative z-30 -mb-7 sm:-mb-9">
        <Masthead />
      </div>
      <div className="journal relative mx-auto aspect-[100/492] max-w-5xl overflow-hidden rounded-md shadow-[0_40px_70px_-35px_rgba(46,34,25,0.6)] md:aspect-[11/5]">
        {/* ledger left, graph right */}
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
          <ScrapView key={`scrap-${i}`} scrap={sc} />
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
  return (
    <Draggable
      className={`piece absolute top-(--mt) left-(--ml) w-(--mw) md:top-(--t) md:left-(--l) md:w-(--w) ${p.phone ? "block" : "hidden md:block"} piece-${p.frame}`}
      style={spotVars(p.desk, p.phone)}
    >
      <div
        className={p.frame === "stamp" ? "stamp" : p.frame === "torn" ? "torn-wrap" : ""}
        style={p.frame === "torn" ? { clipPath: ragged[index % 2] } : undefined}
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

function ScrapView({ scrap }: { scrap: Scrap }) {
  return (
    <Draggable
      className={`piece absolute top-(--mt) left-(--ml) w-(--mw) md:top-(--t) md:left-(--l) md:w-(--w) ${scrap.phone ? "block" : "hidden md:block"}`}
      style={spotVars(scrap.desk, scrap.phone)}
    >
      <div
        className={`scrap scrap-${scrap.kind}`}
        style={{ aspectRatio: `1 / ${scrap.ratio}`, clipPath: scrap.kind === "ticket" ? undefined : ragged[2] }}
        aria-hidden
      />
    </Draggable>
  );
}

// binder clip
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
