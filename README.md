# Day Lumber — clean static Astro deployment

This is a cleaned static HTML export inside an Astro 5 project. The pages are **not yet native Astro components**.

## Build and deploy

```sh
npm install
npm run build
```

Upload `dist/` to Netlify Drop, or connect the repository using `npm run build` and publish directory `dist`.

## Cleanup

- Kept company pages and article URLs explicitly about pallets, skids, wood, shipping, manufacturing and lumber.
- Removed unrelated WordPress theme demos, archives, placeholder shopping pages and author/category pagination.
- Removed search forms and comment submission UI, plus visible comment sections.
- Replaced visible horse terminology with pallet terminology; left theme code/asset identifiers alone so CSS and JavaScript dependencies are not broken.
- Existing quote/contact forms are **still WordPress Contact Form 7 markup** and will **not submit on static Netlify**. Rebuild and test these using Netlify Forms before production.
- Audit menus, images, page content and internal links before switching DNS. Review automatically replaced text for context.
