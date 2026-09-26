import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CURRENT_LOCALE } from '../../i18n/locales';
import { MENU } from './menu-data';

@Component({
  selector: 'app-menu',
  imports: [CurrencyPipe],
  template: `
    <h1 i18n="@@menu.heading">Carta</h1>
    @for (section of sections; track $index) {
      <section>
        <h2>{{ section.title[locale] }}</h2>
        <ul>
          @for (item of section.items; track $index) {
            <li>
              <strong>{{ item.name[locale] }}</strong>
              {{ item.price | currency: 'EUR' }}
              @if (item.description) {
                <p>{{ item.description[locale] }}</p>
              }
            </li>
          }
        </ul>
      </section>
    } @empty {
      <p i18n="@@menu.comingSoon">Carta disponible próximamente.</p>
    }
  `,
})
export class Menu {
  protected readonly locale = inject(CURRENT_LOCALE);
  protected readonly sections = MENU;
}
