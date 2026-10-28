# /OZK report

Outside-in local search report for OZK Customs. Lives at ktsaylor.com/OZK, kept out of search.

## files

- `page.tsx`: all the words, plus the math that turns data into numbers. edit text here.
- `charts.tsx`: the heat map, legend and review bars. plain svg, no chart library (the CSP blocks outside scripts).
- `data.json`: every number on the page, plus the map shapes. don't hand-edit; regenerate it.
- `ozk.css`, `van.png`, `van@2x.png`: the van cursor, this page only. the nose is the hotspot (1, 27).

The page also uses the shared `Nav`, with `home="/"` so the name links back to the homepage, and sets `data-no-stamps` so `ClickStamps` leaves no CatHead stamps here. Both are opt-ins, so they can stay if this folder goes.

## change a number

The numbers come from the checks in `local-seo-toolkit`. Rerun a check there, then rebuild the data file:

```bash
cd ~/local-seo-toolkit
python3 build_report_data.py clients/ozk.json --date 2026-10-28 --out ~/portfolio/src/app/OZK/data.json
```

The map under the heat map is US Census TIGER data (public domain), saved by `python3 build_basemap.py clients/ozk.json`.

## keeping it out of search

- `page.tsx` sets `<meta name="robots" content="noindex, nofollow, noarchive">` and its own canonical.
- `vercel.json` sends `X-Robots-Tag: noindex, nofollow, noarchive` for `/OZK`.
- not in `sitemap.ts`, `llms.txt` or the nav. don't add it.

## going live

Section 9 shows a draft banner until `REVIEW_PENDING` in `page.tsx` is set to `false`.

## removing it

1. delete this folder
2. in `vercel.json`, delete the `/OZK` header block and the `/ozk` redirect
