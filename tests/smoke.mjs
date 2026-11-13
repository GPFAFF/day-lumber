// Smoke test for a built or deployed copy of the site.
//
//   node tests/smoke.mjs <baseUrl>              crawl + interactive checks (any server)
//   node tests/smoke.mjs <baseUrl> --netlify    also check _redirects rules and the noindex header
//
// Exits 1 if any check fails.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const base = process.argv[2]?.replace(/\/$/, '');
const netlify = process.argv.includes('--netlify');
if (!base) { console.error('usage: node tests/smoke.mjs <baseUrl> [--netlify]'); process.exit(2); }
const origin = new URL(base).origin;
const failures = [];
const fail = (msg) => { failures.push(msg); console.log('FAIL', msg); };
const NAV = 'Home,Products,About,Team,Services,Quote,Contact';

// ---- pages from the sitemap (served with the canonical host; test them on this host)
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
if (paths.length < 50) fail(`sitemap lists only ${paths.length} pages`); // catches an empty or broken sitemap
paths.push('/thanks/');

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const worker = async (queue) => {
  const page = await ctx.newPage();
  for (let path; (path = queue.shift()); ) {
    const errors = [], bad = [];
    const onErr = (e) => errors.push(e.message.slice(0, 120));
    const onResp = (r) => { if (r.status() >= 400 && r.url().startsWith(origin)) bad.push(`${r.status()} ${r.url().replace(origin, '')}`); };
    page.on('pageerror', onErr); page.on('response', onResp);
    try {
      const res = await page.goto(base + path, { waitUntil: 'load', timeout: 45000 });
      if (res?.status() !== 200) fail(`${path}: HTTP ${res?.status()}`);
      await page.waitForTimeout(500);
      const info = await page.evaluate(() => ({
        nav: [...new Set([...document.querySelectorAll('header li.menu-item > a')].map((a) => a.textContent.trim()))].join(','),
        broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.currentSrc).map((i) => i.currentSrc),
        h1: document.querySelectorAll('h1').length,
      }));
      if (info.nav !== NAV) fail(`${path}: nav is "${info.nav}"`);
      if (info.broken.length) fail(`${path}: broken images ${info.broken.slice(0, 3).join(' ')}`);
      if (info.h1 !== 1) fail(`${path}: ${info.h1} <h1> elements`);
    } catch (e) { fail(`${path}: ${e.message.slice(0, 120)}`); }
    if (errors.length) fail(`${path}: page errors ${[...new Set(errors)].join(' | ')}`);
    if (bad.length) fail(`${path}: ${[...new Set(bad)].join(', ')}`);
    page.off('pageerror', onErr); page.off('response', onResp);
    if (netlify) await page.waitForTimeout(300); // stay under Netlify's rate limit
  }
  await page.close();
};
const queue = [...paths];
await Promise.all(Array.from({ length: netlify ? 2 : 4 }, () => worker(queue)));
console.log(`crawled ${paths.length} pages`);

