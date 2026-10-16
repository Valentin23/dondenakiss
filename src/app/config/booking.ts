import { InjectionToken } from '@angular/core';
import { SITE } from './site';

/** Who takes the website's online bookings. */
export type BookingProvider = 'dish' | 'taulada';

export interface BookingConfig {
  provider: BookingProvider;
  /** DISH Reservation's widget, loaded directly in an iframe. */
  dishWidgetUrl: string;
  /** The restaurant's booking page on Taulada, shown in embed mode. */
  tauladaUrl: string;
}

/**
 * The booking setup from `SITE.booking`, as a token so tests can try either
 * provider. The booking widget and the privacy policy read it.
 */
export const BOOKING = new InjectionToken<BookingConfig>('BOOKING', {
  providedIn: 'root',
  factory: () => SITE.booking,
});
