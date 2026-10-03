import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CURRENT_LOCALE, PAGE_SLUGS } from '../../i18n/locales';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  host: { class: 'page narrow' },
  template: `
    <header class="page-head">
      <p class="eyebrow" i18n="@@notFound.eyebrow">Error 404</p>
      <h1 i18n="@@notFound.heading">Página no encontrada</h1>
      <p class="lead" i18n="@@notFound.lead">
        Esta página no existe o se ha movido. La carta, en cambio, sigue en su sitio.
      </p>
    </header>
    <div class="actions">
      <a class="btn btn-primary" routerLink="/" i18n="@@notFound.back">Volver al inicio</a>
      <a class="btn btn-secondary" [routerLink]="menuPath" i18n="@@home.seeMenu">Ver la carta</a>
    </div>
  `,
  styles: `
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--dn-space-4);
    }
    .btn-secondary {
      color: var(--dn-ink);
    }
  `,
})
export class NotFound {
  protected readonly menuPath = `/${PAGE_SLUGS.menu[inject(CURRENT_LOCALE)]}`;
}
