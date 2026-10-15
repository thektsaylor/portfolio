import { site } from "@/content/site";

// Schema.org data so search engines and AI assistants can tie this site, LinkedIn,
// GitHub, and the CatHead Instagram to one person. Kept to the fields they use.
export function PersonSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.domain}/#kt`,
        name: site.name,
        url: site.domain,
        image: `${site.domain}${site.headshot}`,
        jobTitle: site.jobTitle,
        worksFor: { "@type": "Organization", name: site.employer },
        description: site.description,
        alumniOf: { "@type": "CollegeOrUniversity", name: "Arkansas State University" },
        homeLocation: { "@type": "Place", name: site.location },
        knowsAbout: ["UX design", "Data visualization", "Marketing technology", "SEO reporting", "Branding"],
        sameAs: [site.links.linkedin, site.links.github, site.links.catheadInstagram],
      },
      { "@type": "WebSite", url: site.domain, name: site.name, author: { "@id": `${site.domain}/#kt` } },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
