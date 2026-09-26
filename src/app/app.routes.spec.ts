import { buildRoutes } from './app.routes';
import { LOCALES, PAGE_SLUGS } from './i18n/locales';

describe('buildRoutes', () => {
  it.each(LOCALES)('creates one route per page for %s, plus 404 and wildcard', (locale) => {
    const paths = buildRoutes(locale).map((route) => route.path);
    const expected = Object.values(PAGE_SLUGS).map((slugs) => slugs[locale]);
    expect(paths).toEqual([...expected, '404', '**']);
  });
});
