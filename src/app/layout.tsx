import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { PersonSchema } from "@/components/PersonSchema";
import { site } from "@/content/site";
import "./globals.css";

const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "800"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: `${site.name} | UX, Data Visualization & MarTech`,
  description: site.description,
  alternates: { canonical: "/" },
  authors: [{ name: site.name, url: site.domain }],
  openGraph: {
    title: `${site.name} | UX, Data Visualization & MarTech`,
    description: site.description,
    url: site.domain,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} portfolio` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | UX, Data Visualization & MarTech`,
    description: site.description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="min-h-screen font-sans">
        <PersonSchema />
        {children}
      </body>
    </html>
  );
}
