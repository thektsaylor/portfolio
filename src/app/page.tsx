import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { OddsAndEnds } from "@/components/OddsAndEnds";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <Work />
        <OddsAndEnds />
        <About />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
