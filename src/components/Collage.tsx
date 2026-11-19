import { Permanent_Marker } from "next/font/google";
import { collage } from "@/content/site";
import { InstantPhoto } from "./InstantPhoto";
import { Reveal } from "./Reveal";

// sharpie-style handwriting for the captions
const marker = Permanent_Marker({ weight: "400", subsets: ["latin"], display: "swap" });

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
                className="relative rotate-(--tilt) transition duration-500 hover:scale-105 hover:rotate-0"
                style={{ "--tilt": `${spot.tilt}deg` } as React.CSSProperties}
              >
                <InstantPhoto film="polaroid" src={photo.src} alt={photo.alt} sizes="12rem" photoClassName="film object-top">
                  <figcaption
                    className={`${marker.className} absolute inset-x-0 bottom-[9.4%] flex h-[11.2%] -rotate-2 items-center justify-center text-[0.95rem] leading-none text-ink/85`}
                  >
                    {photo.caption}
                  </figcaption>
                  {/* tape */}
                  <span
                    className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-3 bg-[#e3d3b9]/80"
                    aria-hidden
                  />
                </InstantPhoto>
              </figure>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}
