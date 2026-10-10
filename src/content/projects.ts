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
};

// Order here is the order on the page. Put your strongest work first.
export const projects: Project[] = [
  {
    title: "Cathead",
    category: "Photography",
    year: "2026",
    summary:
      "An Instagram photo series starring Cathead. Composition, lighting, and consistent editing across a feed that people actually stop scrolling for.",
    tools: ["Photography", "Lightroom", "Instagram"],
    image: "/projects/cathead.svg",
    links: [{ label: "View on Instagram", href: "https://www.instagram.com/CATHEAD-HANDLE" }],
  },
  {
    title: "Figma App Design",
    category: "UX/UI",
    year: "2026",
    summary:
      "A mobile app I designed end to end in Figma, from user flows and wireframes to a clickable high-fidelity prototype.",
    tools: ["Figma", "Prototyping", "UX research"],
    image: "/projects/figma-app.svg",
    links: [{ label: "Open prototype", href: "https://www.figma.com/" }],
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
