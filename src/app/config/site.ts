export const SITE = {
  /** Short brand name. */
  name: 'Donde Nakiss',
  /** Full name, as on the shop sign and the Google Business Profile. */
  fullName: 'Donde Nakiss Brunch & Tapas Sin Gluten',
  phone: '+34 625 32 78 63',
  // TODO: switch to the dondenakiss.es address once it exists.
  email: 'elrincondenakiss@gmail.com',
  address: 'Rambla de Méndez Núñez, 48, 03002 Alicante',
  postalAddress: {
    streetAddress: 'Rambla de Méndez Núñez, 48',
    postalCode: '03002',
    addressLocality: 'Alicante',
    addressRegion: 'Alicante',
    addressCountry: 'ES',
  },
  geo: { latitude: 38.3472456, longitude: -0.4844562 },
  /** Google Maps listing (Google Business Profile), by CID. */
  googleMapsUrl: 'https://maps.google.com/?cid=9919217617028969137',
  /** Coeliac association the restaurant belongs to. */
  celiacAssociation: { name: 'ACECOVA', url: 'https://www.acecova.org' },
  /** DISH Reservation widget URL (rendered in an iframe on the reservations page). */
  dishWidgetUrl: '',
  /** Website owner (LSSI art. 10), shown in the legal notice and the privacy policy. */
  owner: {
    name: 'Florin Cornel Nicolae',
    taxId: 'X8349407Q',
  },
  /** Date of the last revision of the legal texts (ISO). */
  legalUpdated: '2026-09-26',
} as const;

/** `tel:` URI for the phone number (RFC 3966 does not allow spaces). */
export const PHONE_HREF = `tel:${SITE.phone.replace(/\s/g, '')}`;
