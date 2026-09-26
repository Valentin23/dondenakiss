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
    servesCuisine: [
      $localize`:@@schema.cuisine.brunch:Brunch`,
      $localize`:@@schema.cuisine.tapas:Tapas`,
      $localize`:@@schema.cuisine.glutenFree:Sin gluten`,
    ],
    hasMenu: SITE_URL + pagePath('menu', locale),
    acceptsReservations: true,
    memberOf: {
      '@type': 'Organization',
      name: SITE.celiacAssociation.name,
      url: SITE.celiacAssociation.url,
    },
  };
}
