import { existsSync } from 'node:fs';

/**
 * WordPress-generated "-WxH" variant of a public/ image if it exists, otherwise the image itself.
 * @param {string} src site-relative image path
 * @param {string} [size] e.g. "100x100"
 * @returns {string}
 */
export function thumbnail(src, size = '100x100') {
  const variant = src.replace(/(\.\w+)$/, `-${size}$1`);
  return existsSync(new URL(`../../public${variant}`, import.meta.url)) ? variant : src;
}
