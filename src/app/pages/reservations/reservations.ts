import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PHONE_HREF, SITE } from '../../config/site';

@Component({
  selector: 'app-reservations',
  template: `
    <h1 i18n="@@reservations.heading">Reservas</h1>
    @if (widgetUrl) {
      <iframe
        class="dish-widget"
        [src]="widgetUrl"
        title="Reservas Donde Nakiss"
        i18n-title="@@reservations.widgetTitle"
        loading="lazy"
      ></iframe>
    } @else {
      <p i18n="@@reservations.fallback">
        Muy pronto podrás reservar online. Mientras tanto, llámanos al
        <a [href]="phoneHref">{{ phone }}</a
        >.
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
  protected readonly phone = SITE.phone;
  protected readonly phoneHref = PHONE_HREF;
  protected readonly widgetUrl = SITE.dishWidgetUrl
    ? inject(DomSanitizer).bypassSecurityTrustResourceUrl(SITE.dishWidgetUrl)
    : null;
}