// ---- interactive widgets
const scrollAll = (p) => p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 300) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } });
const check = async (name, path, width, fn) => {
  const p = await browser.newPage({ viewport: { width, height: 900 } });
  try { await p.goto(base + path, { waitUntil: 'load' }); await scrollAll(p); await p.waitForTimeout(1000); const r = await p.evaluate(fn); if (r !== true) fail(`${name}: ${r}`); else console.log('ok  ', name); }
  catch (e) { fail(`${name}: ${e.message.slice(0, 120)}`); }
  await p.close();
};
await check('scroll animations reveal content', '/', 1440, () => { const w = [...document.querySelectorAll('.wow')]; const hidden = w.filter((e) => getComputedStyle(e).visibility === 'hidden'); return hidden.length === 0 || `${hidden.length}/${w.length} .wow still hidden`; });
await check('carousels initialise and move', '/', 1440, async () => {
  const s = [...document.querySelectorAll('.blog-carousel, [data-slick-arrow]')]; if (s.some((e) => !e.classList.contains('slick-initialized'))) return 'carousel not initialised';
  const t = document.querySelector('.blog-carousel .slick-track'), b = document.querySelector('[data-slick-next=".blog-carousel"]'); if (!t || !b) return true;
  const before = t.style.transform; b.click(); await new Promise((r) => setTimeout(r, 900)); return before !== t.style.transform || 'next arrow did not move the carousel';
});
await check('back-to-top scrolls up', '/', 1440, async () => { scrollTo(0, 3000); await new Promise((r) => setTimeout(r, 300)); document.querySelector('#backToTop').click(); await new Promise((r) => setTimeout(r, 1600)); return scrollY < 50 || `still at ${Math.round(scrollY)}px`; });
await check('side menu opens', '/', 1440, async () => { document.querySelector('.sideMenuToggler').click(); await new Promise((r) => setTimeout(r, 700)); const w = document.querySelector('.sidemenu-wrapper'); return (w && (w.classList.contains('show') || getComputedStyle(w).visibility === 'visible')) || 'side menu stayed closed'; });
await check('gallery lightbox opens', '/about-us/', 1440, async () => { document.querySelector('.popup-image').click(); await new Promise((r) => setTimeout(r, 900)); return !!document.querySelector('.mfp-wrap') || 'lightbox did not open'; });
await check('FAQ accordion toggles', '/faqs/', 1440, async () => { const b = document.querySelectorAll('.accordion-button')[1]; b.click(); await new Promise((r) => setTimeout(r, 700)); return document.querySelector(b.dataset.bsTarget).classList.contains('show') || 'panel did not open'; });
await check('mobile menu opens', '/', 390, async () => { [...document.querySelectorAll('.vs-menu-toggle')].find((e) => e.offsetParent).click(); await new Promise((r) => setTimeout(r, 800)); return document.querySelector('.vs-menu-wrapper').classList.contains('vs-body-visible') || 'mobile menu stayed closed'; });
await check('forms are Netlify forms with required fields', '/quote/', 1440, () => { const f = document.querySelector('form[name="quote"]'); // Netlify strips data-netlify on deploy; the hidden form-name field is present in both cases
  return (f && f.querySelector('input[name="form-name"][value="quote"]') && f.querySelector('[name="bot-field"]') && f.querySelectorAll('[required]').length >= 5) || 'quote form markup changed'; });
await browser.close();

// ---- Netlify-only: redirects and headers
if (netlify) {
  const rules = readFileSync(new URL('../public/_redirects', import.meta.url), 'utf8').split('\n')
    .map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map((l) => l.split(/\s+/));
  for (const [from, to, code] of rules) {
    const probe = from.replace(/\*$/, 'smoke-test');
    const expected = to.replace(':splat', 'smoke-test');
    const r = await fetch(base + probe, { redirect: 'manual' });
    const loc = (r.headers.get('location') || '').replace(origin, '').replace(/^https?:\/\/[^/]+/, '');
    if (String(r.status) !== code || loc !== expected) fail(`redirect ${probe}: ${r.status} -> ${loc} (want ${code} -> ${expected})`);
  }
  console.log(`checked ${rules.length} redirect rules`);
  const h = await fetch(`${base}/`, { method: 'HEAD' });
  if (!/noindex/.test(h.headers.get('x-robots-tag') || '')) fail('deploy preview is missing X-Robots-Tag: noindex');
  const img = await fetch(`${base}/assets/img/2026/03/pallets.webp`, { method: 'HEAD' });
  if (!/max-age=2592000/.test(img.headers.get('cache-control') || '')) fail(`image cache header: ${img.headers.get('cache-control')}`);
}

console.log(failures.length ? `\n${failures.length} failure(s)` : '\nall checks passed');
process.exit(failures.length ? 1 : 0);
