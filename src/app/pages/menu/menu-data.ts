import { Locale } from '../../i18n/locales';
import data from './menu.json';

/**
 * The menu comes from Taulada, where the owners edit it. menu.json and
 * public/photos/menu/ are a copy that `node scripts/sync-menu.mjs` refreshes;
 * Cloudflare Pages builds refresh it on their own before building.
 */
export type Localized = Record<Locale, string>;

export interface MenuItem {
  id: string;
  name: Localized;
  description?: Localized;
  /** In euros, VAT included; null when the dish has no fixed price. */
  price: number | null;
  /** Shown after the price, e.g. "por ración, mín. 2". */
  priceNote?: Localized;
  /** Codes of the 14 allergens in Regulation (EU) No 1169/2011. */
  allergens: string[];
  /** Shown on the home page too. */
  featured: boolean;
  /** Photo in public/photos, without width or extension, e.g. `photos/menu/<name>`. */
  photo?: string;
}

export interface MenuSection {
  id: string;
  title: Localized;
  /** Shown below the title, e.g. "Precio por ración. Mínimo 2 raciones." */
  note?: Localized;
  items: MenuItem[];
  /** Shown after the items, e.g. what every burger comes with. */
  footnote?: Localized;
}

export interface Menu {
  /** Its tab in the URL, e.g. `tapas` in /carta#tapas. */
  key: string;
  name: Localized;
  note?: Localized;
  sections: MenuSection[];
}

export const MENUS = data.menus as Menu[];

/** A section that is one dish with the section's name, e.g. "Un completo": shown as a card. */
export function isSingleDish(section: MenuSection): boolean {
  return section.items.length === 1 && section.items[0].name.es === section.title.es;
}

/** "Los que más se piden" on the home page: the featured dishes, in menu order. */
export const FEATURED_DISHES: MenuItem[] = MENUS.flatMap((menu) =>
  menu.sections.flatMap((section) => section.items.filter((item) => item.featured)),
);
