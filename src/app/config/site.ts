export const SITE = {
  name: 'DondeNakiss',
  // TODO: teléfono y enlace de Google Maps.
  phone: '',
  // TODO: cambiar por el email con el dominio cuando exista.
  email: 'elrincondenakiss@gmail.com',
  address: 'Rambla de Méndez Núñez, 48, 03002 Alicante',
  googleMapsUrl: '',
  /** URL del widget de DISH Reservation (se muestra en un iframe en /reservas). */
  dishWidgetUrl: '',
  /** Titular de la web (LSSI art. 10). Aparece en el aviso legal y la política de privacidad. */
  owner: {
    name: 'Florin Cornel Nicolae',
    taxId: 'X8349407Q',
  },
  /** Fecha de la última revisión de los textos legales (ISO). */
  legalUpdated: '2026-09-26',
} as const;
