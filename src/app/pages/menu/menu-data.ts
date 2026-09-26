import { Locale } from '../../i18n/locales';

/**
 * Dishes are not in the i18n message files: they are data with one text per
 * locale, so they can be managed from the future /admin.
 */
export type Localized = Record<Locale, string>;

export interface MenuItem {
  name: Localized;
  description?: Localized;
  price: number;
  /**
   * The dish is always prepared gluten-free for everyone (squid, croquettes,
   * pancakes...). Every other dish has a gluten-free option on request.
   */
  alwaysGlutenFree?: boolean;
  /** Codes of the 14 allergens in Regulation (EU) No 1169/2011. */
  allergens?: string[];
}

export interface MenuSection {
  title: Localized;
  items: MenuItem[];
}

// TODO: add the real menu.
export const MENU: MenuSection[] = [];
