import { site, skills } from "@/content/site";

// Schema.org Person data so search engines and AI assistants can tie this site,
// LinkedIn, GitHub, and the CatHead Instagram to one person.
export function PersonSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.domain,
    image: `${site.domain}${site.headshot}`,
    description: site.description,
    jobTitle: site.jobTitle,
    worksFor: { "@type": "Organization", name: site.employer },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Arkansas State University" },
    address: { "@type": "PostalAddress", addressRegion: "AR", addressCountry: "US" },
    homeLocation: { "@type": "Place", name: site.location },
    knowsAbout: skills.flatMap((s) => s.items),
    sameAs: [site.links.linkedin, site.links.github, site.links.catheadInstagram],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
