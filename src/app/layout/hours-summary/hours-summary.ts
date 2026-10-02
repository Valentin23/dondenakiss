import { Component, booleanAttribute, computed, inject, input } from '@angular/core';
import { dayName, groupDays, hoursByDay } from '../../config/opening-hours';
import { SITE } from '../../config/site';
import { CURRENT_LOCALE } from '../../i18n/locales';

/**
 * Compact opening hours, Monday first, e.g. "Martes–jueves 08:30–16:00".
 * Closed days are listed only with `showClosed`. The full table is on the
 * contact page.
 */
@Component({
  selector: 'app-hours-summary',
  template: `
    <dl>
      @for (group of groups(); track group.days) {
        <dt>{{ group.days }}</dt>
        @if (group.slots) {
          <dd>{{ group.slots }}</dd>
        } @else {
          <dd i18n="@@contact.closed">Cerrado</dd>
        }
      }
    </dl>
  `,
  styles: `
    dl {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 0 var(--dn-space-4);
      margin: 0;
      padding: 0;
    }
    dd {
      margin: 0;
    }
    dt::first-letter {
      text-transform: uppercase;
    }
  `,
})
export class HoursSummary {
  private readonly locale = inject(CURRENT_LOCALE);

  readonly showClosed = input(false, { transform: booleanAttribute });

  private readonly allGroups = groupDays(hoursByDay(SITE.openingHours)).map((group) => ({
    days:
      group.from === group.to
        ? dayName(group.from, this.locale)
        : `${dayName(group.from, this.locale)}–${dayName(group.to, this.locale)}`,
    slots: group.slots.map((slot) => `${slot.opens}–${slot.closes}`).join(' · '),
  }));

  protected readonly groups = computed(() =>
    this.showClosed() ? this.allGroups : this.allGroups.filter((group) => group.slots),
  );
}
