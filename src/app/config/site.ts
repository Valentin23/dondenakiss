export type DayOfWeek =
  'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface OpeningHours {
  days: readonly DayOfWeek[];
  /** 24h `HH:mm`. */
  opens: string;
  closes: string;
}

export const SITE = {
  /** Short brand name. */
  name: 'Donde Nakiss',
  /** Full name, as on the shop sign and the Google Business Profile. */
  fullName: 'Donde Nakiss Brunch & Tapas Sin Gluten',
  phone: '+34 624 30 36 46',
  // TODO: switch to the dondenakiss.es address once it exists.
  email: 'dondenakiss@gmail.com',
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
  /**
   * Keyless Google Maps embed of the listing (what maps.google.com/maps?q=…&output=embed
   * redirects to). Loaded only on click: see layout/map-embed.
   */
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sDonde+Nakiss+Alicante!6i17',
  instagramUrl: 'https://www.instagram.com/dondenakiss12/',
  /** Price range per person, as shown on the Google Business Profile. */
  priceRange: '10-20 €',
  /**
   * Opening hours, same as the Google Business Profile. Days not listed are
   * closed. Keep both in sync.
   */
  openingHours: [
    { days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '16:00' },
    { days: ['Saturday'], opens: '10:00', closes: '16:00' },
    { days: ['Friday', 'Saturday'], opens: '20:00', closes: '23:00' },
  ],
  /** Coeliac associations the restaurant belongs to: the regional one and a national one. */
  celiacAssociations: {
    regional: { name: 'ACECOVA', url: 'https://www.acecova.org' },
    national: { name: 'Viviendo Sin Gluten', url: 'https://viviendosingluten.org/' },
  },
  /**
   * DISH Reservation widget, rendered in an iframe on the home and reservations
   * pages. DISH's embed snippet loads a script that only builds this iframe, so
   * the iframe is used directly; `?lang=` (added per locale) picks its language.
   */
  dishWidgetUrl: 'https://reservation.dish.co/widget/hydra-06933495-a3ac-403d-9ac6-a94eaec9ea9c',
  /** Website owner (LSSI art. 10), shown in the legal notice and the privacy policy. */
  owner: {
    name: 'Florin Cornel Nicolae',
    taxId: 'X8349407Q',
  },
  /**
   * Prior administrative authorisation of the activity (LSSI art. 10.1.c): the
   * opening licence the premises started with. Its file number stays the same
   * when the holder changes (confirmed by the owners); the transfer to the
   * current owner is still being processed by the Ayuntamiento.
   */
  activityLicence: { reference: '1079/94', authority: 'Ayuntamiento de Alicante' },
  /** Date of the last revision of the legal texts (ISO). */
  legalUpdated: '2026-10-09',
} as const;

/** `tel:` URI for the phone number (RFC 3966 does not allow spaces). */
export const PHONE_HREF = `tel:${SITE.phone.replace(/\s/g, '')}`;
