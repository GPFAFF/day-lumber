# Day Lumber — static Astro site

Static site for https://daylumber.com, migrated from WordPress (Horseno theme + Elementor) to
Astro 5. Pages are Astro components and Markdown content; the Horseno theme's CSS and jQuery
plugins provide the styling and widgets. Elementor is not used.

## Develop and build

Requires Node 22.23.4 (pinned in `.nvmrc`, `package.json` engines and `netlify.toml`).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # writes dist/
npm run preview   # serves dist/
npm run check     # type-check .astro/.ts files
npm run test:smoke -- http://localhost:4321   # crawl + widget checks (see tests/smoke.mjs)
```

## Where things live

| Path | Contents |
|---|---|
| `src/content/landing/*.md` | service/city landing pages, one file per URL (file name = slug) |
| `src/content/posts/*.md` | Resource articles, one file per URL |
| `src/content.config.ts` | frontmatter schema for both collections (the build fails on a missing or misspelled field) |
| `src/pages/*.astro` | the other pages: home (`index`), about-us, products, services, team, faqs, quote, contact-us, thanks, 404 |
| `src/pages/[slug].astro` | routes every landing page and post |
| `src/layouts/Base.astro` | `<head>`, header, footer and scripts for every page |
| `src/layouts/LandingPage.astro` | landing page template |
| `src/layouts/Post.astro` | article template with the Recent Posts / Latest News sidebar |
| `src/components/` | Header, Footer, Seo (meta tags + JSON-LD), Hero, Stats, Gallery, ServiceCards, FaqAccordion, QuoteSection, PageBanner, AboutIntro, FeatureSplit, FeatureCards, TeamMembers, BlogCarousel |
| `src/data/site.ts` | phone, email, address, nav, footer links, team, stats, service cards, gallery photos, general FAQs, LocalBusiness schema |
| `src/pages/sitemap.xml.ts` | `/sitemap.xml` from `src/pages` and both collections (skips 404 and thanks) |
| `public/assets/img/` | images (formerly `wp-content/uploads/`) |
| `public/assets/theme/` | Horseno theme CSS/JS and the Font Awesome subset |
| `public/assets/vendor/core/js/` | jQuery and imagesloaded |
| `public/assets/js/widgets.js` | theme widget behaviour (counters, carousels) that Elementor used to start |
| `public/assets/css/site.css` | site-wide CSS overrides, loaded after the theme on every page |
| `public/_redirects` | 301s for removed WordPress URLs, consolidated posts, old Hugo URLs and old sitemap URLs |
| `public/_headers` | cache rules |
| `astro.config.mjs` | adds `X-Robots-Tag: noindex` to every build except the production build of daylumber.com; writes `dist/version.txt` |

## Editing

- **Phone, email, address, nav, team, footer:** `src/data/site.ts`. Every page picks it up.
- **A landing page:** `src/content/landing/<slug>.md`.
  - Frontmatter: `title` (browser tab / Google), `description`, `heading` (hero), `tagline`,
    `published`, `modified`, `faqs` (question/answer list).
  - Body: sections separated by a line containing only `---`. A section that starts with an
    image (`![alt text](/assets/img/...)`) is shown as photo + text, alternating sides; any
    other section is centered text. The gallery appears after the 3rd section and the service
    cards after the 4th.
- **A post:** `src/content/posts/<slug>.md`. Frontmatter: `title`, `description`, `heading`,
  `image`, `imageAlt`, `published`, `modified`. The body is ordinary Markdown.
- **New landing page or post:** copy an existing `.md` file and rename it; the file name is the
  URL. It is added to the sitemap, and new posts appear in the homepage carousel and the
  sidebars automatically.
- **Other pages:** edit `src/pages/<page>.astro`. Text is in the file; repeated blocks are components.
- **Site-wide CSS:** `public/assets/css/site.css`. Component-specific CSS is in the component's
  `<style>` block.

## Forms

Netlify Forms. The names match the forms already on the `daylumber` Netlify site:

| Form | Defined in | Shown on | Fields |
|---|---|---|---|
| `quote` | `src/components/QuoteSection.astro` | `/quote/`, home, landing pages | name (Customer), contact, email, phone, message |
| `contact` | `src/pages/contact-us.astro` | `/contact-us/` | name, number (Phone), email, message |

Both forms post to `/thanks/` and use a `bot-field` honeypot plus Netlify reCAPTCHA (the checkbox
only renders on Netlify deploys). Notification emails are set in Netlify → Forms → Notifications.

## Deploy

The Netlify site `daylumber` builds from this repository (`npm run build`, publish `dist/`).
Pull requests get deploy previews, which are `noindex`. CI (`.github/workflows/smoke.yml`) runs
the smoke test against the built site and against the deploy preview.
