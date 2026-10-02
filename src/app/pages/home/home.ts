import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PHONE_HREF, SITE } from '../../config/site';
import { CURRENT_LOCALE, PAGE_SLUGS, PageKey } from '../../i18n/locales';
import { BookingWidget } from '../../layout/booking-widget/booking-widget';
import { HoursSummary } from '../../layout/hours-summary/hours-summary';
import { LeafMotif } from '../../layout/leaf-motif/leaf-motif';
import { PhotoSlot } from '../../layout/photo-slot/photo-slot';
import { FEATURED_DISHES } from '../menu/menu-data';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe, RouterLink, BookingWidget, HoursSummary, LeafMotif, PhotoSlot],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly locale = inject(CURRENT_LOCALE);

  protected readonly site = SITE;
  protected readonly phoneHref = PHONE_HREF;
  protected readonly association = SITE.celiacAssociation;
  protected readonly dishes = FEATURED_DISHES;

  protected readonly menuPath = this.path('menu');
  protected readonly reservationsPath = this.path('reservations');

  private path(page: PageKey): string {
    return `/${PAGE_SLUGS[page][this.locale]}`;
  }
}
