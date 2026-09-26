import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../config/site';
import { CURRENT_LOCALE, PAGE_SLUGS } from '../../i18n/locales';

@Component({
  selector: 'app-legal',
  imports: [DatePipe, RouterLink],
  templateUrl: './legal.html',
})
export class Legal {
  protected readonly site = SITE;
  protected readonly privacyPath = `/${PAGE_SLUGS.privacy[inject(CURRENT_LOCALE)]}`;
}
