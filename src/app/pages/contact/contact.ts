import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { dayName, hoursByDay } from '../../config/opening-hours';
import { PHONE_HREF, SITE } from '../../config/site';
import { CURRENT_LOCALE, PAGE_SLUGS } from '../../i18n/locales';
import { PhotoSlot } from '../../layout/photo-slot/photo-slot';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, PhotoSlot],
  host: { class: 'page' },
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly locale = inject(CURRENT_LOCALE);

  protected readonly site = SITE;
  protected readonly phoneHref = PHONE_HREF;
  protected readonly instagramHandle = `@${new URL(SITE.instagramUrl).pathname.replaceAll('/', '')}`;
  protected readonly reservationsPath = `/${PAGE_SLUGS.reservations[this.locale]}`;
  protected readonly week = hoursByDay(SITE.openingHours).map((d) => ({
    ...d,
    name: dayName(d.day, this.locale),
  }));
}
