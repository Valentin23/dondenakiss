import { InjectionToken, LOCALE_ID, inject } from '@angular/core';
import pages from './pages.json';

export const SITE_URL = 'https://dondenakiss.es';

export const LOCALES = ['es', 'en', 'fr', 'it', 'pl'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'es';

/** Native name of each language, for the language switcher. */
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
 * Locale of the current build. Plain `ng serve` (no locale configuration) uses
 * `en-US`, which serves the source (Spanish) texts, so it maps to `es`.
 */
export const CURRENT_LOCALE = new InjectionToken<Locale>('CURRENT_LOCALE', {
  providedIn: 'root',
  factory: () => {
    const id = inject(LOCALE_ID);
    return isLocale(id) ? id : DEFAULT_LOCALE;
  },
});

/** Absolute path (no domain) of a page in a locale, e.g. `/en/menu/`. */
export function pagePath(page: PageKey, locale: Locale): string {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  const slug = PAGE_SLUGS[page][locale];
  return `${prefix}/${slug ? `${slug}/` : ''}`;
}
