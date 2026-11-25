import type { Metadata } from "next";
import { Permanent_Marker } from "next/font/google";
import { Nav } from "@/components/Nav";
import { SectionHead } from "@/components/SectionHead";

// case study for the SEO + AI visibility report. the agency stays anonymous and every number is sample data
// for a made-up bakery. no real client names on this page, ever.

const marker = Permanent_Marker({ weight: "400", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "SEO + AI Visibility Reporting | Kt Saylor",
  description:
    "How I built the monthly report a small SEO agency runs on: search, Maps, competitors, leads, and what ChatGPT, Gemini, Perplexity and Claude say about each client.",
  alternates: { canonical: "/seo-reporting" },
  openGraph: { title: "Case study: SEO + AI visibility reporting", url: "/seo-reporting" },
};

const kpis = [
  { label: "Profile views", value: "2,418", change: "▲ 12%" },
  { label: "Calls from listing", value: "64", change: "▲ 9%" },
  { label: "In AI Overviews", value: "311", change: "▲ 27%" },
];

const tools = ["ChatGPT", "Gemini", "Perplexity", "Claude"];
const aiRows: [string, boolean[]][] = [
  ["Best bakery near downtown?", [true, true, false, true]],
  ["Where can I order a custom birthday cake?", [true, false, true, true]],
  ["Who has gluten-free bread nearby?", [false, false, true, false]],
];

const flow = [
  { step: "Google data", text: "Search Console, GA4 and Business Profile, pulled through MCP and API connections or monthly exports" },
  { step: "Live checks", text: "DataForSEO: Maps rankings, competitors, and the 12 AI answers" },
  { step: "One data file", text: "The month's numbers and sentences saved as JSON, so next month can compare" },
  { step: "Build", text: "A script drops the data into the master template and draws every chart", key: true },
  { step: "Ship + follow up", text: "The page deploys to Vercel, and the fixes it finds become tasks on the support board" },
];

const sections = [
  ["At a glance", "Profile views, calls, website visits and AI Overview appearances, each with its change from last month."],
  ["Our review", "One plain paragraph on how the month went, what we did, and the three things we're doing next."],
  ["AI search", "AI Overviews by day, what four AI tools say about the business, and who they recommend."],
  ["Rankings", "Maps and Google positions for tracked searches, with NEW and moved-up tags."],
  ["Competitors", "Top 3 in Maps, reviews compared, and who AI names instead."],
  ["Leads and visits", "Calls, forms and texts counted once per person, plus where visits came from."],
];

const brand = [
  ["Open on Mondays", "An old directory listing"],
  ["Located on Elm St", "The previous address on Facebook"],
  ["Offers catering", "Correct, from the website"],
];

const choices = [
  ["Plain words over jargon", "Labels like \"times people saw your listing\" instead of \"impressions.\" If a bakery owner has to google a term, the report failed."],
  ["Cut what confused people", "I removed a keyword map and a ranking heat map after clients said they didn't get them. They still live in our internal dashboard."],
  ["Wins in the report, dips in the call", "Drops get explained by the account manager in conversation, with context, instead of a scary red number on the page."],
  ["Keep the costs small", "Rankings are checked once a month and reused, AI checks are capped at 12 answers, and brand checks run quarterly, so a report runs about a dollar in data."],
];

const cites = [
  ["Apple Maps", "Old address, unclaimed", "High"],
  ["Yelp", "Wrong phone number", "Medium"],
  ["Bing Places", "Matches", "None"],
];

const rings = [
  ["Foundation", "Tracking, listing fixes and trust signals on the site"],
  ["Local", "City pages and local links where the business already wins Maps"],
  ["Statewide", "One strong state page for searches that rank but don't get clicks"],
  ["Regional", "Ideas only, once the inner rings are working"],
];

function Note({ children }: { children: React.ReactNode }) {
  return <p className={`${marker.className} -rotate-2 text-lg leading-snug text-forest`}>{children}</p>;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-paper px-5 py-4">
      <h3 className="font-display text-xl tracking-tight">{title}</h3>
      <div className="mt-2 text-[0.95rem] leading-relaxed text-muted">{children}</div>
    </div>
  );
}

