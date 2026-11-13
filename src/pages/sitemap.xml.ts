// Sitemap: content collection entries plus the remaining src/site/pages files (except 404 and noindex pages).
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { pages, isNoindex } from '../site';

export const GET: APIRoute = async ({ site }) => {
  const origin = (site ?? new URL('https://daylumber.com')).origin;
  const entries = [...(await getCollection('landing')), ...(await getCollection('posts'))];
  const converted = new Set(entries.map((e) => e.id));
  const paths = [
    ...pages.filter((p) => p.slug !== '404' && !isNoindex(p) && !converted.has(p.slug)).map((p) => ({ path: p.path })),
    ...entries.map((e) => ({ path: `/${e.id}/`, lastmod: e.data.modified.toISOString().slice(0, 10) })),
  ].sort((a, b) => (a.path === '/' ? -1 : b.path === '/' ? 1 : a.path.localeCompare(b.path)));
  const urls = paths
    .map((p) => `  <url><loc>${origin}${p.path}</loc>${'lastmod' in p ? `<lastmod>${p.lastmod}</lastmod>` : ''}</url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
