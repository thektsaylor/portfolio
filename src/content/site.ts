// personal info, used site-wide

export const site = {
  name: "Kt Saylor",
  domain: "https://ktsaylor.com",
  role: "Machine learning and UX student working in marketing strategy, data visualization and MarTech",
  intro:
    "UX and machine learning student, minoring in psychology and marketing. Working in marketing and strategy at an SEO agency, building the reports and systems that show clients how they turn up on Google and in AI answers. Before that, I spent years as a creative director and designer, including building the brands from the logo up.",
  location: "Northwest Arkansas",
  // meta description, ~150 chars
  description:
    "Kt Saylor: marketing strategist and UX designer in Northwest Arkansas. SEO and GEO, data visualization, reporting systems, and AI workflows.",
  jobTitle: "Head of Client Strategy & Systems",
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
  { group: "Design", items: ["Figma", "Sketch", "UX/UI", "Branding & logo design", "Adobe Creative Suite", "Procreate", "Canva", "CapCut"] },
  { group: "Marketing", items: ["SEO & GEO", "Local SEO", "Google Business Profile", "Citation audits", "Keyword research", "GoHighLevel", "ClickUp"] },
  { group: "Data", items: ["Google Search Console", "Google Analytics", "DataForSEO", "SQL basics", "Power BI", "KPI dashboards"] },
  { group: "AI", items: ["Machine learning", "Prompt engineering", "APIs & MCP", "Claude skills & workflows", "Responsible AI"] },
  { group: "Build", items: ["Python (beginner)", "HTML/CSS", "JavaScript", "Webflow", "WordPress", "Squarespace", "Wix", "GitHub", "Claude Code", "System architecture"] },
];

export const nowItems = [
  "Head of Client Strategy & Systems at SEO Counselors",
  "Tracking what ChatGPT, Gemini, Perplexity and Claude say about local businesses",
  "B.S. in Digital Technology & Design at A-State, 4.0 GPA",
];

// Most recent first.
export const experience = [
  {
    years: "2026 – Now",
    role: "Head of Client Strategy & Systems",
    org: "SEO Counselors · Bentonville, AR",
    summary:
      "Started as Marketing Operations Coordinator and promoted in November 2026. Build each client's keyword and local search strategy, run the monthly report system I built (search, Maps, competitors, leads, and AI answers), own Google Business Profiles and citation audits for every client, and check every AI-written output before it reaches a client.",
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
