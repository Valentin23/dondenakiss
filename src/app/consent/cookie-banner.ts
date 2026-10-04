import { Component, afterNextRender, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CURRENT_LOCALE, PAGE_SLUGS } from '../i18n/locales';
import { Consent } from './consent';

/**
 * First layer of the cookie notice (AEPD guide, May 2024): who uses which
 * cookies and why, accept and reject as equal buttons in the same place, and a
 * link to the second layer (privacy policy). It does not block the page.
 */
@Component({
  selector: 'app-cookie-banner',
  imports: [RouterLink],
  template: `
    @if (consent.bannerVisible()) {
      <section class="banner" aria-labelledby="cookie-banner-title">
        <h2 id="cookie-banner-title" i18n="@@cookies.title">Cookies de Google Maps</h2>
        <p i18n="@@cookies.text">
          Esta web solo usa cookies de terceros para mostrarte nuestra ubicación en un mapa de
          Google Maps: Google recibirá tu dirección IP y puede instalar sus cookies. Si las
          rechazas, puedes seguir usando la web con normalidad, sin el mapa.
          <a [routerLink]="privacyPath">Más información</a>
        </p>
        <div class="actions">
          <button type="button" class="btn" (click)="consent.reject()" i18n="@@cookies.reject">
            Rechazar
          </button>
          <button type="button" class="btn" (click)="consent.accept()" i18n="@@cookies.accept">
            Aceptar
          </button>
        </div>
      </section>
    }
  `,
  styles: `
    .banner {
      position: fixed;
      right: var(--dn-space-4);
      bottom: var(--dn-space-4);
      left: var(--dn-space-4);
      z-index: 30;
      display: flex;
      flex-direction: column;
      gap: var(--dn-space-2);
      max-width: 30rem;
      margin-left: auto;
      padding: var(--dn-space-6);
      border: 1px solid rgb(from var(--dn-on-deep) r g b / 30%);
      border-radius: var(--dn-radius-md);
      background: var(--dn-olive-deep);
      color: var(--dn-on-deep);
      box-shadow: var(--dn-shadow-card);
      animation: banner-in var(--dn-duration) var(--dn-ease-out);
    }
    h2 {
      margin: 0;
      font: var(--dn-text-dish);
      color: var(--dn-on-facade);
    }
    p {
      margin: 0;
      font: var(--dn-text-small);
    }
    a {
      color: var(--dn-on-deep);
    }
    a:hover {
      color: var(--dn-on-facade);
    }
    :focus-visible {
      outline-color: var(--dn-on-deep);
    }
    .actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--dn-space-4);
      margin-top: var(--dn-space-2);
    }
    /* Accept and reject look exactly the same (AEPD: same level and visibility). */
    .btn {
      border-color: var(--dn-on-deep);
      background: var(--dn-on-deep);
      color: var(--dn-olive-deep);
    }
    .btn:hover {
      border-color: var(--dn-on-facade);
      background: var(--dn-on-facade);
      color: var(--dn-olive-deep);
    }
    @keyframes banner-in {
      from {
        opacity: 0;
        translate: 0 8px;
      }
    }
  `,
})
export class CookieBanner {
  protected readonly consent = inject(Consent);
  protected readonly privacyPath = `/${PAGE_SLUGS.privacy[inject(CURRENT_LOCALE)]}`;

  constructor() {
    // Browser only and after hydration, so the prerendered HTML stays the same.
    afterNextRender(() => this.consent.load());
  }
}
