export type Category = "Branding" | "UX/UI" | "Web" | "Data" | "Photography";

export type Project = {
  title: string;
  category: Category;
  year: string;
  summary: string;
  tools: string[];
  // Path inside /public. Swap the placeholder SVGs for real screenshots or photos.
  image: string;
  links: { label: string; href: string }[];
  // Optional extra shots shown as a strip under the main image.
  gallery?: { src: string; alt: string }[];
  // Give real photos the warm film finish. Leave off for screenshots and mockups.
  film?: boolean;
  // A screen recording to play inside a phone mockup instead of the still image.
  // Give an .mp4 (Safari, Chrome) and a .webm fallback (Chromium, some Firefox builds).
  video?: { mp4: string; webm: string; poster: string };
};

// Order here is the order on the page. Put your strongest work first.
export const projects: Project[] = [
  {
    title: "CatHead Biscuits",
    category: "Branding",
    year: "2016 – 2019",
    summary:
      "As owner and creative director, I built the brand for my biscuit food truck from the logo up: the sleepy-eyed cat, the menus, and the truck graphics, plus the photos and the Instagram.",
    tools: ["Logo design", "Menu design", "Vehicle graphics", "Photography", "Instagram"],
    image: "/projects/cathead-clipboard.webp",
    film: true,
    links: [{ label: "View on Instagram", href: "https://www.instagram.com/cathead.biscuits" }],
    gallery: [
      { src: "/projects/cathead-logo.webp", alt: "CatHead Biscuits logo: a sleepy-eyed cat face in a circle" },
      { src: "/projects/cathead-stamp.webp", alt: "CatHead Biscuits logo stamped in blue ink on paper" },
      { src: "/projects/cathead-menus.webp", alt: "Fanned stack of CatHead Biscuits menus on a yellow table" },
      { src: "/projects/cathead-truck.webp", alt: "The green CatHead Biscuits food truck with its cat logo" },
    ],
  },
  {
    title: "Fiberglass",
    category: "UX/UI",
    year: "2026",
    summary:
      "A class project app for a company that checks the fiber makeup of clothing. Scan a tag's barcode to get a breakdown of what a garment is really made of, plus a durability score, cost per wear, and a digital closet to keep track of it all.",
    tools: ["Figma", "Prototyping", "UX/UI design"],
    image: "/projects/fiberglass-demo-poster.webp",
    video: {
      mp4: "/projects/fiberglass-demo.mp4",
      webm: "/projects/fiberglass-demo.webm",
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
    title: "SEO Data Visuals",
    category: "Data",
    year: "2026",
    summary:
      "Monthly client performance reports that pull Search Console, Analytics, and GBP Insights data into visual dashboards with written trend analysis. Client names and numbers anonymized.",
    tools: ["Google Search Console", "Google Analytics", "GBP Insights", "Data visualization"],
    image: "/projects/seo-data.svg",
    links: [],
  },
  {
    title: "Website Project One",
    category: "Web",
    year: "2026",
    summary: "A site I designed and built. Swap in what it is, who it was for, and what you did.",
    tools: ["HTML/CSS", "JavaScript"],
    image: "/projects/site-one.svg",
    links: [{ label: "Visit site", href: "https://example.com" }],
  },
  {
    title: "Website Project Two",
    category: "Web",
    year: "2025",
    summary: "Another site I made. Lead with the problem it solved, then the build.",
    tools: ["HTML/CSS", "Design"],
    image: "/projects/site-two.svg",
    links: [{ label: "Visit site", href: "https://example.com" }],
  },
];
