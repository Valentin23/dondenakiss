import { LOCALES } from '../../i18n/locales';
import { FEATURED_DISHES, isSingleDish, Localized, MENUS } from './menu-data';

const sections = MENUS.flatMap((m) => m.sections);
const items = sections.flatMap((s) => s.items);

function texts(...values: (Localized | undefined)[]): Localized[] {
  return values.filter((v): v is Localized => v !== undefined);
}

describe('menu data (synced from Sobremesa)', () => {
  it('has the Brunch and Tapas tabs, with unique ids', () => {
    expect(MENUS.map((m) => m.key)).toEqual(['brunch', 'tapas']);
    const ids = [...sections.map((s) => s.id), ...items.map((i) => i.id)];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has every text in every locale', () => {
    const all = [
      ...MENUS.flatMap((m) => texts(m.name, m.note)),
      ...sections.flatMap((s) => texts(s.title, s.note, s.footnote)),
      ...items.flatMap((i) => texts(i.name, i.description, i.priceNote)),
    ];
    for (const text of all) {
      for (const locale of LOCALES) {
        expect(text[locale]?.trim(), JSON.stringify(text)).toBeTruthy();
      }
    }
  });

  it('has prices in euros with at most two decimals', () => {
    for (const item of items.filter((i) => i.price !== null)) {
      expect(item.price, item.id).toBeGreaterThan(0);
      expect(Math.round(item.price! * 100) / 100, item.id).toBe(item.price);
    }
  });

  it('features the dishes marked in Sobremesa, in menu order', () => {
    expect(FEATURED_DISHES.length).toBeGreaterThan(0);
    expect(FEATURED_DISHES.every((d) => d.featured)).toBe(true);
    expect(FEATURED_DISHES.map((d) => d.name.es)).toContain('Fideuá de marisco');
  });

  it('shows "Un completo" as a single-dish card', () => {
    expect(sections.filter(isSingleDish).map((s) => s.title.es)).toEqual(['Un completo']);
  });
});
