import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Squiggle, Wave } from "@/components/Decor";
import raw from "./data.json";
import { Bars, HeatMap, Legend, rankColor, type Basemap } from "./charts";
import "./ozk.css";

// the OZK outside-in report. everything OZK lives in this folder (plus a redirect + header in vercel.json).
// numbers come from data.json, built by local-seo-toolkit/build_report_data.py. don't type numbers in by hand.

// set to true to show a draft banner on section 9 (Kt signed off Oct 28)
const REVIEW_PENDING = false;

export const metadata: Metadata = {
  title: "OZK Customs Inc. | Kt Saylor",
  description: "How OZK Customs shows up on Google, Google Maps and AI answers in Northwest Arkansas.",
  robots: "noindex, nofollow, noarchive",
  alternates: { canonical: "/OZK" },
  openGraph: { title: "OZK Customs: outside-in local search report", url: "/OZK" },
};

type Ranking = {
  keyword: string;
  group: string;
  web: number | null;
  map: number | null;
  page: string | null;
  page_title?: string | null;
  map_leaders: string[];
};
type AiRow = {
  platform: string;
  model: string;
  question: string;
  question_number: number;
  names_client: boolean;
  cites_client_site: boolean;
  cited_domains: string[];
  businesses_named: string[];
  named_first: string | null;
  cost: number;
};
type NameRow = {
  source: string;
  url: string;
  name_shown: string;
  address_shown: string;
  phone_shown: string;
  website_linked: string;
  category_shown: string;
};
type Listing = { rank: number; title: string; category: string; rating: number | null; reviews: number | null; city: string };
type Crawl = {
  summary: Record<string, number | string | Record<string, number>>;
  duplicate_titles: { title: string; pages: number; urls: string[] }[];
  broken_links: { url: string; status: number | null; linked_from: string[] }[];
  sections: Record<string, { pages: number; under_300_words: number }>;
  redirects: { from: string; to: string }[];
};
type Report = {
  client: { name: string; domain: string; maps_name: string };
  check_date: string;
  rankings: Ranking[];
  heat_maps: { keyword: string; size: number; step_miles: number; points: { row: number; col: number; lat: number; lng: number; position: number | null; leader: string | null }[] }[];
  landmarks: { label: string; lat: number; lng: number }[];
  maps_competitors: { keyword: string; listings: Listing[] };
  ai_answers: AiRow[];
  name_check: NameRow[];
  brand_searches: { searches: { query: string; ozk_company_in_top_8: boolean }[] };
  crawl: Crawl | null;
  costs: { items: { check: string; tool: string; cost: number }[]; spent_per_balance: number };
  basemap: Basemap | null;
};

const d = raw as unknown as Report;
const SHOP = { lat: 36.045573, lng: -94.0721799 };
const GROUPS = ["Full builds", "By van model", "Install services", "Commercial", "Place names"];
const LOCAL_QUESTIONS = [1, 2, 3];
const WHOLESALE_QUESTION = 4;

