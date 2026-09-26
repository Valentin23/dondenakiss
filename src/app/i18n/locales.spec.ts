import { LOCALES, PAGE_SLUGS, PageKey, pagePath } from './locales';

describe('locales', () => {
  it('defines a slug for every page in every locale', () => {
    for (const slugs of Object.values(PAGE_SLUGS)) {
      expect(Object.keys(slugs).sort()).toEqual([...LOCALES].sort());
    }
  });

  it('uses unique, URL-safe slugs within each locale', () => {
    for (const locale of LOCALES) {
      const slugs = Object.values(PAGE_SLUGS).map((s) => s[locale]);
      expect(new Set(slugs).size).toBe(slugs.length);
      for (const slug of slugs) {
        expect(slug).toMatch(/^[a-z0-9-]*$/);
      }
    }
  });

  it('builds paths with the locale prefix, except for Spanish', () => {
    expect(pagePath('home', 'es')).toBe('/');
    expect(pagePath('menu', 'es')).toBe('/carta/');
    expect(pagePath('home', 'en')).toBe('/en/');
    expect(pagePath('menu' satisfies PageKey, 'fr')).toBe('/fr/carte/');
  });
});
