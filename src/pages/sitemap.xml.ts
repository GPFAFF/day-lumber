// Sitemap: every page in src/pages plus every landing page and post, except pages that are not
// meant to be indexed (404, thanks).
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const NOT_INDEXED = new Set(['404', 'thanks']);

export const GET: APIRoute = async ({ site }) => {
  const origin = (site ?? new URL('https://daylumber.com')).origin;
  const pageFiles = Object.keys(import.meta.glob('./*.astro'))
    .map((file) => file.slice(2, -'.astro'.length))
    .filter((slug) => !slug.startsWith('[') && !NOT_INDEXED.has(slug));
  const entries = [...(await getCollection('landing')), ...(await getCollection('posts'))];
  const urls = [
    ...pageFiles.map((slug) => ({ path: slug === 'index' ? '/' : `/${slug}/` })),
    ...entries.map((e) => ({ path: `/${e.id}/`, lastmod: e.data.modified.toISOString().slice(0, 10) })),
  ]
    .sort((a, b) => (a.path === '/' ? -1 : b.path === '/' ? 1 : a.path.localeCompare(b.path)))
    .map((u) => `  <url><loc>${origin}${u.path}</loc>${'lastmod' in u ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
