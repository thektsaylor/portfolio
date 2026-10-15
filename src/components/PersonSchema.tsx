import { site } from "@/content/site";

// Basic Person schema so search engines can connect this site to my other profiles.
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
