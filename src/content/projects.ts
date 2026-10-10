export type Category = "Photography" | "UX/UI" | "Web" | "Data";

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
};

// Order here is the order on the page. Put your strongest work first.
export const projects: Project[] = [
  {
    title: "CatHead Biscuits",
    category: "Photography",
    year: "2026",
    summary:
      "Photos for the CatHead Biscuits Instagram: menus, hand-stamped packaging, and the bright green truck that serves it all.",
    tools: ["Photography", "Instagram", "Social content"],
    image: "/projects/cathead-clipboard.webp",
    links: [{ label: "View on Instagram", href: "https://www.instagram.com/cathead.biscuits" }],
    gallery: [
      { src: "/projects/cathead-menus.webp", alt: "Fanned stack of CatHead Biscuits menus on a yellow table" },
      { src: "/projects/cathead-stamp.webp", alt: "CatHead Biscuits logo stamped in blue ink on paper" },
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
    image: "/projects/fiberglass.webp",
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
      "Reporting dashboards and charts that turn raw search data into something a client can read in thirty seconds. Client names and numbers anonymized.",
    tools: ["Data visualization", "SEO", "Looker Studio"],
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
