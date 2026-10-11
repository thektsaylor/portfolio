import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

// A scrapbook page of small print pieces (invitations, a cookbook cover, a recipe card),
// dressed with fiber-arts odds and ends: washi tape, a yarn ball on needles, a pressed
// fern, and swatches from botanical dye pots. Personal details on the pieces are blurred.

type Fastener = "tape" | "corners" | "stitch";

type Piece = {
  src: string;
  alt: string;
  w: number;
  h: number;
  // Desktop placement on the page, as percentages, plus a tilt in degrees.
  top: string;
  left: string;
  width: string;
  tilt: number;
  fastener: Fastener;
  tape?: string;
};

const pieces: Piece[] = [
  { src: "/odds/camp.webp", alt: "Camping-themed fourth birthday invitation with tents and marshmallows", w: 377, h: 528, top: "9%", left: "3%", width: "17%", tilt: -5, fastener: "tape", tape: "madder" },
  { src: "/odds/weenie.webp", alt: "Hot dog themed third birthday invitation on red gingham", w: 377, h: 528, top: "24%", left: "21.5%", width: "16%", tilt: 4, fastener: "corners" },
  { src: "/odds/sourdough.webp", alt: "Single loaf sourdough recipe card with line-drawn bread and rolling pin", w: 548, h: 365, top: "5%", left: "39.5%", width: "25%", tilt: -2, fastener: "tape", tape: "indigo" },
  { src: "/odds/roast.webp", alt: "Pink dinner party invitation with a roasting pot and line-drawn vegetables", w: 377, h: 528, top: "11%", left: "66%", width: "15.5%", tilt: 6, fastener: "stitch" },
  { src: "/odds/rex.webp", alt: "T-rex birthday invitation with balloons on crumpled paper", w: 377, h: 528, top: "34%", left: "82.5%", width: "15%", tilt: -4, fastener: "tape", tape: "marigold" },
  { src: "/odds/shower.webp", alt: "Pink toile baby shower invitation with a ribbon bow", w: 377, h: 528, top: "50%", left: "42%", width: "15%", tilt: -3, fastener: "tape", tape: "walnut" },
  { src: "/odds/cookbook.webp", alt: "Family cookbook cover with red line-drawn baking tools", w: 381, h: 493, top: "55%", left: "61%", width: "15.5%", tilt: 3, fastener: "corners" },
];

// Colors from the dye pot: madder root, indigo, marigold, avocado pit, black walnut.
const dyes = {
  madder: "#c4574a",
  indigo: "#3d5a80",
  marigold: "#e0a526",
  avocado: "#d9a3a0",
  walnut: "#7a5a3f",
};

const tapeStyles: Record<string, string> = {
  madder: `repeating-linear-gradient(45deg, ${dyes.madder}b3 0 6px, #f1d2c8b3 6px 12px)`,
  indigo: `repeating-linear-gradient(90deg, ${dyes.indigo}a6 0 4px, #dfe5eea6 4px 9px)`,
  marigold: `radial-gradient(circle at 4px 4px, ${dyes.marigold} 2px, transparent 2.5px) 0 0/9px 9px, #f6e3b4c0`,
  walnut: `repeating-linear-gradient(-45deg, ${dyes.walnut}99 0 3px, #eadccab3 3px 10px)`,
};

