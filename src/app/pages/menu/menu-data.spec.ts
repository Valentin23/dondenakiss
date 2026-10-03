import { LOCALES } from '../../i18n/locales';
import { FEATURED_DISHES, Localized, MENUS } from './menu-data';

const sections = Object.values(MENUS).flat();
const items = sections.flatMap((s) => s.items);

function texts(...values: (Localized | undefined)[]): Localized[] {
  return values.filter((v): v is Localized => v !== undefined);
}

describe('menu data', () => {
  it('uses unique section and dish ids', () => {
    const sectionIds = sections.map((s) => s.id);
    const itemIds = items.map((i) => i.id);
    expect(new Set(sectionIds).size).toBe(sectionIds.length);
    expect(new Set(itemIds).size).toBe(itemIds.length);
  });

  it('has every text in every locale', () => {
    const all = [
      ...sections.flatMap((s) => texts(s.title, s.note, s.footnote)),
      ...items.flatMap((i) => texts(i.name, i.description, i.priceNote)),
    ];
    for (const text of all) {
      for (const locale of LOCALES) {
        expect(text[locale]?.trim(), JSON.stringify(text)).toBeTruthy();
      }
    }
  });

  it('has a positive price in euros with at most two decimals', () => {
    for (const item of items) {
      expect(item.price, item.id).toBeGreaterThan(0);
      expect(Math.round(item.price * 100) / 100, item.id).toBe(item.price);
    }
  });

  it('takes the featured dishes and their prices from the menu', () => {
    expect(FEATURED_DISHES.map((d) => d.id)).toEqual([
      'benedict-trufado',
      'senyoret',
      'calamares-andaluza',
      'croquetas',
    ]);
    expect(FEATURED_DISHES.map((d) => d.price)).toEqual([12.5, 14.9, 14.9, 2.5]);
    expect(FEATURED_DISHES[1].name.es).toBe('Fideuá de marisco');
    expect(FEATURED_DISHES[0].name.es).toBe('Benedict trufado');
    // The fideuà and the squid are gluten-free because their whole section is.
    expect(FEATURED_DISHES.map((d) => !!d.alwaysGlutenFree)).toEqual([false, true, true, true]);
  });
});
