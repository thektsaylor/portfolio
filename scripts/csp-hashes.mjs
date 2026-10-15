// Runs after `next build`. A static export ships a few inline bootstrap scripts,
// so the vercel.json header has to allow 'unsafe-inline'. This adds a second,
// stricter policy to each page that allows only those exact scripts by hash.
// Browsers enforce both policies, so an injected inline script is blocked.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const htmlFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? htmlFiles(join(dir, e.name)) : e.name.endsWith(".html") ? [join(dir, e.name)] : [],
  );

for (const file of htmlFiles(OUT)) {
  const html = readFileSync(file, "utf8");
  const hashes = new Set();
  for (const [, attrs, body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\ssrc=/.test(attrs) || /application\/ld\+json/.test(attrs) || !body) continue;
    hashes.add(`'sha256-${createHash("sha256").update(body).digest("base64")}'`);
  }
  const policy = `script-src 'self' ${[...hashes].join(" ")}; object-src 'none'; base-uri 'self'`;
  const tag = `<meta http-equiv="Content-Security-Policy" content="${policy}"/>`;
  const charset = html.indexOf("<meta charSet");
  if (charset < 0) throw new Error(`No charset meta in ${file}`);
  const at = html.indexOf(">", charset) + 1;
  writeFileSync(file, html.slice(0, at) + tag + html.slice(at));
  console.log(`csp: ${file} (${hashes.size} inline scripts)`);
}
