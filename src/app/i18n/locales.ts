import { InjectionToken, LOCALE_ID, inject } from '@angular/core';
import pages from './pages.json';

export const SITE_URL = 'https://dondenakiss.es';

export const LOCALES = ['es', 'en', 'fr', 'it', 'pl'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'es';

/** Nombre de cada idioma en su propio idioma, para el selector. */
export const LOCALE_NAMES: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  it: 'Italiano',
  pl: 'Polski',
};

export type PageKey = keyof typeof pages;
export const PAGE_SLUGS: Record<PageKey, Record<Locale, string>> = pages;

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Idioma del build actual. Con `ng serve` sin configuración de idioma, Angular
 * usa `en-US`: en ese caso se sirven los textos fuente (español).
 */
export const CURRENT_LOCALE = new InjectionToken<Locale>('CURRENT_LOCALE', {
  providedIn: 'root',
  factory: () => {
    const id = inject(LOCALE_ID);
    return isLocale(id) ? id : DEFAULT_LOCALE;
  },
});

/** Ruta absoluta (sin dominio) de una página en un idioma, p. ej. `/en/menu/`. */
export function pagePath(page: PageKey, locale: Locale): string {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  const slug = PAGE_SLUGS[page][locale];
  return `${prefix}/${slug ? `${slug}/` : ''}`;
}
