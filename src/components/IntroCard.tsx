import Image from "next/image";
import { site } from "@/content/site";

// the intro, typed on a lined index card and clipped into the work grid
export function IntroCard() {
  return (
    <div className="index-card">
      <Image src="/odds/paperclip.png" alt="" width={72} height={238} className="index-card-clip" />
      <p className="text-[11px] tracking-[0.2em] text-terracotta uppercase">The short version</p>
      <p>{site.intro}</p>
    </div>
  );
}
