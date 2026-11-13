# Day Lumber — static Astro site

Static site for https://daylumber.com, migrated from WordPress (Horseno theme + Elementor).
Pages are static HTML in `public/`, served through Astro 5. They are **not yet native Astro
components** (see issue #47).

## Develop and build

Requires Node 22 (as set in `netlify.toml`).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # writes dist/
npm run preview   # serves dist/
```

## Layout

| Path | Contents |
|---|---|
| `public/<slug>/index.html` | one page per URL (`trailingSlash: 'always'`) |
| `public/assets/img/` | images (formerly `wp-content/uploads/`) |
| `public/assets/theme/`, `theme-child/` | Horseno theme CSS/JS/fonts |
| `public/assets/vendor/` | Elementor, horseno-core, safe-svg, WordPress core (jQuery etc.) |
| `public/_redirects` | 301s for removed WordPress URLs, old Hugo URLs and old sitemap URLs |
| `src/pages/sitemap.xml.ts` | builds `/sitemap.xml` from every page in `public/` (skips `noindex` pages) |
| `astro.config.mjs` | writes `dist/_headers` with `X-Robots-Tag: noindex` on every build except the production build of daylumber.com |

Elementor lazy-loads files by computed name from `assets/vendor/elementor/assets/js/chunks/`,
`css/conditionals/` and `lib/`. Keep those folders whole.

## Forms

Netlify Forms. The names match the forms already on the `daylumber` Netlify site:

| Form | Page(s) | Fields |
|---|---|---|
| `quote` | `/quote/`, home, location pages | name (Customer), contact, email, phone, message |
| `contact` | `/contact-us/` | name, number (Phone), email, message |

Both forms post to `/thanks/` and use a `bot-field` honeypot. Notification emails are set in
Netlify → Forms → Notifications.

## Deploy

The Netlify site `daylumber` builds from this repository (`npm run build`, publish `dist/`).
Pull requests get deploy previews, which are `noindex`.
