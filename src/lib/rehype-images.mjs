// Rehype plugin for Markdown content: give every <img> loading="lazy", decoding="async" and its
// intrinsic width/height (read from the file in public/), so images reserve space before loading.
// Reads PNG, JPEG, GIF and WebP headers; other formats just get the loading attributes.
import { readFileSync } from 'node:fs';

const cache = new Map();

function size(buf) {
  if (buf.readUInt32BE(0) === 0x89504e47) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }; // PNG
  if (buf.toString('ascii', 0, 3) === 'GIF') return { w: buf.readUInt16LE(6), h: buf.readUInt16LE(8) };
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const kind = buf.toString('ascii', 12, 16);
    if (kind === 'VP8 ') return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    if (kind === 'VP8L') {
      const b = buf.readUInt32LE(21);
      return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
    }
    if (kind === 'VP8X') return { w: buf.readUIntLE(24, 3) + 1, h: buf.readUIntLE(27, 3) + 1 };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    // JPEG: walk segments to the first start-of-frame marker
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) return null;
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return null;
}

function dimensions(src) {
  if (!src.startsWith('/')) return null;
  if (!cache.has(src)) {
    let d = null;
    try {
      d = size(readFileSync(new URL(`../../public${decodeURI(src)}`, import.meta.url)));
    } catch {
      d = null;
    }
    cache.set(src, d);
  }
  return cache.get(src);
}

export default function rehypeImages() {
  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'img') {
      node.properties.loading ??= 'lazy';
      node.properties.decoding ??= 'async';
      const d = dimensions(String(node.properties.src ?? ''));
      if (d && node.properties.width == null) {
        node.properties.width = d.w;
        node.properties.height = d.h;
      }
    }
    node.children?.forEach(visit);
  };
  return visit;
}
