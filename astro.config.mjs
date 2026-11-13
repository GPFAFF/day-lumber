import { defineConfig } from 'astro/config';
import { writeFileSync } from 'node:fs';

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
      writeFileSync(new URL('_headers', dir), '/*\n  X-Robots-Tag: noindex, nofollow\n');
      logger.info(`noindex build (CONTEXT=${context}, URL=${siteUrl || 'unset'}): wrote _headers`);
    },
  },
};

export default defineConfig({
  site: 'https://daylumber.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [noindexOutsideProduction],
});
