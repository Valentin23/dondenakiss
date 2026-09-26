import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CURRENT_LOCALE, PAGE_SLUGS } from '../../i18n/locales';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <h1 i18n="@@home.heading">Bienvenido a DondeNakiss</h1>
    <p i18n="@@home.intro">Cocina casera para compartir.</p>
    <p>
      <a [routerLink]="reservationsPath" i18n="@@home.cta">Reserva tu mesa</a>
    </p>
  `,
})
export class Home {
  protected readonly reservationsPath = `/${PAGE_SLUGS.reservations[inject(CURRENT_LOCALE)]}`;
}
