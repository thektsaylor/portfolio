// Everything personal lives here. Edit this file to update your info site-wide.

export const site = {
  name: "Kt Saylor",
  domain: "https://ktsaylor.com",
  role: "Machine learning and UX student working in data visualization and MarTech",
  intro:
    "Machine learning and UX student at Arkansas State University, minoring in psychology and marketing. By day I'm the Marketing Operations Coordinator at SEO Counselors, turning search data into reports clients actually read. Before that, I spent years as a creative director and designer, including building the CatHead Biscuits brand from the logo up.",
  location: "Northwest Arkansas",
  graduation: "Fall 2027",
  headshot: "/headshot.webp",
  // Drop your resume into /public as resume.pdf and this button just works.
  resume: "/resume.pdf",
  // Leave email empty to hide it from the site.
  email: "",
  links: {
    linkedin: "https://www.linkedin.com/in/thektsaylor",
    catheadInstagram: "https://www.instagram.com/cathead.biscuits",
    github: "https://github.com/thektsaylor",
  },
};

export const skills = [
  { group: "Design", items: ["Figma", "UX/UI", "Branding & logo design", "Adobe Creative Suite", "Canva"] },
  { group: "Data", items: ["Google Search Console", "Google Analytics", "Tableau", "Power BI", "SQL", "KPI dashboards"] },
  { group: "AI", items: ["Machine learning", "Python", "Prompt engineering", "APIs & MCP", "Responsible AI"] },
  { group: "Build", items: ["HTML/CSS", "JavaScript", "GitHub", "Claude Code"] },
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
      "Built a food truck brand from the logo up: menus, truck graphics, photography, and an Instagram grown from scratch. Ran marketing, budgeting, vendors, staffing, and event client consultations.",
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
    role: "Associate of Arts and Sciences, STEM",
    org: "NorthWest Arkansas Community College",
    summary: "",
  },
];

// Polaroid collage in the About section. Three or four photos look best.
// Swap these for personal shots (hobbies, pets, places, your desk) any time.
export const collage = [
  { src: "/projects/cathead-towanda.webp", alt: "Towanda biscuit stacked with fried green tomatoes", caption: "cathead" },
  { src: "/projects/fiberglass-sheep.webp", alt: "Line-drawn sheep from the Fiberglass app loading screen", caption: "fiberglass" },
  { src: "/projects/seo-ai-overviews.webp", alt: "AI Overview chart from an SEO report", caption: "seo reports" },
  { src: "/projects/luxi-loo-map.webp", alt: "Luxi Loo four-state service area map: Kansas, Missouri, Oklahoma, Arkansas", caption: "luxi loo" },
];
