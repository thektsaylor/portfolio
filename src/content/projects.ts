export type Category = "Branding" | "UX/UI" | "Web" | "Data" | "Photography";

export type Project = {
  title: string;
  category: Category;
  year: string;
  summary: string;
  tools: string[];
  // in /public
  image: string;
  links: { label: string; href: string }[];
  // thumb strip. `full` = what shows in the big frame
  gallery?: { src: string; alt: string; full?: string }[];
  // contain for charts/reports so nothing gets cropped
  galleryFit?: "cover" | "contain";
  // warm film filter, real photos only
  film?: boolean;
  // screen recording in the phone frame
  video?: { mp4: string; poster: string };
  highlights?: string[];
  // tall full-page screenshot for the browser frame
  // no client names on the page, keeps the site out of their brand searches
  site?: { screenshot: string };
};

// page order
export const projects: Project[] = [
  {
    title: "Fiberglass",
    category: "UX/UI",
    year: "2025",
    summary:
      "An app for a company that checks the fiber makeup of clothing. Scan a tag's barcode to get a breakdown of what a garment is really made of, plus a durability score, cost per wear, and a digital closet to keep track of it all.",
    tools: ["Figma", "Prototyping", "UX/UI design"],
    image: "/projects/fiberglass-demo-poster.webp",
    video: {
      mp4: "/projects/fiberglass-demo.mp4",
      poster: "/projects/fiberglass-demo-poster.webp",
    },
    links: [
      {
        label: "Open prototype",
        href: "https://www.figma.com/proto/mF3iXxzHA6W4Z8FWdXtmMt?node-id=8-5",
      },
    ],
  },
  {
    title: "CatHead Biscuits",
    category: "Branding",
    year: "2016 – 2019",
    summary:
      "As creative director and daily ops, I built the brand for my biscuit food truck from conception: the sleepy-eyed cat, the menus, and the truck graphics, plus the photos and the Instagram.",
    tools: ["Logo design", "Menu design", "Vehicle graphics", "Photography", "Instagram"],
    image: "/projects/cathead-gravy-chicken.webp",
    film: true,
    links: [{ label: "View on Instagram", href: "https://www.instagram.com/cathead.biscuits" }],
    gallery: [
      { src: "/projects/cathead-gravy-chicken.webp", alt: "Chicken biscuit with gravy" },
      { src: "/projects/cathead-truck-sign.webp", alt: "CatHead truck and chalkboard sign" },
      { src: "/projects/cathead-chicken-pimento.webp", alt: "Chicken biscuit with pimento cheese" },
      { src: "/projects/cathead-menu.webp", alt: "CatHead menu" },
      { src: "/projects/cathead-towanda.webp", alt: "The Towanda biscuit" },
      { src: "/projects/cathead-stamp.webp", alt: "Stamped CatHead logo" },
      { src: "/projects/cathead-chicken-egg.webp", alt: "Chicken, egg, and cheese biscuit" },
      { src: "/projects/cathead-sausage-cheese.webp", alt: "Sausage and cheese biscuit" },
      { src: "/projects/cathead-pulled-pork.webp", alt: "Pulled pork biscuit" },
    ],
  },
  {
    title: "SEO Performance Dashboards",
    category: "Data",
    year: "2026",
    summary:
      "Monthly client reports that turn Search Console, GA4, Search Atlas, keyword logic, and lead data into one page a business owner can visualize. Client information removed.",
    highlights: [
      "Average position compares the same keywords both months, weighted by impressions and queries",
      "Built-in checks so the report can't invent a number",
      "Honest, wins-first cards for clients, with declines and next steps flagged for the client",
    ],
    tools: ["Google Search Console", "GA4", "Search Atlas", "Data visualization"],
    image: "/projects/seo-report-upholstery.webp",
    links: [],
    galleryFit: "contain",
    gallery: [
      { src: "/projects/seo-ai-overviews.webp", alt: "AI Overview appearances chart", full: "/projects/seo-report-upholstery.webp" },
      { src: "/projects/seo-keywords.webp", alt: "Keyword rankings", full: "/projects/seo-report-upholstery.webp" },
      { src: "/projects/seo-found-you.webp", alt: "Maps vs. Search views", full: "/projects/seo-report-upholstery.webp" },
      { src: "/projects/seo-ai-overviews-2.webp", alt: "AI Overview appearances, second client", full: "/projects/seo-report-construction.webp" },
      { src: "/projects/seo-keywords-2.webp", alt: "Keyword rankings, second client", full: "/projects/seo-report-construction.webp" },
      { src: "/projects/seo-year-over-year.webp", alt: "Year-over-year comparison", full: "/projects/seo-report-construction.webp" },
    ],
  },
  {
    title: "Restroom Trailer Rentals",
    category: "Web",
    year: "2026",
    summary:
      "A website for a luxury restroom trailer rental company serving Northwest Arkansas and Southwest Missouri. It splits events and commercial visitors, then walks them through the fleet, an interactive service-area map, amenities, a four-step how-it-works, the owners' story, reviews, and FAQs.",
    tools: ["Web design", "UX writing", "Local SEO", "Vercel"],
    image: "/projects/restroom-rentals-home.webp",
    site: { screenshot: "/projects/restroom-rentals-home.webp" },
    links: [{ label: "Visit site", href: "https://luxiloorentals.com" }],
  },
  {
    title: "Freight Logistics Company",
    category: "Web",
    year: "2023",
    summary:
      "A third-party logistics company with a bold hero and a photo grid of their twelve freight services, so shippers can find their load type at a glance.",
    tools: ["Web design"],
    image: "/projects/logistics-home.webp",
    site: { screenshot: "/projects/logistics-home.webp" },
    links: [{ label: "Visit homepage", href: "https://www.truckhuntersllc.com/home" }],
  },
];
