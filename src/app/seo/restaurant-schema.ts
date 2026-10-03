import { SITE } from '../config/site';
import { Locale, SITE_URL, pagePath } from '../i18n/locales';

/**
 * schema.org structured data (JSON-LD) for the restaurant, used by Google for
 * local search and Maps. Validate at https://search.google.com/test/rich-results
 */
export function restaurantSchema(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#restaurant`,
    name: SITE.fullName,
    alternateName: SITE.name,
    url: SITE_URL + pagePath('home', locale),
    email: SITE.email,
    ...(SITE.phone ? { telephone: SITE.phone } : {}),
    address: { '@type': 'PostalAddress', ...SITE.postalAddress },
    geo: { '@type': 'GeoCoordinates', ...SITE.geo },
    hasMap: SITE.googleMapsUrl,
    // Mirrors the Google Business Profile categories.
    servesCuisine: [
      $localize`:@@schema.cuisine.glutenFree:Sin gluten`,
      $localize`:@@schema.cuisine.brunch:Brunch`,
      $localize`:@@schema.cuisine.tapas:Tapas`,
      $localize`:@@schema.cuisine.breakfast:Desayunos`,
      $localize`:@@schema.cuisine.burgers:Hamburguesas`,
      $localize`:@@schema.cuisine.rice:Arroces`,
      $localize`:@@schema.cuisine.seafood:Pescado y marisco`,
      $localize`:@@schema.cuisine.salads:Ensaladas`,
      $localize`:@@schema.cuisine.pastry:Repostería`,
    ],
    priceRange: SITE.priceRange,
    openingHoursSpecification: SITE.openingHours.map(({ days, opens, closes }) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: days,
      opens,
      closes,
    })),
    sameAs: [SITE.instagramUrl, SITE.googleMapsUrl],
    hasMenu: SITE_URL + pagePath('menu', locale),
    acceptsReservations: true,
    memberOf: Object.values(SITE.celiacAssociations).map(({ name, url }) => ({
      '@type': 'Organization',
      name,
      ...(url ? { url } : {}),
    })),
  };
}
