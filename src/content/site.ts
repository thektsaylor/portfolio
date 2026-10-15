// personal info, used site-wide

export const site = {
  name: "Kt Saylor",
  domain: "https://ktsaylor.com",
  role: "Machine learning and UX student working in data visualization and MarTech",
  intro:
    "Machine learning and UX student at Arkansas State University, minoring in psychology and marketing. Working as a Marketing Operations Coordinator, turning search data into reports clients read. Before that, I spent years as a creative director and designer, including building the brands from the logo up.",
  location: "Northwest Arkansas",
  // meta description, ~150 chars
  description:
    "Kt Saylor: UX designer and marketing operations coordinator in Northwest Arkansas. Data visualization, SEO reporting, and AI workflows.",
  jobTitle: "Marketing Operations Coordinator",
  employer: "SEO Counselors",
  graduation: "Fall 2027",
  headshot: "/headshot.webp",
  resume: "/resume.pdf",
  // empty = hidden
  email: "",
  links: {
    linkedin: "https://www.linkedin.com/in/thektsaylor",
    catheadInstagram: "https://www.instagram.com/cathead.biscuits",
    github: "https://github.com/thektsaylor",
  },
};

export const skills = [
  { group: "Design", items: ["Figma", "UX/UI", "Branding & logo design", "Adobe Creative Suite", "Canva"] },
  { group: "Data", items: ["Google Search Console", "Google Analytics", "Tableau", "Power BI", "KPI dashboards"] },
  { group: "AI", items: ["Machine learning", "Prompt engineering", "APIs & MCP", "Responsible AI"] },
  { group: "Build", items: ["Python", "HTML/CSS", "JavaScript", "GitHub", "Claude Code"] },
];

export const nowItems = [
  "Marketing Operations Coordinator at SEO Counselors",
  "Building a custom MCP server to automate client reporting",
  "B.S. in Digital Technology & Design at A-State, 4.0 GPA",
];

// Most recent first.
export const experience = [
  {
    years: "2026 – Now",
    role: "Marketing Operations Coordinator",
    org: "SEO Counselors · Bentonville, AR",
    summary:
      "Build monthly client performance reports from Search Console, Analytics, and GBP Insights data. Manage Google Business Profiles across client accounts, automate posting with GoHighLevel's API features, and check AI-generated reports for accuracy before they reach clients. Currently building a custom MCP server to replace a manual reporting workflow.",
  },
  {
    years: "2020 – 2025",
    role: "Freelance Design & Technical Support",
    org: "Self-employed · Remote",
    summary:
      "Designed logos, graphics, and branded materials for small business clients, plus virtual assistant support with social media, scheduling, research, and Zapier automations.",
  },
  {
    years: "2016 – 2019",
    role: "Owner & Creative Director",
    org: "CatHead Biscuits · Fayetteville, AR",
    summary:
      "Built a food truck brand from conception: menus, truck graphics, photography, and an Instagram grown from scratch. Ran marketing, budgeting, vendors, staffing, and event client consultations.",
  },
  {
    years: "2012 – 2019",
    role: "Catering Director",
    org: "Arsaga's at the Depot · Fayetteville, AR",
    summary:
      "Led client-facing catering from first inquiry through event day: custom menus, proposals and contracts, booking calendars, and coordinating staff and vendors.",
  },
];

export const education = [
  {
    years: "Expected Fall 2027",
    role: "B.S. in Digital Technology & Design",
    org: "Arkansas State University",
    summary:
      "Emphasis in AI & Machine Learning, minors in Psychology and Marketing. 4.0 GPA. Coursework in statistical modeling, data visualization, predictive analytics, and UX.",
  },
  {
    years: "Certificate",
    role: "Google UX Design Professional Certificate",
    org: "Google",
    summary: "",
  },
  {
    years: "2012 – 2014",
    role: "Associate of Applied Science (A.A.S.), STEM",
    org: "NorthWest Arkansas Community College",
    summary: "",
  },
];

// About polaroids (3-4 max or it gets crowded)
export const collage = [
  { src: "/projects/cathead-towanda.webp", alt: "The Towanda biscuit", caption: "cathead" },
  { src: "/projects/fiberglass-sheep.webp", alt: "Fiberglass sheep", caption: "fiberglass" },
  { src: "/projects/seo-ai-overviews.webp", alt: "SEO report chart", caption: "seo reports" },
  { src: "/projects/restroom-rentals-map.webp", alt: "Service area map", caption: "web design" },
];
