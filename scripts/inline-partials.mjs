import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(process.cwd());
const pages = ['index.html', 'games.html', 'updates.html', 'article.html'];
const headerPath = resolve(root, 'partials/header.html');
const footerPath = resolve(root, 'partials/footer.html');

function read(p) { return readFileSync(p, 'utf8'); }
function write(p, c) { writeFileSync(p, c, 'utf8'); }

const headerHtml = read(headerPath).trim();
const footerHtml = read(footerPath).trim();

const HEADER_START = '<!-- synced:header start -->';
const HEADER_END   = '<!-- synced:header end -->';
const FOOTER_START = '<!-- synced:footer start -->';
const FOOTER_END   = '<!-- synced:footer end -->';

function injectBlock(content, startMarker, endMarker, placeholderRegexes, replacementHtml) {
  const wrapped = `${startMarker}\n${replacementHtml}\n${endMarker}`;
  const markerRegex = new RegExp(`${startMarker}[\s\S]*?${endMarker}`);

  if (markerRegex.test(content)) {
    return content.replace(markerRegex, wrapped);
  }
  for (const rx of placeholderRegexes) {
    if (rx.test(content)) {
      return content.replace(rx, wrapped);
    }
  }
  return content; // no change
}

for (const page of pages) {
  const pagePath = resolve(root, page);
  let html = read(pagePath);

  // Header: replace markers, placeholder div, or existing header block
  html = injectBlock(
    html,
    HEADER_START,
    HEADER_END,
    [
      /<div id=["']siteHeader["']><\/div>/,
      /<header class=["']site-header["'][\s\S]*?<\/header>/
    ],
    headerHtml
  );

  // Footer: replace markers, placeholder div, or existing footer block
  html = injectBlock(
    html,
    FOOTER_START,
    FOOTER_END,
    [
      /<div id=["']siteFooter["']><\/div>/,
      /<footer[^>]*class=["'][^"']*site-footer[^"']*["'][\s\S]*?<\/footer>/
    ],
    footerHtml
  );

  write(pagePath, html);
}

console.log('Partials inlined into HTML pages.');
