import { Alfa_Slab_One, Chewy, Comfortaa, Oswald, Playfair_Display, Rubik } from "next/font/google";

// The lookbook title, rebuilt as cut-paper ransom-note letters.
// Each letter gets its own scrap of paper, typeface, and tilt.

const slab = Alfa_Slab_One({ weight: "400", subsets: ["latin"], display: "swap" });
const rubik = Rubik({ weight: "800", subsets: ["latin"], display: "swap" });
const comfortaa = Comfortaa({ weight: "700", subsets: ["latin"], display: "swap" });
const oswald = Oswald({ weight: "600", subsets: ["latin"], display: "swap" });
const chewy = Chewy({ weight: "400", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ weight: "500", style: ["normal", "italic"], subsets: ["latin"], display: "swap" });

type Tile = { ch: string; font: string; paper: string; ink: string; tilt: number; italic?: boolean; outline?: boolean; torn: string };

// Ragged clip paths for the paper scraps
const torn = [
  "polygon(2% 4%, 30% 0, 62% 3%, 98% 0, 100% 40%, 97% 72%, 100% 97%, 64% 100%, 35% 96%, 0 100%, 3% 66%, 0 30%)",
  "polygon(0 2%, 45% 0, 100% 3%, 97% 35%, 100% 68%, 98% 100%, 55% 97%, 4% 100%, 0 62%, 3% 28%)",
  "polygon(4% 0, 58% 3%, 100% 0, 98% 48%, 100% 100%, 42% 97%, 0 100%, 2% 52%)",
  "polygon(0 0, 100% 4%, 97% 30%, 100% 60%, 96% 98%, 50% 100%, 2% 96%, 0 55%, 3% 25%)",
];

const top: Tile[] = [
  { ch: "L", font: slab.className, paper: "#1d1b1a", ink: "#fff", tilt: -4, outline: true, torn: torn[0] },
  { ch: "O", font: rubik.className, paper: "#bfe0ee", ink: "#1f63b5", tilt: 2, italic: true, torn: torn[1] },
  { ch: "O", font: comfortaa.className, paper: "#f1efe6", ink: "#1eb3cf", tilt: -2, torn: torn[2] },
  { ch: "K", font: oswald.className, paper: "#c3b1cf", ink: "#e5322b", tilt: 4, torn: torn[3] },
];
const bottom: Tile[] = [
  { ch: "b", font: chewy.className, paper: "#d8e8d2", ink: "#cf3f98", tilt: -3, torn: torn[2] },
  { ch: "o", font: playfair.className, paper: "#ecdfd6", ink: "#6c84a8", tilt: 3, italic: true, torn: torn[0] },
  { ch: "o", font: oswald.className, paper: "#cfdeee", ink: "#b18a32", tilt: -2, torn: torn[3] },
  { ch: "k", font: playfair.className, paper: "#24365e", ink: "#fff", tilt: 5, torn: torn[1] },
];

function Row({ tiles, big }: { tiles: Tile[]; big?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-1.5">
      {tiles.map((t, i) => (
        <span
          key={i}
          className={`${t.font} grid place-items-center shadow-[0_6px_10px_-4px_rgba(46,34,25,0.45)] ${
            big ? "h-14 w-12 text-4xl sm:h-20 sm:w-16 sm:text-6xl" : "h-12 w-11 text-3xl sm:h-16 sm:w-14 sm:text-5xl"
          }`}
          style={{
            background: t.paper,
            color: t.ink,
            clipPath: t.torn,
            rotate: `${t.tilt}deg`,
            fontStyle: t.italic ? "italic" : undefined,
            WebkitTextStroke: t.outline ? "1.5px #1d1b1a" : undefined,
            textShadow: t.outline ? "3px 3px 0 #1d1b1a, 4px 4px 0 #fff" : undefined,
          }}
        >
          {t.ch}
        </span>
      ))}
    </div>
  );
}

export function Masthead() {
  return (
    <h2 aria-label="Lookbook" className="flex flex-col items-center">
      <span className="flex flex-col gap-1 sm:gap-2" aria-hidden>
        <Row tiles={top} big />
        <Row tiles={bottom} />
      </span>
    </h2>
  );
}