// house rule: no em or en dashes on the page, even inside titles copied from other sites
const clean = (s: string | null | undefined) => (s ?? "").replace(/\s*[\u2013\u2014]\s*/g, ": ");
// sub-cent costs keep their digits, without trailing zeros ($0.002, not $0.0020)
const money = (n: number) => (n > 0 && n < 0.01 ? `$${Number(n.toFixed(4))}` : `$${n.toFixed(2)}`);
const pos = (n: number | null) => (n === null ? "not found" : `#${n}`);
const count = <T,>(items: T[], f: (x: T) => boolean) => items.filter(f).length;
const longDate = new Date(`${d.check_date}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

// heat map
const heat = d.heat_maps[0];
const pts = heat.points;
const at1 = count(pts, (p) => p.position === 1);
const top3 = count(pts, (p) => p.position !== null && p.position <= 3);
const beatenBy = Object.entries(
  pts.filter((p) => p.position !== 1 && p.leader).reduce<Record<string, number>>((a, p) => ({ ...a, [p.leader!]: (a[p.leader!] ?? 0) + 1 }), {}),
).sort((a, b) => b[1] - a[1]);

// rankings
const ranks = d.rankings;
const webTop3 = count(ranks, (r) => r.web !== null && r.web <= 3);
const withPack = count(ranks, (r) => r.map_leaders.length > 0);
const inPack = count(ranks, (r) => r.map !== null);
const notFound = count(ranks, (r) => r.web === null && r.map === null);
const found = (group: string) => {
  const g = ranks.filter((r) => r.group === group);
  return { n: g.length, found: count(g, (r) => r.web !== null || r.map !== null) };
};
const rental = ranks.filter((r) => r.page?.includes("rental"));
const packHolders = Object.entries(
  ranks.flatMap((r) => r.map_leaders).reduce<Record<string, number>>((a, n) => ({ ...a, [n]: (a[n] ?? 0) + 1 }), {}),
).sort((a, b) => b[1] - a[1]);

// competitors
const listings = d.maps_competitors.listings;
const ozk = listings.find((l) => l.title === d.client.maps_name);
const mostReviewed = [...listings].sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0))[0];

// ai answers
const ai = d.ai_answers;
const local = ai.filter((a) => LOCAL_QUESTIONS.includes(a.question_number));
const localFirst = count(local, (a) => a.named_first === "OZK Customs");
const localCited = count(local, (a) => a.cites_client_site);
const wholesale = ai.filter((a) => a.question_number === WHOLESALE_QUESTION);
const questions = [...new Map(ai.map((a) => [a.question_number, a.question])).entries()].sort((a, b) => a[0] - b[0]);
const answer = (platform: string, q: number) => ai.find((a) => a.platform === platform && a.question_number === q);
const avgCost = (p: string) => {
  const rows = ai.filter((a) => a.platform === p);
  return rows.reduce((s, a) => s + a.cost, 0) / rows.length;
};
const costRatio = Math.round(avgCost("chat_gpt") / avgCost("gemini"));
const nextNamed = [
  ...new Set(local.map((a) => a.businesses_named.find((n) => !n.startsWith("OZK"))).filter(Boolean)),
];

// names
const names = d.name_check;
const nameCount = (n: string) => count(names, (r) => r.name_shown.includes(n));
const withStreet = names.filter((r) => /\d{3,} /.test(r.address_shown));
const phones = new Set(names.map((r) => r.phone_shown).filter((p) => p.startsWith("(")));
const bareOzk = d.brand_searches.searches.find((s) => s.query === "OZK");

// one plain line per listing: address, link, category
function listingDetails(r: NameRow) {
  const address = /\d{3,} /.test(r.address_shown)
    ? "Shop address"
    : r.address_shown.startsWith("none")
      ? "No address"
      : clean(r.address_shown).replace("Fayetteville AR (city only)", "City only, no street address");
  const link = r.website_linked.startsWith("none to")
    ? "no link to the other site"
    : r.website_linked.startsWith("none")
      ? "no website link"
      : ["n/a", "not checked"].includes(r.website_linked)
        ? ""
        : `links to ${r.website_linked}`;
  const category = r.category_shown && r.category_shown !== "n/a" ? r.category_shown : "";
  return [address, link, category].filter(Boolean).join(" · ");
}

function Section({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-line pt-12 pb-4 sm:pt-16">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">Section {n}</p>
      <h2 className="mt-2 font-display text-3xl leading-tight tracking-tight sm:text-4xl">{title}</h2>
      <div className="mt-6 space-y-5 text-[1.05rem] leading-relaxed">{children}</div>
    </section>
  );
}

function Takeaway({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-line bg-leaf-soft/60 px-5 py-4">{children}</div>;
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-line bg-paper px-5 py-4">
      <p className="font-display text-4xl tracking-tight">{value}</p>
      <p className="mt-1 text-sm leading-snug text-muted">{label}</p>
    </div>
  );
}

export default function OzkReport() {
  return (
    <div className="ozk-page min-h-screen" data-no-stamps>
    <Nav home="/" />
    <main className="mx-auto max-w-4xl px-4 pt-6 pb-24 sm:px-8 sm:pt-10">
      <header>
        <p className="text-xs tracking-[0.2em] text-muted uppercase">Outside-in report · data from {longDate}</p>
        <h1 className="mt-3 font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl">OZK Customs Inc.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed">
          This looks at OZK Customs from the outside, the way a buyer, Google or an AI assistant sees it. It uses public
          data only: Google search and Maps results, AI answers, public listings and a crawl of {d.client.domain}.
        </p>
        <p className="mt-4 text-sm text-muted">Prepared by Kt Saylor for the owner of Ozark Mountain Van Company.</p>
      </header>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <Stat value={`${top3} of ${pts.length}`} label={`Google Maps search points from Fayetteville to Bentonville where OZK is in the top 3 for "${heat.keyword}"`} />
        <Stat value={`${localFirst} of ${local.length}`} label="local AI answers (ChatGPT and Gemini) that name OZK Customs first" />
        <Stat value={`${notFound} of ${ranks.length}`} label="buyer searches where OZK doesn't appear in Google's top 20 or its Maps pack" />
        {ozk && mostReviewed ? (
          <Stat value={`${ozk.reviews}`} label={`Google reviews (${ozk.rating} stars), next to ${mostReviewed.reviews} for ${mostReviewed.title}, the most-reviewed listing nearby`} />
        ) : null}
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-sand/60 px-5 py-5 sm:px-6">
        <h2 className="font-display text-2xl">The short version</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed">
          <li>
            <strong>Google Maps is the strength.</strong> OZK is #1 or #2 at every point on the map, all the way to
            Bentonville.
          </li>
          <li>
            <strong>Regular Google results are the gap.</strong> Van model, install and commercial searches mostly come
            up empty, and some of the pages that do rank aren&apos;t the ones a buyer needs.
          </li>
          <li>
            <strong>AI answers already recommend OZK Customs</strong> to local buyers. On the dealer side, neither brand
            comes up.
          </li>
          <li>
            <strong>The business goes by three names online,</strong> and its Google category says RV repair, not custom
            builds.
          </li>
        </ul>
      </div>

      <Section id="maps" n={1} title="Where OZK wins on Google Maps">
        <p>
          I searched &ldquo;{heat.keyword}&rdquo; on Google Maps from {pts.length} points, set {heat.step_miles} miles apart in a{" "}
          {heat.size} by {heat.size} grid that runs from the shop in east Fayetteville up past Bentonville. Each circle is
          where OZK Customs ranked from that spot.
        </p>
        <figure className="rounded-3xl border border-line bg-paper p-3 sm:p-5">
          <HeatMap points={pts} size={heat.size} landmarks={d.landmarks} shop={SHOP} keyword={heat.keyword} basemap={d.basemap} />
          <figcaption className="mt-4 px-1">
            <Legend />
          </figcaption>
        </figure>
        <p>
          OZK was <strong>#1 at {at1} points</strong> and #2 at {top3 - at1}
          {top3 === pts.length ? ", so it never dropped out of the top 3" : ""}. Where it wasn&apos;t #1, the top spot went to{" "}
          {beatenBy.map(([name, n], i) => (
            <span key={name}>
              {i > 0 ? (i === beatenBy.length - 1 ? " and " : ", ") : ""}
              {name} ({n})
            </span>
          ))}
          .
        </p>
        <p className="text-sm text-muted">
          One keyword on one day, searched as a phone from each point. The points are {heat.step_miles} miles apart, so
          this shows the broad pattern, not street-by-street detail.
        </p>
      </Section>

      <Section id="rankings" n={2} title="Where OZK ranks in regular Google results">
        <p>
          These are {ranks.length} searches a buyer might use, run as a phone from the shop. &ldquo;Google&rdquo; is the
          position in the regular results (top 20). &ldquo;Maps pack&rdquo; is the spot in the short list of map
          listings Google shows inside the results.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-sand px-3 py-1">Top 3 on Google: {webTop3}</span>
          <span className="rounded-full bg-sand px-3 py-1">
            In the Maps pack: {inPack} of the {withPack} searches that showed one
          </span>
          <span className="rounded-full bg-sand px-3 py-1">Not found: {notFound}</span>
        </div>
        <div className="overflow-hidden rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand text-xs tracking-wide text-muted uppercase">
              <tr>
                <th className="px-3 py-2 font-medium sm:px-4">Search</th>
                <th className="px-2 py-2 font-medium">Google</th>
                <th className="px-2 py-2 font-medium">Maps pack</th>
                <th className="hidden px-4 py-2 font-medium sm:table-cell">Page that ranked</th>
              </tr>
            </thead>
            {GROUPS.map((g) => (
              <tbody key={g} className="border-t border-line">
                <tr>
                  <th colSpan={4} className="bg-paper px-3 pt-3 pb-1 text-xs font-semibold tracking-wide text-forest uppercase sm:px-4">
                    {g}
                  </th>
                </tr>
                {ranks
                  .filter((r) => r.group === g)
                  .map((r) => (
                    <tr key={r.keyword} className="border-t border-line/60">
                      <td className="px-3 py-2 sm:px-4">{r.keyword}</td>
                      <td className="px-2 py-2 tabular-nums">
                        <span style={{ color: r.web === null ? "var(--color-muted)" : rankColor(r.web) }}>{pos(r.web)}</span>
                      </td>
                      <td className="px-2 py-2 tabular-nums">
                        {r.map_leaders.length === 0 ? (
                          <span className="text-muted">no pack</span>
                        ) : (
                          <span style={{ color: r.map === null ? "var(--color-muted)" : rankColor(r.map) }}>{pos(r.map)}</span>
                        )}
                      </td>
                      <td className="hidden max-w-[16rem] truncate px-4 py-2 text-muted sm:table-cell" title={r.page ?? ""}>
                        {r.page ? clean(r.page_title) || r.page : ""}
                      </td>
                    </tr>
                  ))}
              </tbody>
            ))}
          </table>
        </div>
        <Takeaway>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong>Google showed a Maps pack for only {withPack} of these {ranks.length} searches.</strong> For broad
              ones like &ldquo;van conversion&rdquo; it shows regular website results only, so the strong Maps showing in
              section 1 doesn&apos;t help there. The website has to rank on its own.
            </li>
            {rental.length > 0 ? (
              <li>
                <strong>Some ranking pages aren&apos;t the ones a buyer needs.</strong> A camper van <em>rental</em> travel
                guide ({rental[0].page}) is what ranks for{" "}
                {rental.map((r, i) => (
                  <span key={r.keyword}>
                    {i > 0 ? " and " : ""}&ldquo;{r.keyword}&rdquo; ({pos(r.web)})
                  </span>
                ))}
                . Someone ready to buy a conversion lands on an article about renting one.
              </li>
            ) : null}
            <li>
              <strong>Van model and install searches mostly come up empty.</strong> OZK shows up for{" "}
              {found("By van model").found} of {found("By van model").n} van model searches,{" "}
              {found("Install services").found} of {found("Install services").n} install searches and{" "}
              {found("Commercial").found} of {found("Commercial").n} commercial searches, even though the site has pages
              for each van and service.
            </li>
          </ul>
        </Takeaway>
      </Section>

      <Section id="competitors" n={3} title="Who else shows up">
        <p>
          The ten listings Google Maps returns for &ldquo;{d.maps_competitors.keyword}&rdquo; from the shop, sized by
          review count.
        </p>
        <Bars
          highlight={d.client.maps_name}
          rows={listings.map((l) => ({ label: l.title, value: l.reviews ?? 0, note: l.rating ? `· ${l.rating}★` : undefined }))}
        />
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-sand text-xs tracking-wide text-muted uppercase">
              <tr>
                <th className="px-3 py-2 font-medium">#</th>
                <th className="px-3 py-2 font-medium">Business</th>
                <th className="px-3 py-2 font-medium">Google category</th>
                <th className="px-3 py-2 font-medium">City</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((l) => (
                <tr key={l.title} className={`border-t border-line/60 ${l.title === d.client.maps_name ? "bg-clay/25" : ""}`}>
                  <td className="px-3 py-2 tabular-nums">{l.rank}</td>
                  <td className="px-3 py-2">{l.title}</td>
                  <td className="px-3 py-2 text-muted">{l.category}</td>
                  <td className="px-3 py-2 text-muted">{l.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Across all {ranks.length} searches, these held spots in Google&apos;s Maps pack:{" "}
          {packHolders.map(([name, n], i) => (
            <span key={name}>
              {i > 0 ? ", " : ""}
              {name} ({n})
            </span>
          ))}
          .
          {packHolders.some(([n]) => n === "Ozark Mountain Adventure Vans")
            ? " Ozark Mountain Adventure Vans is a separate company in Springfield, Missouri, despite the similar name."
            : ""}
        </p>
        {ozk && mostReviewed ? (
          <Takeaway>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                <strong>OZK ranks first from its own shop with {ozk.rating} stars, but {ozk.reviews} reviews is a small
                number.</strong>{" "}
                {mostReviewed.title} has {mostReviewed.reviews}. Review count is one of the few Maps signals a business
                controls directly, and it compounds.
              </li>
              <li>
                <strong>OZK&apos;s main Google category is &ldquo;{ozk.category}.&rdquo;</strong> That fits service work, not
                custom builds. It&apos;s worth checking the Business Profile category list for a closer match for the main
                category, and keeping RV repair as a secondary one if it still applies.
              </li>
            </ul>
          </Takeaway>
        ) : null}
      </Section>

      <Section id="site" n={4} title="What a crawl of the website found">
        <p>
          I checked every page in the sitemap. The site&apos;s firewall turned away my usual SEO crawler, so I ran it from
          my own computer. Google and AI tools are getting through (they rank and cite the site), but it&apos;s worth
          making sure the firewall keeps letting them in.
        </p>
        {d.crawl ? <CrawlFindings crawl={d.crawl} /> : <p className="rounded-2xl bg-sand px-5 py-4 text-muted">Crawl results go here.</p>}
      </Section>

      <Section id="ai" n={5} title="What ChatGPT and Gemini say">
        <p>
          I asked buyer-style questions through each model with web search turned on, the way the apps answer questions
          about the present. Gemini answered all {questions.length}; ChatGPT answered the first one, since it cost about{" "}
          {costRatio} times as much per answer. AI answers change from run to run, so this is a snapshot.
        </p>
        {/* phones get one card per question; the table needs more width */}
        <ul className="space-y-3 sm:hidden">
          {questions.map(([n, q]) => (
            <li key={n} className="rounded-2xl border border-line bg-paper px-4 py-3 text-sm">
              <p>&ldquo;{q}&rdquo;</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {(["chat_gpt", "gemini"] as const).map((p) => (
                  <div key={p}>
                    <p className="text-xs tracking-wide text-muted uppercase">{p === "chat_gpt" ? "ChatGPT" : "Gemini"}</p>
                    <AiResult a={answer(p, n)} domain={d.client.domain} />
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <div className="hidden overflow-hidden rounded-2xl border border-line sm:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand text-xs tracking-wide text-muted uppercase">
              <tr>
                <th className="px-3 py-2 font-medium sm:px-4">Question</th>
                <th className="px-3 py-2 font-medium">ChatGPT</th>
                <th className="px-3 py-2 font-medium">Gemini</th>
              </tr>
            </thead>
            <tbody>
              {questions.map(([n, q]) => (
                <tr key={n} className="border-t border-line/60 align-top">
                  <td className="px-3 py-3 sm:px-4">&ldquo;{q}&rdquo;</td>
                  {["chat_gpt", "gemini"].map((p) => (
                    <td key={p} className="px-3 py-3">
                      <AiResult a={answer(p, n)} domain={d.client.domain} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Takeaway>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong>
                Local buyers are well served. {localFirst} of {local.length} local answers named OZK Customs first, and{" "}
                {localCited} cited {d.client.domain}.
              </strong>{" "}
              The next shop named was {nextNamed.join(" or ")}.
            </li>
            {wholesale.length > 0 && !wholesale.some((a) => a.names_client) ? (
              <li>
                <strong>Dealers asking about wholesale RVIA-certified vans won&apos;t hear about OZK Vans.</strong> The
                answer listed large makers like {wholesale[0].businesses_named.join(" and ")} and cited trade sources such
                as {wholesale[0].cited_domains.slice(0, 2).join(" and ")}. See section 7.
              </li>
            ) : null}
            <li>
              <strong>Gemini blends the two brands.</strong> One answer headed its top pick &ldquo;OZK Customs / OZK
              Vans,&rdquo; and another credited the custom shop with RVIA certification, which belongs to the dealer line.
            </li>
          </ul>
        </Takeaway>
      </Section>

      <Section id="names" n={6} title="Is the business named the same way everywhere?">
        <p>
          Google and AI tools connect a business across the web partly by matching its name, address and phone number. I
          checked {names.length} public listings. Every one that shows a street address uses the Fayetteville shop
          {phones.size === 1 ? `, and every phone number matches ${[...phones][0]}` : ""}. The names are where it splits:{" "}
          <strong>OZK Customs</strong> on {nameCount("OZK Customs")}, <strong>OZK Vans</strong> on {nameCount("OZK Vans")}{" "}
          and <strong>Ozark Mountain Van Company</strong>, sometimes shortened, on {nameCount("Ozark Mountain Van")}.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {names.map((r) => (
            <li key={r.source} className="rounded-2xl border border-line bg-paper px-4 py-3 text-sm">
              <p className="font-semibold">{r.source}</p>
              <p className="mt-1">{clean(r.name_shown)}</p>
              <p className="mt-1 text-muted">{listingDetails(r)}</p>
            </li>
          ))}
        </ul>
        <Takeaway>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong>The Facebook page mixes both brands.</strong> It lives at facebook.com/ozkcustoms but is named OZK
              Vans, is filed as an RV dealership, lists the ozkvans.com email and links to ozkcustoms.com.
            </li>
            <li>
              <strong>Yellow Pages lists Ozark Mountain Van Company as a van dealer with no website link.</strong>
            </li>
            {bareOzk && !bareOzk.ozk_company_in_top_8 ? (
              <li>
                <strong>&ldquo;OZK&rdquo; on its own belongs to the bank.</strong> Searching just &ldquo;OZK&rdquo;
                returned Bank OZK for all of the top 8 results. &ldquo;OZK Vans&rdquo; and &ldquo;ozk van&rdquo; do bring
                up OZK&apos;s own pages first, and OZK runs an ad on its name, so the full names are safe. Just don&apos;t
                count on the short one.
              </li>
            ) : null}
          </ul>
        </Takeaway>
        <p className="text-sm text-muted">{withStreet.length} of these listings show a street address. Checked {longDate}.</p>
      </Section>

      <Section id="ozk-vans" n={7} title="OZK Vans and the two-site split">
        <p>
          The company sells two ways. OZK Customs builds for individual buyers, and OZK Vans builds RVIA-certified camper
          vans for dealers. Each has its own website, but there&apos;s one Google Maps listing (OZK Customs), the Facebook
          page carries the OZK Vans name at the ozkcustoms address, and neither website links to the other on its home,
          about or contact page. To Google and AI tools that reads less like one company with two lines and more like two
          loosely related names, which is how Gemini ended up blending them.
        </p>
        <p className="font-semibold">Two ideas for the wholesale side:</p>
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <strong>Answer the dealer&apos;s question on ozkvans.com.</strong> When I asked &ldquo;
            {wholesale[0]?.question}&rdquo;, neither brand came up. One plain page that says what OZK Vans builds, its RVIA
            certification, the models, lead times and how a dealer signs up gives AI tools something specific to quote.
          </li>
          <li>
            <strong>Show up in the sources those answers use.</strong> The dealer answer cited RV trade sites like{" "}
            {wholesale[0]?.cited_domains[0]}. A listing or story in that trade press, plus a one-line link between the two
            sites (&ldquo;Buying for yourself? Visit OZK Customs&rdquo;), puts OZK Vans where the answers look.
          </li>
        </ol>
      </Section>

      <Section id="first" n={8} title="What I'd do first">
        <ol className="list-decimal space-y-5 pl-5">
          <li>
            <strong>Ask every finished customer for a Google review, and revisit the main category.</strong> Maps is
            already where buyers find OZK. More reviews widen that lead, and the right category tells Google OZK is a
            builder, not a repair shop.
          </li>
          <li>
            <strong>Make the real service pages the ones that rank.</strong> A buyer searching &ldquo;van conversion
            fayetteville ar&rdquo; should land on a page that can turn into a quote, not a rental guide. The van model
            and install pages need to carry those searches.
          </li>
          <li>
            <strong>One name per brand, everywhere.</strong> Rename the Facebook page or split it, fix the Yellow Pages
            listing and link the two sites to each other. It helps Google and AI tools count every mention toward the
            right brand.
          </li>
          <li>
            <strong>Keep folding topic pages into the service pages, and fix the dead links.</strong> The redirects
            already in place are the right idea. Finishing the job and repairing the broken links sends both buyers and
            Google to pages that can turn into a quote.
          </li>
          <li>
            <strong>Give OZK Vans a page that answers the dealer question.</strong> Right now no AI answer for wholesale
            RVIA-certified vans mentions it.
          </li>
        </ol>
      </Section>

    </main>

    {/* section 9 wears the site footer: ink band, wave edge, leaf squiggle */}
    <section id="how" className="relative mt-16 bg-ink text-paper">
      <Wave className="absolute -top-[39px] left-0 h-10 w-full text-ink" />
      <div className="mx-auto max-w-4xl px-4 pt-16 pb-10 sm:px-8 sm:pt-20">
        <p className="text-xs tracking-[0.2em] text-paper/50 uppercase">Section 9</p>
        <h2 className="mt-3 font-display text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-6xl">
          How this report was{" "}
          <span className="relative inline-block">
            made.
            <Squiggle className="absolute -bottom-2 left-0 h-3 w-[92%] text-leaf sm:-bottom-3 sm:h-4" />
          </span>
        </h2>
        <div className="mt-10 space-y-5 text-[1.05rem] leading-relaxed text-paper/85">
        {REVIEW_PENDING ? (
          <p className="rounded-2xl border-2 border-dashed border-clay px-5 py-3 text-sm font-semibold text-clay">
            Draft: Kt to review this section before the page goes live.
          </p>
        ) : null}
        <p>
          Every number on this page comes from saved results, gathered into one data file by a script, so the page can
          be rebuilt from scratch and checked. These are the tools I used:
        </p>
        <ul className="list-disc space-y-2 pl-5 marker:text-leaf">
          <li><strong>Claude Code</strong> to plan the checks, write and run the scripts, and build this page</li>
          <li><strong>DataForSEO APIs</strong> for Google search and Maps results, and for the ChatGPT and Gemini answers</li>
          <li><strong>Python scripts</strong> I wrote for rank checks, the heat map, AI answers and the site crawl</li>
          <li><strong>Google Search and Maps</strong> in a browser for listing details and brand-name searches</li>
          <li><strong>US Census geocoder and OpenStreetMap</strong> to confirm coordinates, and <strong>Census TIGER</strong> map data for the heat map</li>
          <li><strong>Next.js, React and Tailwind CSS</strong> for this page, <strong>GitHub</strong> for the code and version history, and <strong>Vercel</strong> to host it</li>
        </ul>
        <div className="overflow-hidden rounded-2xl border border-paper/15">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper/10 text-xs tracking-wide text-paper/60 uppercase">
              <tr>
                <th className="px-3 py-2 font-medium sm:px-4">What it cost to run this report</th>
                <th className="px-3 py-2 text-right font-medium sm:px-4">Cost</th>
              </tr>
            </thead>
            <tbody>
              {d.costs.items.map((c) => (
                <tr key={c.check} className="border-t border-paper/10">
                  <td className="px-3 py-2 sm:px-4">{c.check}</td>
                  <td className="px-3 py-2 text-right tabular-nums sm:px-4">{c.cost === 0 ? "free" : money(c.cost)}</td>
                </tr>
              ))}
              <tr className="border-t border-paper/25 font-semibold text-paper">
                <td className="px-3 py-2 sm:px-4">Total, from the account balance</td>
                <td className="px-3 py-2 text-right tabular-nums sm:px-4">{money(d.costs.spent_per_balance)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          I use the same approach at my current agency: about $0.41 per client per month for a full set of checks,
          instead of a monthly subscription platform. Every script prints what its run cost, so the spend stays visible.
        </p>
        </div>

        <footer className="mt-14 flex flex-col justify-between gap-2 text-xs tracking-[0.2em] text-paper/40 uppercase sm:flex-row">
          <span>Outside-in data from {longDate}</span>
          <Link href="/" className="transition hover:text-leaf">
            Back to ktsaylor.com <span className="arrow arrow-e" aria-hidden>→</span>
          </Link>
        </footer>
      </div>
    </section>
    </div>
  );
}

function AiResult({ a, domain }: { a: AiRow | undefined; domain: string }) {
  if (!a) return <span className="text-muted">not asked</span>;
  if (!a.names_client)
    return (
      <>
        <span className="font-semibold text-terracotta">Not named</span>
        <span className="block text-muted">first named: {a.named_first ?? "none tracked"}</span>
      </>
    );
  return (
    <>
      <span className="font-semibold text-forest">{a.named_first === "OZK Customs" ? "Named OZK first" : "Named OZK"}</span>
      <span className="block break-words text-muted">{a.cites_client_site ? `cites ${domain}` : "no OZK link"}</span>
    </>
  );
}

function CrawlFindings({ crawl }: { crawl: Crawl }) {
  const s = crawl.summary as Record<string, number>;
  const sections = Object.entries(crawl.sections);
  const topics = sections.filter(([k]) => k.startsWith("/recreational-vans/") || k.startsWith("/overland-rigs/"));
  const topicPages = topics.reduce((n, [, v]) => n + v.pages, 0);
  const brokenBySection = Object.entries(
    crawl.broken_links.reduce<Record<string, number>>((a, b) => {
      const key = "/" + new URL(b.url).pathname.split("/")[1] + "/";
      return { ...a, [key]: (a[key] ?? 0) + 1 };
    }, {}),
  ).sort((a, b) => b[1] - a[1]);
  const example = crawl.broken_links.find((b) => b.url.includes(brokenBySection[0]?.[0] ?? "~"));
  // redirects that land on a top-level page (/climate-comfort) rather than another topic page
  const intoMain = crawl.redirects.filter((r) => r.to.split("/").filter(Boolean).length === 1);
  const toHome = crawl.redirects.filter((r) => r.to === "/");
  const sample = intoMain[0];
  const fine = [
    s.missing_title === 0 && "every page has a title and description",
    s.duplicate_title_groups === 0 && "no duplicate titles",
    s.no_h1 === 0 && s.more_than_one_h1 === 0 && "one main heading per page",
    s.noindex === 0 && "nothing hidden from Google by mistake",
  ].filter(Boolean);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat value={topicPages.toLocaleString()} label={`topic pages, out of ${s.sitemap_urls.toLocaleString()} URLs in the sitemap`} />
        <Stat value={`${s.broken_internal_links}`} label="internal links to pages that don't exist" />
        <Stat value={`${crawl.redirects.length}`} label="topic pages already folded into other pages" />
      </div>
      <Takeaway>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong>Most of the site is topic pages</strong> (&ldquo;camping toilet tent,&rdquo; &ldquo;tundra
            flatbed&rdquo;). A few rank, but for the wrong searches, like the rental guide in section 2.
            {s.titles_without_business_name !== undefined
              ? ` ${s.titles_without_business_name.toLocaleString()} page titles across the site leave out the business name.`
              : ""}
          </li>
          {crawl.redirects.length > 0 ? (
            <li>
              <strong>The cleanup has started.</strong> {crawl.redirects.length} topic pages now redirect elsewhere.{" "}
              {intoMain.length} land on a matching service page{sample ? ` (${sample.from} into ${sample.to})` : ""},
              which is the right move: it points Google at pages that sell.
              {toHome.length > 0
                ? ` ${toHome.length} go to the homepage instead, which Google tends to treat as a dead page; those should point at their closest service page.`
                : ""}{" "}
              Redirected URLs also belong out of the sitemap.
            </li>
          ) : null}
          {s.broken_internal_links > 0 ? (
            <li>
              <strong>{s.broken_internal_links} links lead nowhere,</strong> {brokenBySection[0][1]} of them into{" "}
              {brokenBySection[0][0]}
              {example ? ` (for example ${new URL(example.url).pathname})` : ""}.
            </li>
          ) : null}
        </ul>
      </Takeaway>
      {fine.length > 0 ? <p className="text-sm text-muted">In good shape: {fine.join(", ")}.</p> : null}
    </>
  );
}
