import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SITE } from '../../config/site';

@Component({
  selector: 'app-reservations',
  template: `
    <h1 i18n="@@reservations.heading">Reservas</h1>
    @if (widgetUrl) {
      <iframe
        class="dish-widget"
        [src]="widgetUrl"
        title="Reservas DondeNakiss"
        i18n-title="@@reservations.widgetTitle"
        loading="lazy"
      ></iframe>
    } @else {
      <p i18n="@@reservations.fallback">
        Muy pronto podrás reservar online. Mientras tanto, llámanos por teléfono.
      </p>
    }
  `,
  styles: `
    .dish-widget {
      width: 100%;
      min-height: 40rem;
      border: 0;
    }
  `,
})
export class Reservations {
  protected readonly widgetUrl = SITE.dishWidgetUrl
    ? inject(DomSanitizer).bypassSecurityTrustResourceUrl(SITE.dishWidgetUrl)
    : null;
}
