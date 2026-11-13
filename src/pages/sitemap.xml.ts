// Sitemap of every page in src/site/pages (except 404 and pages marked noindex).
import type { APIRoute } from 'astro';
import { pages, isNoindex } from '../site';

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL('https://daylumber.com')).origin;
  const urls = pages
    .filter((p) => p.slug !== '404' && !isNoindex(p))
    .map((p) => `  <url><loc>${origin}${p.path}</loc></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
