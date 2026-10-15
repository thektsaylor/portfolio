import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Squiggle } from "@/components/Decor";

export const metadata: Metadata = {
  title: "Nothing here | Kt Saylor",
  robots: { index: false },
};

// the 404. on brand, obviously
export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-24 sm:px-8">
      <div className="max-w-xl text-center">
        <Image
          src="/odds/cathead.webp"
          alt=""
          width={400}
          height={372}
          loading="eager"
          className="mx-auto w-36 -rotate-6 sm:w-44"
        />
        <p className="mt-10 text-xs tracking-[0.2em] text-muted uppercase">404</p>
        <h1 className="mt-4 font-display text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-7xl">
          This biscuit&apos;s already been <span className="text-forest">eaten.</span>
        </h1>
        <Squiggle className="mx-auto mt-6 h-4 w-40 text-leaf" />
        <p className="mx-auto mt-6 max-w-sm text-lg leading-relaxed text-muted">
          The page you&apos;re after doesn&apos;t exist, but the rest of the menu does.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:border-forest hover:bg-forest"
        >
          Back to the good stuff →
        </Link>
      </div>
    </main>
  );
}
