import { site } from "@/content/site";

// links the site to my LinkedIn + GitHub for search
export function PersonSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.domain,
    jobTitle: site.jobTitle,
    sameAs: [site.links.linkedin, site.links.github],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
