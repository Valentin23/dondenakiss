import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PHONE_HREF, SITE } from '../../config/site';
import { Consent } from '../../consent/consent';
import { CURRENT_LOCALE, PAGE_SLUGS, PageKey } from '../../i18n/locales';
import { HoursSummary } from '../hours-summary/hours-summary';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, HoursSummary, LanguageSwitcher],
  template: `
    <footer class="site-footer">
      <div class="columns">
        <div class="brand">
          <p class="name">{{ site.name }}</p>
          <p i18n="@@brand.tagline">Brunch & tapas sin gluten</p>
          <address>
            {{ site.address }}<br />
            <a [href]="phoneHref">{{ site.phone }}</a>
          </address>
        </div>

        <div>
          <h2 class="eyebrow" i18n="@@contact.hours">Horario</h2>
          <app-hours-summary showClosed />
        </div>

        <nav aria-label="Legal" i18n-aria-label="@@nav.legalLabel">
          <ul>
            <li>
              <a [href]="site.instagramUrl" rel="noopener" target="_blank">Instagram</a>
            </li>
            @for (link of legalNav; track link.path) {
              <li>
                <a [routerLink]="link.path">{{ link.label }}</a>
              </li>
            }
            <li>
              <button
                type="button"
                class="link-button"
                (click)="consent.reopen()"
                i18n="@@cookies.settings"
              >
                Configurar cookies
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div class="bottom">
        <p>© {{ year }} {{ site.fullName }}</p>
        <app-language-switcher />
      </div>
    </footer>
  `,
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  private readonly locale = inject(CURRENT_LOCALE);

  protected readonly consent = inject(Consent);
  protected readonly site = SITE;
  protected readonly phoneHref = PHONE_HREF;
  protected readonly year = new Date().getFullYear();

  protected readonly legalNav = [
    { label: $localize`:@@nav.legal:Aviso legal`, path: this.path('legal') },
    { label: $localize`:@@nav.privacy:Política de privacidad`, path: this.path('privacy') },
  ];

  private path(page: PageKey): string {
    return `/${PAGE_SLUGS[page][this.locale]}`;
  }
}