export function OddsAndEnds() {
  return (
    <section id="odds" className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
      <SectionHead title="Odds & Ends" />
      <div className="scrapbook relative overflow-hidden rounded-[1.75rem] p-5 shadow-[0_30px_60px_-30px_rgba(46,34,25,0.45)] sm:p-8 md:aspect-[16/10] md:p-0">
        {/* Running stitch around the page */}
        <div
          className="pointer-events-none absolute inset-3 rounded-[1.25rem] border-2 border-dashed border-terracotta/35"
          aria-hidden
        />

        {/* Decorations sit behind the pieces */}
        <YarnBall className="absolute bottom-[4%] left-[2%] hidden w-[19%] md:block" />
        <Fern className="absolute top-[3%] right-[1%] hidden w-[11%] rotate-12 md:block" />
        <Swatches id="weave-lg" className="absolute bottom-[5%] left-[22%] hidden w-[18%] md:block" />
        <Fern className="absolute right-[18%] bottom-[2%] hidden w-[8%] -rotate-[100deg] opacity-80 md:block" />

        <ul className="relative grid grid-cols-2 gap-x-5 gap-y-8 py-4 sm:grid-cols-3 md:block md:h-full md:py-0">
          {pieces.map((p, i) => (
            <li
              key={p.src}
              className="md:absolute md:top-(--top) md:left-(--left) md:w-(--w) hover:z-20"
              style={{ "--top": p.top, "--left": p.left, "--w": p.width } as React.CSSProperties}
            >
              <Reveal delay={(i % 4) * 110}>
                <div
                  className="scrap relative rotate-(--tilt) transition duration-500 ease-out hover:scale-[1.06] hover:rotate-0"
                  style={{ "--tilt": `${p.tilt}deg` } as React.CSSProperties}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.w}
                    height={p.h}
                    sizes="(min-width: 768px) 18vw, 45vw"
                    className="block h-auto w-full shadow-[0_14px_28px_-14px_rgba(46,34,25,0.6)]"
                  />
                  <Fasten kind={p.fastener} tape={p.tape} />
                </div>
              </Reveal>
            </li>
          ))}
          {/* Fills the empty cell beside the last piece on small screens */}
          <li className="flex items-center justify-center md:hidden" aria-hidden>
            <YarnBall className="w-[90%]" />
          </li>
        </ul>

        {/* On small screens the decorations line up under the pieces */}
        <div className="mt-6 flex items-end justify-between gap-4 md:hidden" aria-hidden>
          <Swatches id="weave-sm" className="w-[62%]" />
          <Fern className="w-[16%] rotate-12" />
        </div>
      </div>
    </section>
  );
}

function Fasten({ kind, tape }: { kind: Fastener; tape?: string }) {
  if (kind === "tape") {
    return (
      <span
        className="absolute -top-3 left-1/2 h-5 w-[46%] -translate-x-1/2 -rotate-3 shadow-sm"
        style={{ background: tapeStyles[tape ?? "madder"] }}
        aria-hidden
      />
    );
  }
  if (kind === "corners") {
    return (
      <>
        <span className="photo-corner absolute -top-1 -left-1" aria-hidden />
        <span className="photo-corner absolute -top-1 -right-1 rotate-90" aria-hidden />
        <span className="photo-corner absolute -right-1 -bottom-1 rotate-180" aria-hidden />
        <span className="photo-corner absolute -bottom-1 -left-1 -rotate-90" aria-hidden />
      </>
    );
  }
  // A cross-stitch tacked through the top
  return (
    <svg viewBox="0 0 40 40" className="absolute -top-3 left-1/2 w-8 -translate-x-1/2" aria-hidden>
      <path d="M8 8l24 24M32 8L8 32" stroke={dyes.madder} strokeWidth="4" strokeLinecap="round" />
      <path d="M8 8l24 24" stroke="#fff" strokeOpacity=".35" strokeWidth="1.2" strokeDasharray="3 3" />
    </svg>
  );
}

