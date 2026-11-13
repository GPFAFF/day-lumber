// Content collections. Each Markdown file is one page; its file name is the URL slug.
//   src/content/landing/*.md  service/city landing pages (layout: src/layouts/LandingPage.astro)
//   src/content/posts/*.md    Resource articles (layout: src/layouts/Post.astro)
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const seo = {
  /** <title> and social title */
  title: z.string(),
  /** meta description */
  description: z.string(),
  /** site-relative image for social cards */
  ogImage: z.string().startsWith('/').optional(),
  published: z.coerce.date(),
  modified: z.coerce.date(),
};

const faq = z.object({ question: z.string(), answer: z.string() });

const landing = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/landing' }),
  schema: z.object({
    ...seo,
    /** hero <h1> */
    heading: z.string(),
    /** hero line under the heading */
    tagline: z.string(),
    /** questions for the FAQ block above the quote form */
    faqs: z.array(faq).default([]),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/posts' }),
  schema: z.object({
    ...seo,
    /** <h1> */
    heading: z.string(),
    /** featured image above the article */
    image: z.string().startsWith('/').optional(),
    imageAlt: z.string().default(''),
  }),
});

export const collections = { landing, posts };
