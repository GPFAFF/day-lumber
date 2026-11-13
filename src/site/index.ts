// Loads src/site/pages/*.html. Each file holds one page's own parts, separated by markers:
//   <!--@meta {...} -->   JSON: bodyAttrs (raw <body> attributes), nav (current nav item), footer (bool)
//   <!--@head-->          everything inside <head>
//   <!--@content-->       body content between the shared header and footer
//   <!--@tail-->          closing styles/scripts after the footer
// The shared header and footer live in src/site/partials/ and are added by src/layouts/Page.astro.

export interface SitePage {
  slug: string; // "index" for /, "404" for the not-found page
  path: string; // URL path with trailing slash
  meta: { bodyAttrs: string; nav: { href: string; pageItem: string | null } | null; footer: boolean };
  head: string;
  content: string;
  tail: string;
}

const files = import.meta.glob('./pages/*.html', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function parse(file: string, src: string): SitePage {
  const slug = file.replace('./pages/', '').replace(/\.html$/, '');
  const m = src.match(/^<!--@meta (.*?) -->\n<!--@head-->\n([\s\S]*?)\n<!--@content-->\n([\s\S]*?)\n<!--@tail-->\n([\s\S]*)$/);
  if (!m) throw new Error(`src/site/pages/${slug}.html: missing @meta/@head/@content/@tail markers`);
  return {
    slug,
    path: slug === 'index' ? '/' : `/${slug}/`,
    meta: JSON.parse(m[1]),
    head: m[2],
    content: m[3],
    tail: m[4],
  };
}

export const pages: SitePage[] = Object.entries(files)
  .map(([file, src]) => parse(file, src))
  .sort((a, b) => (a.slug === 'index' ? -1 : b.slug === 'index' ? 1 : a.slug.localeCompare(b.slug)));

export const isNoindex = (p: SitePage) => /<meta content="[^"]*noindex[^"]*" name="robots"/.test(p.head);