function Taped({ children, tilt = 0, tape = "kraft" }: { children: React.ReactNode; tilt?: number; tape?: string }) {
  return (
    <div className="scrap relative rounded-md bg-[#fffdf8] p-5 transition duration-500 hover:rotate-0" style={{ rotate: `${tilt}deg` }}>
      <span className={`washi washi-${tape}`} aria-hidden />
      {children}
    </div>
  );
}

function Yes({ on }: { on: boolean }) {
  return on ? (
    <span className="rounded-full bg-leaf-soft px-2 py-0.5 text-xs font-semibold whitespace-nowrap text-forest">✓ Yes</span>
  ) : (
    <span className="text-sm text-muted">No</span>
  );
}

const th = "border-b border-line px-2 py-2 text-left text-xs font-medium text-muted";
const td = "border-b border-line px-2 py-2 align-top";

export default function SeoReporting() {
  return (
    <div className="min-h-screen">
      <Nav home="/" />
      <main className="mx-auto max-w-6xl px-5 pt-6 pb-24 sm:px-8 sm:pt-10">
        <header className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="text-xs tracking-[0.2em] text-muted uppercase">Case study · Data · 2026</p>
            <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
              I built the monthly report a small SEO agency runs on
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              One page per client, every month: search, Maps, competitors, leads, and something most local agencies
              don&apos;t track yet, what ChatGPT, Gemini, Perplexity and Claude say about the business.
            </p>
            <p className="mt-4 text-sm text-muted">Claude · DataForSEO · Search Console · GA4 · Business Profile · Python · Vercel</p>
          </div>

          <Taped tilt={-1.2}>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-display text-lg">Fernbrook Bakery · March report</p>
              <p className="text-xs text-muted">sample client</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {kpis.map((k) => (
                <div key={k.label} className="rounded-xl bg-ink px-3 py-3 text-paper">
                  <p className="text-xs text-paper/60">{k.label}</p>
                  <p className="font-display text-2xl tracking-tight sm:text-3xl">{k.value}</p>
                  <p className="mt-1 inline-block rounded-full bg-leaf/25 px-2 text-xs font-semibold text-leaf">{k.change}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className={th}>Who AI recommends</th>
                    {tools.map((t) => (
                      <th key={t} className={`${th} text-center`}>{t}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {aiRows.map(([q, marks]) => (
                    <tr key={q}>
                      <td className={td}>{q}</td>
                      {marks.map((m, i) => (
                        <td key={tools[i]} className={`${td} text-center`}><Yes on={m} /></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted">Fernbrook Bakery is made up. Every number on this page is sample data.</p>
          </Taped>
        </header>

        <section className="mt-24 grid gap-10 md:grid-cols-[1fr_15rem]">
          <div className="max-w-2xl text-[1.05rem] leading-relaxed">
            <SectionHead title="The problem" tape="squiggle" />
            <p>
              Monthly reports are how a small agency proves its work, and they&apos;re easy to get wrong. Pulling the same
              Google numbers by hand for every client eats hours, and the result is a wall of charts and jargon that a busy
              owner skims or skips.
            </p>
            <p className="mt-4">
              On top of that, a growing share of customers ask AI tools for recommendations instead of scrolling Google.
              Nobody was checking whether those tools mentioned our clients, or whether what they said was even true.
            </p>
          </div>
          <aside className="md:pt-28"><Note>the goal: a report a bakery owner reads in 3 minutes and actually understands</Note></aside>
        </section>

        <section className="mt-20">
          <SectionHead title="What I built" tape="dots" tilt={1}>
            <p className="max-w-md text-muted">
              A Claude skill and a master template that turn the month&apos;s data into a finished client page. The data
              comes in through MCP and API connections, so Claude reads Google and DataForSEO directly.
            </p>
          </SectionHead>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {flow.map((f, i) => (
              <li key={f.step} className={`rounded-2xl border px-4 py-4 ${f.key ? "border-forest bg-forest text-paper" : "border-line bg-paper"}`}>
                <p className={`text-xs ${f.key ? "text-paper/70" : "text-muted"}`}>Step {i + 1}</p>
                <p className="font-display text-lg">{f.step}</p>
                <p className={`mt-1 text-sm leading-relaxed ${f.key ? "text-paper/85" : "text-muted"}`}>{f.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20">
          <SectionHead title="What's inside every report" tape="fiber" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map(([t, p]) => (
              <Card key={t} title={t}>{p}</Card>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-10 md:grid-cols-[1fr_15rem]">
          <div>
            <SectionHead title="The GEO part" tape="squiggle" tilt={-0.8} />
            <p className="max-w-2xl text-[1.05rem] leading-relaxed">
              Each month the report asks three questions a real customer would ask, on four AI tools. That&apos;s 12
              answers, and each one is a simple yes or no: did it name the client? Every quarter there&apos;s also a brand
              check, where I ask each tool about the business by name and compare its answer against the facts we have on
              file.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Taped tilt={0.9} tape="sage">
                <h3 className="font-display text-xl">What a brand check catches</h3>
                <table className="mt-3 w-full border-collapse text-sm">
                  <thead><tr><th className={th}>AI said</th><th className={th}>Where it came from</th></tr></thead>
                  <tbody>
                    {brand.map(([a, b]) => (
                      <tr key={a}><td className={td}>{a}</td><td className={td}>{b}</td></tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3 text-xs text-muted">Sample findings for the made-up bakery.</p>
              </Taped>
              <Card title="The fix happens at the source">
                AI tools repeat whatever the web says about you. So instead of arguing with a chatbot, the report traces each
                wrong detail back to the page it came from (an old Facebook address, a misspelled directory profile) and
                turns it into a task. Next month&apos;s check shows whether the fix worked.
              </Card>
            </div>
          </div>
          <aside className="md:pt-28">
            <Note>real example from the agency: an AI tool invented a second office, pulled straight from an old social profile</Note>
          </aside>
        </section>

        <section className="mt-20">
          <SectionHead title="Choices I made" tape="dots" tilt={1.2} />
          <div className="grid gap-4 sm:grid-cols-2">
            {choices.map(([t, p]) => (
              <Card key={t} title={t}>{p}</Card>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-10 md:grid-cols-[1fr_15rem]">
          <div>
            <SectionHead title="Turning data into a plan" tape="fiber" tilt={-1} />
            <p className="max-w-2xl text-[1.05rem] leading-relaxed">
              The same data feeds a citation audit and a growth plan. The audit checks name, address, phone and website on
              every major listing and sorts the fixes by how much they matter. The growth plan builds outward in rings, and
              each ring only works once the one inside it is solid.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Card title="Citation audit">
                <table className="w-full border-collapse text-sm text-ink">
                  <thead><tr><th className={th}>Listing</th><th className={th}>Issue</th><th className={th}>Priority</th></tr></thead>
                  <tbody>
                    {cites.map(([l, i, p]) => (
                      <tr key={l}>
                        <td className={td}>{l}</td>
                        <td className={td}>{i}</td>
                        <td className={td}><span className="rounded-full bg-sand px-2 py-0.5 text-xs font-semibold whitespace-nowrap">{p}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-2 text-xs">Sample rows.</p>
              </Card>
              <ol className="space-y-2">
                {rings.map(([r, t], i) => (
                  <li key={r} className="grid grid-cols-[2rem_1fr] items-start gap-3 rounded-2xl border border-line bg-paper px-4 py-3">
                    <span className="font-display text-2xl text-forest">{i}</span>
                    <span><strong className="font-semibold">{r}.</strong> <span className="text-muted">{t}</span></span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <aside className="md:pt-28"><Note>nobody fixes a listing twice: decisions first, fixes second, new listings last</Note></aside>
        </section>

        <section className="mt-20 max-w-2xl text-[1.05rem] leading-relaxed">
          <SectionHead title="My part" tape="squiggle" />
          <p>
            I designed the report, wrote the skill that builds it, set up the data flow, and run it every month. I check
            every AI-written sentence and every number before anything goes out, because a report clients trust is worth
            more than one that&apos;s fast. The agency&apos;s account manager reviews each report before it goes to the client.
          </p>
          <p className="mt-4">Next up: better lead tracking, so the report can count real customers and not just clicks.</p>
          <a href="/" className="squiggle-link mt-8 inline-block text-sm font-semibold transition hover:text-forest">
            ← Back to the portfolio
          </a>
        </section>
      </main>
    </div>
  );
}
