import { Routes } from '@angular/router';
import { Locale, PAGE_SLUGS, PageKey } from './i18n/locales';

export interface PageData {
  page: PageKey;
  description: string;
}

/**
 * Las rutas se generan por idioma a partir de `i18n/pages.json`, para que los
 * slugs estén traducidos (/carta en español, /en/menu en inglés...).
 * Los títulos y descripciones usan `$localize` y se traducen en el build.
 */
export function buildRoutes(locale: Locale): Routes {
  const slug = (page: PageKey) => PAGE_SLUGS[page][locale];
  const data = (page: PageKey, description: string): PageData => ({ page, description });

  return [
    {
      path: slug('home'),
      pathMatch: 'full',
      title: $localize`:@@home.title:DondeNakiss · Restaurante`,
      data: data(
        'home',
        $localize`:@@home.description:Restaurante DondeNakiss. Consulta la carta y reserva tu mesa.`,
      ),
      loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    },
    {
      path: slug('menu'),
      title: $localize`:@@menu.title:Carta · DondeNakiss`,
      data: data('menu', $localize`:@@menu.description:La carta del restaurante DondeNakiss.`),
      loadComponent: () => import('./pages/menu/menu').then((m) => m.Menu),
    },
    {
      path: slug('reservations'),
      title: $localize`:@@reservations.title:Reservas · DondeNakiss`,
      data: data(
        'reservations',
        $localize`:@@reservations.description:Reserva tu mesa en DondeNakiss.`,
      ),
      loadComponent: () => import('./pages/reservations/reservations').then((m) => m.Reservations),
    },
    {
      path: slug('contact'),
      title: $localize`:@@contact.title:Contacto y ubicación · DondeNakiss`,
      data: data(
        'contact',
        $localize`:@@contact.description:Dirección, horario y contacto de DondeNakiss.`,
      ),
      loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    },
    {
      path: slug('legal'),
      title: $localize`:@@legal.title:Aviso legal · DondeNakiss`,
      data: data('legal', $localize`:@@legal.description:Aviso legal de DondeNakiss.`),
      loadComponent: () => import('./pages/legal/legal').then((m) => m.Legal),
    },
    {
      path: slug('privacy'),
      title: $localize`:@@privacy.title:Política de privacidad · DondeNakiss`,
      data: data(
        'privacy',
        $localize`:@@privacy.description:Política de privacidad de DondeNakiss.`,
      ),
      loadComponent: () => import('./pages/privacy/privacy').then((m) => m.Privacy),
    },
    {
      // Se prerenderiza como /404/ y scripts/postbuild.mjs lo copia a 404.html.
      path: '404',
      title: $localize`:@@notFound.title:Página no encontrada · DondeNakiss`,
      loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    },
    {
      path: '**',
      title: $localize`:@@notFound.title:Página no encontrada · DondeNakiss`,
      loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    },
  ];
}
