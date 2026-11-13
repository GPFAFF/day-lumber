// Sitemap of every page in public/ (the site is static HTML served from public/,
// so @astrojs/sitemap, which only sees Astro routes, would list nothing).
// Pages with a noindex robots meta, and 404.html, are left out.
import type { APIRoute } from 'astro';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const PUBLIC_DIR = join(process.cwd(), 'public');
const NOINDEX = /<meta[^>]*content="[^"]*noindex[^"]*"[^>]*name="robots"|<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i;

function pagePaths(): string[] {
  const paths = existsSync(join(PUBLIC_DIR, 'index.html')) ? ['/'] : [];
  for (const entry of readdirSync(PUBLIC_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === 'assets') continue;
    const file = join(PUBLIC_DIR, entry.name, 'index.html');
    if (existsSync(file) && !NOINDEX.test(readFileSync(file, 'utf8'))) paths.push(`/${entry.name}/`);
  }
  return paths.sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));
}

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL('https://daylumber.com')).origin;
  const urls = pagePaths().map((p) => `  <url><loc>${origin}${p}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
