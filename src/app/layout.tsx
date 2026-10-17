import type { Metadata } from "next";
import { Gloock, Work_Sans, Young_Serif } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { ConsoleHello } from "@/components/ConsoleHello";
import { PersonSchema } from "@/components/PersonSchema";
import { site } from "@/content/site";
import "./globals.css";

// hero, section titles, footer
const display = Young_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

// project titles
const title = Gloock({
  variable: "--font-title",
  subsets: ["latin"],
  weight: "400",
});

const body = Work_Sans({
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
    <html lang="en" className={`${display.variable} ${title.variable} ${body.variable} antialiased`}>
      <body className="min-h-screen font-sans">
        <PersonSchema />
        {children}
        <Analytics />
        <ConsoleHello />
      </body>
      <GoogleAnalytics gaId="G-6FS6FYP596" />
    </html>
  );
}