// A ball of yarn with two needles pushed through and a loose strand.
function YarnBall({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 170" className={className} aria-hidden>
      <path
        d="M118 120c30 10 46 34 78 30s14-30-8-22"
        fill="none"
        stroke={dyes.madder}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line x1="20" y1="30" x2="150" y2="130" stroke="#b58a5c" strokeWidth="5" strokeLinecap="round" />
      <line x1="40" y1="140" x2="170" y2="22" stroke="#b58a5c" strokeWidth="5" strokeLinecap="round" />
      <circle cx="20" cy="30" r="6" fill={dyes.walnut} />
      <circle cx="170" cy="22" r="6" fill={dyes.walnut} />
      <circle cx="95" cy="85" r="52" fill={dyes.madder} />
      <g fill="none" stroke="#f3d6cc" strokeWidth="2.2" strokeLinecap="round" opacity=".75">
        <path d="M52 62c22 18 66 18 90 2" />
        <path d="M46 86c28 20 70 22 98 2" />
        <path d="M52 110c24 16 60 16 84 0" />
        <path d="M78 36c-18 26-18 72 4 98" />
        <path d="M106 34c14 28 14 74-6 100" />
      </g>
      <g fill="none" stroke="#8f3a31" strokeWidth="1.6" strokeLinecap="round" opacity=".5">
        <path d="M60 50c30 6 54 26 70 60" />
        <path d="M58 122c20-28 46-46 82-52" />
      </g>
    </svg>
  );
}

// A pressed fern frond: a curved stem with alternating leaflets.
function Fern({ className }: { className?: string }) {
  const leaflets = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg viewBox="0 0 80 200" className={className} aria-hidden>
      <path d="M40 196C38 140 44 70 36 6" fill="none" stroke="#5f7a4a" strokeWidth="2.4" strokeLinecap="round" />
      {leaflets.map((i) => {
        const y = 184 - i * 16;
        const size = 22 - i * 1.5;
        const x = 40 - (i * 0.4);
        return (
          <g key={i} fill="#7d9a5f" opacity={0.85 - i * 0.02}>
            <ellipse cx={x - size / 2 - 1} cy={y - 4} rx={size / 2} ry={size / 5} transform={`rotate(-28 ${x} ${y})`} />
            <ellipse cx={x + size / 2 + 1} cy={y - 10} rx={size / 2} ry={size / 5} transform={`rotate(28 ${x} ${y - 6})`} />
          </g>
        );
      })}
    </svg>
  );
}

// Fabric swatches from the dye pot, cut with pinking shears.
function Swatches({ className, id }: { className?: string; id: string }) {
  const pinked = (size: number) => {
    const teeth = 10;
    const step = size / teeth;
    let d = "M0 0";
    for (let i = 0; i < teeth; i++) d += `l${step / 2} ${i % 2 ? 3 : -3}l${step / 2} ${i % 2 ? -3 : 3}`;
    for (let i = 0; i < teeth; i++) d += `l${i % 2 ? -3 : 3} ${step / 2}l${i % 2 ? 3 : -3} ${step / 2}`;
    for (let i = 0; i < teeth; i++) d += `l${-step / 2} ${i % 2 ? -3 : 3}l${-step / 2} ${i % 2 ? 3 : -3}`;
    for (let i = 0; i < teeth; i++) d += `l${i % 2 ? 3 : -3} ${-step / 2}l${i % 2 ? -3 : 3} ${-step / 2}`;
    return d + "z";
  };
  const swatches = [
    { color: dyes.indigo, x: 8, y: 34, r: -8 },
    { color: dyes.marigold, x: 70, y: 18, r: 6 },
    { color: dyes.avocado, x: 128, y: 40, r: -4 },
    { color: dyes.walnut, x: 186, y: 22, r: 9 },
  ];
  return (
    <svg viewBox="0 0 260 120" className={className} aria-hidden>
      <defs>
        <pattern id={id} width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M0 2h4M2 0v4" stroke="#fff" strokeOpacity=".14" strokeWidth="1" />
        </pattern>
      </defs>
      {swatches.map((s) => (
        <g key={s.color} transform={`translate(${s.x} ${s.y}) rotate(${s.r} 30 30)`}>
          <path d={pinked(60)} fill={s.color} />
          <path d={pinked(60)} fill={`url(#${id})`} />
          <path d="M6 6h48v48H6z" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="1.2" strokeDasharray="3 3" />
        </g>
      ))}
    </svg>
  );
}
