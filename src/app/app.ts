import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SITE } from './config/site';
import { CURRENT_LOCALE, PAGE_SLUGS, PageKey } from './i18n/locales';
import { LanguageSwitcher } from './layout/language-switcher/language-switcher';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LanguageSwitcher],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly locale = inject(CURRENT_LOCALE);

  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();

  protected readonly mainNav = [
    { label: $localize`:@@nav.menu:Carta`, path: this.path('menu') },
    { label: $localize`:@@nav.reservations:Reservas`, path: this.path('reservations') },
    { label: $localize`:@@nav.contact:Contacto`, path: this.path('contact') },
  ];

  protected readonly legalNav = [
    { label: $localize`:@@nav.legal:Aviso legal`, path: this.path('legal') },
    { label: $localize`:@@nav.privacy:Política de privacidad`, path: this.path('privacy') },
  ];

  protected path(page: PageKey): string {
    return `/${PAGE_SLUGS[page][this.locale]}`;
  }
}
