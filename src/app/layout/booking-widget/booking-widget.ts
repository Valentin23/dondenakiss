import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PHONE_HREF, SITE } from '../../config/site';

/**
 * The DISH Reservation widget. Until `SITE.dishWidgetUrl` is set, a card that
 * asks guests to call instead.
 */
@Component({
  selector: 'app-booking-widget',
  template: `
    @if (widgetUrl) {
      <iframe
        [src]="widgetUrl"
        title="Reservas Donde Nakiss"
        i18n-title="@@reservations.widgetTitle"
        loading="lazy"
      ></iframe>
    } @else {
      <div class="fallback">
        <p class="title" i18n="@@booking.soonTitle">Muy pronto, reservas online</p>
        <p i18n="@@booking.soonText">Mientras tanto, llámanos y te guardamos la mesa.</p>
        <a class="btn btn-primary" [href]="phoneHref">
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"
            />
          </svg>
          <span i18n="@@booking.call">Llamar al {{ phone }}</span>
        </a>
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
    }
    iframe {
      display: block;
      width: 100%;
      min-height: 40rem;
      border: 0;
      border-radius: var(--dn-radius-md);
    }
    .fallback {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--dn-space-4);
      padding: var(--dn-space-8);
      border: 1px solid var(--dn-line);
      border-radius: var(--dn-radius-md);
      background: #fff;
      box-shadow: var(--dn-shadow-card);
    }
    .fallback p {
      margin: 0;
      color: var(--dn-ink-muted);
    }
    .fallback .title {
      font: var(--dn-text-h2);
      color: var(--dn-ink);
    }
    .btn {
      margin-top: var(--dn-space-2);
    }
    svg {
      fill: none;
      stroke: currentColor;
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    @media (max-width: 56.249rem) {
      .fallback {
        padding: var(--dn-space-6) var(--dn-space-4);
      }
      .btn {
        width: 100%;
        min-height: var(--dn-cta-height-mobile);
        font-size: 1.125rem;
      }
    }
  `,
})
export class BookingWidget {
  protected readonly phone = SITE.phone;
  protected readonly phoneHref = PHONE_HREF;
  protected readonly widgetUrl = SITE.dishWidgetUrl
    ? inject(DomSanitizer).bypassSecurityTrustResourceUrl(SITE.dishWidgetUrl)
    : null;
}
