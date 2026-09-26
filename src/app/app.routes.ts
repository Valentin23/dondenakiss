import { Routes } from '@angular/router';
import { Locale, PAGE_SLUGS, PageKey } from './i18n/locales';

export interface PageData {
  page: PageKey;
  description: string;
}

/**
 * Routes are generated per locale from `i18n/pages.json`, so slugs are
 * translated (/carta in Spanish, /en/menu in English...).
 * Titles and descriptions use `$localize` and are translated at build time.
 */
export function buildRoutes(locale: Locale): Routes {
  const slug = (page: PageKey) => PAGE_SLUGS[page][locale];
  const data = (page: PageKey, description: string): PageData => ({ page, description });

  return [
    {
      path: slug('home'),
      pathMatch: 'full',
      title: $localize`:@@home.title:Donde Nakiss · Brunch y tapas sin gluten en Alicante`,
      data: data(
        'home',
        $localize`:@@home.description:Brunch y tapas en el centro de Alicante con opción sin gluten en todos los platos. Miembros de ACECOVA. Reserva tu mesa.`,
      ),
      loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    },
    {
      path: slug('menu'),
      title: $localize`:@@menu.title:Carta de brunch y tapas sin gluten · Donde Nakiss`,
      data: data(
        'menu',
        $localize`:@@menu.description:Nuestra carta de brunch y tapas: todos los platos tienen opción sin gluten, con pan con y sin gluten.`,
      ),
      loadComponent: () => import('./pages/menu/menu').then((m) => m.Menu),
    },
    {
      path: slug('reservations'),
      title: $localize`:@@reservations.title:Reservar mesa · Donde Nakiss Alicante`,
      data: data(
        'reservations',
        $localize`:@@reservations.description:Reserva tu mesa en Donde Nakiss, brunch y tapas sin gluten en Alicante.`,
      ),
      loadComponent: () => import('./pages/reservations/reservations').then((m) => m.Reservations),
    },
    {
      path: slug('contact'),
      title: $localize`:@@contact.title:Contacto y cómo llegar · Donde Nakiss Alicante`,
      data: data(
        'contact',
        $localize`:@@contact.description:Donde Nakiss, brunch y tapas sin gluten en la Rambla de Méndez Núñez, 48, Alicante. Dirección, horario y contacto.`,
      ),
      loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    },
    {
      path: slug('legal'),
      title: $localize`:@@legal.title:Aviso legal · Donde Nakiss`,
      data: data('legal', $localize`:@@legal.description:Aviso legal de Donde Nakiss.`),
      loadComponent: () => import('./pages/legal/legal').then((m) => m.Legal),
    },
    {
      path: slug('privacy'),
      title: $localize`:@@privacy.title:Política de privacidad · Donde Nakiss`,
      data: data(
        'privacy',
        $localize`:@@privacy.description:Política de privacidad de Donde Nakiss.`,
      ),
      loadComponent: () => import('./pages/privacy/privacy').then((m) => m.Privacy),
    },
    {
      // Prerendered as /404/; scripts/postbuild.mjs copies it to 404.html.
      path: '404',
      title: $localize`:@@notFound.title:Página no encontrada · Donde Nakiss`,
      loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    },
    {
      path: '**',
      title: $localize`:@@notFound.title:Página no encontrada · Donde Nakiss`,
      loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    },
  ];
}
