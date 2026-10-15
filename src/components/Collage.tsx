import Image from "next/image";
import { collage } from "@/content/site";
import { Reveal } from "./Reveal";

// polaroid spots, placed by hand: position, width, tilt
const spots = [
  { top: "0%", left: "2%", width: "54%", tilt: -6 },
  { top: "6%", left: "46%", width: "50%", tilt: 5 },
  { top: "55%", left: "8%", width: "48%", tilt: 3 },
  { top: "58%", left: "52%", width: "44%", tilt: -4 },
];

export function Collage() {
  return (
    <div className="relative mx-auto aspect-[1/1.2] w-full max-w-sm">
      {collage.slice(0, spots.length).map((photo, i) => {
        const spot = spots[i];
        return (
          <div
            key={photo.src}
            className="absolute hover:z-10"
            style={{ top: spot.top, left: spot.left, width: spot.width }}
          >
            <Reveal delay={i * 120}>
              <figure
                className="relative rotate-(--tilt) bg-[#fffdf8] p-[6%] pb-[18%] shadow-[0_12px_30px_-12px_rgba(46,34,25,0.45)] transition duration-500 hover:scale-105 hover:rotate-0"
                style={{ "--tilt": `${spot.tilt}deg` } as React.CSSProperties}
              >
                <div className="film relative aspect-square overflow-hidden">
                  <Image src={photo.src} alt={photo.alt} fill sizes="12rem" className="object-cover object-top" />
                </div>
                <figcaption className="absolute inset-x-0 bottom-[5%] text-center text-[0.6rem] tracking-[0.2em] text-muted uppercase">
                  {photo.caption}
                </figcaption>
                {/* tape */}
                <span
                  className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-3 bg-[#e3d3b9]/80"
                  aria-hidden
                />
              </figure>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}
