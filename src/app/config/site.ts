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
    // TODO: add the url once we have the association's official website.
    national: { name: 'Viviendo Sin Gluten', url: '' },
  },
  /** DISH Reservation widget URL (rendered in an iframe on the reservations page). */
  dishWidgetUrl: '',
  /** Website owner (LSSI art. 10), shown in the legal notice and the privacy policy. */
  owner: {
    name: 'Florin Cornel Nicolae',
    taxId: 'X8349407Q',
  },
  /**
   * Prior administrative authorisation of the activity (LSSI art. 10.1.c): the
   * premises opened with a licence. Shown in the legal notice only once the
   * reference is known.
   * TODO: fill in the licence reference and the issuing body (ask the gestoría
   * or the Ayuntamiento de Alicante). Never guess them.
   */
  activityLicence: { reference: '', authority: '' },
  /** Date of the last revision of the legal texts (ISO). */
  legalUpdated: '2026-10-03',
} as const;

/** `tel:` URI for the phone number (RFC 3966 does not allow spaces). */
export const PHONE_HREF = `tel:${SITE.phone.replace(/\s/g, '')}`;
