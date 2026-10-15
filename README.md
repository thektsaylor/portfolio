# ktsaylor.com

My portfolio. Next.js 16 + Tailwind 4, static export, hosted on Vercel.
Pushing to `main` deploys it.

```bash
npm install
npm run dev     # localhost:3000
npm run build   # static files land in /out
```

## where stuff lives

- `src/content/site.ts`: my info, links, skills, experience
- `src/content/projects.ts`: project cards (page order = array order)
- `public/projects/`: project images + the Fiberglass video
- `public/odds/`: lookbook stickers, prints, pressed flowers
- `src/app/globals.css`: colors, fonts, the squiggle, the arches, all the paper textures
- `vercel.json`: security headers

## notes to self

- no client names in the page text or alt text
- run new photos through the `film` filter, leave screenshots alone
- check the lookbook on a phone after moving anything, the mobile layout is separate
