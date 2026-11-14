import { defineConfig } from 'astro/config';
import { appendFileSync, writeFileSync } from 'node:fs';
import rehypeImages from './src/lib/rehype-images.mjs';

// Write /version.txt with the commit being built (Netlify sets COMMIT_REF), so CI can wait
// until a deploy preview serves the pull request's head commit before testing it.
const buildVersion = {
  name: 'build-version',
  hooks: {
    'astro:build:done': ({ dir }) => {
      writeFileSync(new URL('version.txt', dir), `${process.env.COMMIT_REF ?? 'local'}\n`);
    },
  },
};

// Send `X-Robots-Tag: noindex` from every deploy except the production deploy of the
// daylumber.com site. That covers deploy previews, branch deploys, any *.netlify.app
// copy (e.g. a staging site whose CONTEXT is also "production"), and local builds.
// Netlify sets CONTEXT and URL at build time.
const noindexOutsideProduction = {
  name: 'noindex-outside-production',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      const context = process.env.CONTEXT ?? 'local';
      const siteUrl = process.env.URL ?? '';
      const isProduction = context === 'production' && /^https:\/\/(www\.)?daylumber\.com\/?$/.test(siteUrl);
      if (isProduction) {
        logger.info(`indexable build (CONTEXT=${context}, URL=${siteUrl})`);
        return;
      }
      // append to the _headers copied from public/ (cache rules)
      appendFileSync(new URL('_headers', dir), '\n# non-production deploy: keep out of search results\n/*\n  X-Robots-Tag: noindex, nofollow\n');
      logger.info(`noindex build (CONTEXT=${context}, URL=${siteUrl || 'unset'}): added X-Robots-Tag to _headers`);
    },
  },
};

export default defineConfig({
  site: 'https://daylumber.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [noindexOutsideProduction, buildVersion],
  markdown: { rehypePlugins: [rehypeImages] },
});
