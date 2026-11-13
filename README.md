# Day Lumber — static Astro site

Static site for https://daylumber.com, migrated from WordPress (Horseno theme + Elementor) to
Astro 5. The header and footer exist once; each page keeps its own (exported) HTML content.

## Develop and build

Requires Node 22.23.4 (pinned in `.nvmrc`, `package.json` engines and `netlify.toml`).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # writes dist/
npm run preview   # serves dist/
```

## Layout

| Path | Contents |
|---|---|
| `src/site/partials/header.html` | the site header, mobile menu and side menu (the only copy) |
| `src/site/partials/footer.html` | the footer and back-to-top button (the only copy) |
| `src/site/pages/<slug>.html` | one file per URL (`index` = `/`, `404` = not-found page), with `@meta`, `@head`, `@content` and `@tail` sections |
| `src/layouts/Page.astro` | assembles a page and marks the current nav item from the URL |
| `src/pages/[...slug].astro`, `404.astro` | generate a route for every page file |
| `public/assets/img/` | images (formerly `wp-content/uploads/`) |
| `public/assets/theme/`, `theme-child/` | Horseno theme CSS/JS/fonts |
| `public/assets/vendor/` | Elementor, horseno-core, safe-svg, WordPress core (jQuery etc.) |
| `public/assets/css/site.css` | site-wide CSS overrides, loaded after the theme on every page; put new global styles here |
| `public/_redirects` | 301s for removed WordPress URLs, old Hugo URLs and old sitemap URLs |
| `src/pages/sitemap.xml.ts` | builds `/sitemap.xml` from every page file (skips `404` and `noindex` pages) |
| `astro.config.mjs` | writes `dist/_headers` with `X-Robots-Tag: noindex` on every build except the production build of daylumber.com |

Elementor lazy-loads files by computed name from `assets/vendor/elementor/assets/js/chunks/`,
`css/conditionals/` and `lib/`. Keep those folders whole.

### Editing

- **Nav, header or footer:** edit the partial once; every page picks it up. Nav items are marked
  current automatically when their `href` matches the page URL.
- **A page's text or images:** edit the `@content` section of `src/site/pages/<slug>.html`.
- **A page's title/meta:** the `@head` section of the same file.
- **New page:** copy an existing page file, change its slug, `@head` and `@content`.
- **Site-wide CSS:** `public/assets/css/site.css`.

## Forms

Netlify Forms. The names match the forms already on the `daylumber` Netlify site:

| Form | Page(s) | Fields |
|---|---|---|
| `quote` | `/quote/`, home, location pages | name (Customer), contact, email, phone, message |
| `contact` | `/contact-us/` | name, number (Phone), email, message |

Both forms post to `/thanks/` and use a `bot-field` honeypot plus Netlify reCAPTCHA (the checkbox only renders on Netlify deploys). Notification emails are set in
Netlify → Forms → Notifications.

## Deploy

The Netlify site `daylumber` builds from this repository (`npm run build`, publish `dist/`).
Pull requests get deploy previews, which are `noindex`.
