import { Component, inject } from '@angular/core';
import { PHONE_HREF, SITE } from '../../config/site';
import { dayName, hoursByDay } from '../../config/opening-hours';
import { CURRENT_LOCALE } from '../../i18n/locales';

@Component({
  selector: 'app-contact',
  template: `
    <h1 i18n="@@contact.heading">Contacto y ubicación</h1>
    <address>
      <p>{{ site.address }}</p>
      <p>
        <a [href]="phoneHref">{{ site.phone }}</a>
      </p>
      <p>
        <a [href]="'mailto:' + site.email">{{ site.email }}</a>
      </p>
      <p>
        <a [href]="site.instagramUrl" rel="noopener" target="_blank">Instagram</a>
      </p>
    </address>
    <p>
      <a [href]="site.googleMapsUrl" rel="noopener" target="_blank" i18n="@@contact.maps"
        >Cómo llegar (Google Maps)</a
      >
    </p>

    <h2 i18n="@@contact.hours">Horario</h2>
    <table class="hours">
      <tbody>
        @for (day of week; track day.day) {
          <tr>
            <th scope="row">{{ day.name }}</th>
            <td>
              @for (slot of day.slots; track slot.opens) {
                <span class="slot">{{ slot.opens }}–{{ slot.closes }}</span>
              } @empty {
                <span i18n="@@contact.closed">Cerrado</span>
              }
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: `
    .hours th {
      text-align: left;
      padding-right: 1.5rem;
      font-weight: 400;
    }
    .hours th::first-letter {
      text-transform: uppercase;
    }
    .slot {
      display: block;
    }
  `,
})
export class Contact {
  private readonly locale = inject(CURRENT_LOCALE);

  protected readonly site = SITE;
  protected readonly phoneHref = PHONE_HREF;
  protected readonly week = hoursByDay(SITE.openingHours).map((d) => ({
    ...d,
    name: dayName(d.day, this.locale),
  }));
}
