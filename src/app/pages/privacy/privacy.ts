import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SITE } from '../../config/site';
import { CURRENT_LOCALE, type Locale } from '../../i18n/locales';

// When adding the DISH widget or any other third-party service, update this
// policy (recipients, cookies) and SITE.legalUpdated. The restaurant already
// takes bookings through the DISH app (with its regular-guest and no-show
// history), by phone and by WhatsApp. DISH Digital Solutions GmbH is the
// controller of its booking platform; the restaurant is controller of the
// booking data it receives (DISH privacy policy, 1.1 and 4.1), and DISH acts as
// its processor for the regular-guest records (4.3). The widget's iframe must
// not load before consent if it sets non-essential cookies.
// Cloudflare Web Analytics (a JS beacon) would need consent too: the policy
// only covers Cloudflare's server-side traffic statistics. Google Maps loads
// only with consent (consent/consent.ts, cookie banner) and has its own section.

/** DISH publishes its privacy policy as one PDF per language (English is `GB`). */
const DISH_PRIVACY_LANG: Record<Locale, string> = {
  es: 'ES',
  en: 'GB',
  fr: 'FR',
  it: 'IT',
  pl: 'PL',
};

@Component({
  selector: 'app-privacy',
  host: { class: 'page narrow' },
  imports: [DatePipe],
  templateUrl: './privacy.html',
})
export class Privacy {
  protected readonly site = SITE;
  protected readonly dishPrivacyUrl = `https://cdn.reservation.dish.co/static-static/static/pp-tc/privacy_${DISH_PRIVACY_LANG[inject(CURRENT_LOCALE)]}.pdf`;
}
