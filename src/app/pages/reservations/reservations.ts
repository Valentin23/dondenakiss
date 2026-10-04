import { Component } from '@angular/core';
import { PHONE_HREF, SITE } from '../../config/site';
import { BookingWidget } from '../../layout/booking-widget/booking-widget';
import { HoursSummary } from '../../layout/hours-summary/hours-summary';

@Component({
  selector: 'app-reservations',
  imports: [BookingWidget, HoursSummary],
  host: { class: 'page' },
  template: `
    <header class="page-head">
      <p class="eyebrow" i18n="@@home.bookingEyebrow">Reservas</p>
      <h1 i18n="@@reservations.heading">Reserva tu mesa</h1>
      <p class="lead" i18n="@@home.bookingHeading">Somos pocas mesas: mejor reserva</p>
    </header>

    <div class="layout">
      <app-booking-widget />
      <aside class="side">
        <section aria-labelledby="groups-heading">
          <h2 id="groups-heading" class="eyebrow" i18n="@@reservations.groups">Grupos</h2>
          <p i18n="@@home.bookingText">
            Para grupos grandes, llámanos con un poco de antelación y te lo preparamos todo.
          </p>
          <p class="phone">
            <a [href]="phoneHref">{{ site.phone }}</a>
          </p>
        </section>
        <section aria-labelledby="hours-heading">
          <h2 id="hours-heading" class="eyebrow" i18n="@@contact.hours">Horario</h2>
          <app-hours-summary showClosed />
        </section>
      </aside>
    </div>
  `,
  styles: `
    .layout {
      display: grid;
      gap: 40px;
    }
    @media (min-width: 56.25rem) {
      .layout {
        grid-template-columns: minmax(0, 1fr) minmax(0, 360px);
        align-items: start;
        gap: var(--dn-space-16);
      }
    }
    .side {
      display: flex;
      flex-direction: column;
      gap: var(--dn-space-8);
    }
    /* A separator between the side blocks, not above the first one. */
    section + section {
      padding-top: var(--dn-space-8);
      border-top: 1px solid var(--dn-line);
    }
    h2 {
      margin: 0 0 var(--dn-space-2);
      color: var(--dn-ink-muted);
    }
    p {
      margin: 0 0 var(--dn-space-2);
    }
    .phone {
      font: var(--dn-text-h2);
      font-size: 1.5rem;
    }
    .phone a {
      color: inherit;
      text-decoration: none;
    }
    .phone a:hover {
      color: var(--dn-facade);
    }
  `,
})
export class Reservations {
  protected readonly site = SITE;
  protected readonly phoneHref = PHONE_HREF;
}
