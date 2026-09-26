import { Locale } from '../../i18n/locales';

/**
 * Los platos no van en los ficheros de traducción: son datos con un texto por
 * idioma, pensados para poder gestionarlos más adelante desde /admin.
 */
export type Localized = Record<Locale, string>;

export interface MenuItem {
  name: Localized;
  description?: Localized;
  price: number;
  /** Códigos de los 14 alérgenos del Reglamento (UE) 1169/2011. */
  allergens?: string[];
}

export interface MenuSection {
  title: Localized;
  items: MenuItem[];
}

// TODO: añadir la carta real.
export const MENU: MenuSection[] = [];
