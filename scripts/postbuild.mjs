// Post-processing of the static build for Cloudflare Pages:
// - 404.html at the root and in every locale (Pages serves the nearest 404.html).
// - sitemap.xml with the hreflang alternates of every page.
// - _headers, robots.txt and photos/ only at the root (Angular copies public/ into every
//   locale; photos are requested by absolute path, see src/app/config/photo-loader.ts).
import { copyFileSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = 'https://dondenakiss.es';
const DEFAULT_LOCALE = 'es';
const OUT = 'dist/dondenakiss/browser';

const pages = JSON.parse(readFileSync('src/app/i18n/pages.json', 'utf8'));
const locales = Object.keys(pages.home);

const dirOf = (locale) => (locale === DEFAULT_LOCALE ? OUT : join(OUT, locale));
const pathOf = (page, locale) => {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  const slug = pages[page][locale];
  return `${prefix}/${slug ? `${slug}/` : ''}`;
};

for (const locale of locales) {
  const dir = dirOf(locale);
  const notFound = join(dir, '404', 'index.html');
  if (!existsSync(notFound)) {
    throw new Error(`Missing ${notFound}: did prerendering fail?`);
  }
  copyFileSync(notFound, join(dir, '404.html'));
  rmSync(join(dir, '404'), { recursive: true });

  if (locale !== DEFAULT_LOCALE) {
    for (const file of ['_headers', '_redirects', 'robots.txt', 'photos']) {
      rmSync(join(dir, file), { recursive: true, force: true });
    }
  }
}

const urls = Object.keys(pages).flatMap((page) =>
  locales.map((locale) => {
    const alternates = [...locales, 'x-default']
      .map((alt) => {
        const href = SITE_URL + pathOf(page, alt === 'x-default' ? DEFAULT_LOCALE : alt);
        return `    <xhtml:link rel="alternate" hreflang="${alt}" href="${href}"/>`;
      })
      .join('\n');
    return `  <url>\n    <loc>${SITE_URL + pathOf(page, locale)}</loc>\n${alternates}\n  </url>`;
  }),
);

writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`,
);

console.log(`postbuild: 404.html x${locales.length}, sitemap.xml (${urls.length} URLs)`);
