# ktsaylor.com

Personal portfolio for Kt Saylor. Built with Next.js 16 + Tailwind CSS 4, exported as a fully static site.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # outputs static files to /out
```

## Where to edit things

| What | File |
|---|---|
| Name, intro, social links, resume path, email | `src/content/site.ts` |
| Projects (order = order on the page) | `src/content/projects.ts` |
| Project images | `public/projects/` (swap the placeholder SVGs for real JPG/PNG/WebP and update the `image` path) |
| Resume | Drop a file at `public/resume.pdf` |
| Colors and fonts | `src/app/globals.css`, `src/app/layout.tsx` |

## To do before launch

- [ ] Add `public/resume.pdf`
- [ ] Fill in real LinkedIn, Instagram, and Cathead Instagram URLs in `src/content/site.ts`
- [ ] Replace placeholder project images, titles, summaries, and links
- [ ] Anonymize any client names or numbers in the SEO data visuals

## Deploy (Vercel + ktsaylor.com)

1. Buy `ktsaylor.com` at a registrar like Cloudflare Registrar or Porkbun.
2. Sign in to vercel.com with GitHub, click **Add New > Project**, and import this repo. Defaults work as is.
3. In the project, go to **Settings > Domains**, add `ktsaylor.com`, and add the DNS records Vercel shows you at your registrar.
4. Every push to `main` now redeploys automatically.

Because the site is a static export, the `/out` folder also works on Cloudflare Pages, Netlify, or GitHub Pages if you ever switch.
