import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { PageData } from '../../app.routes';
import { CURRENT_LOCALE, LOCALES, LOCALE_NAMES, PageKey, pagePath } from '../../i18n/locales';

/**
 * Links to the current page in the other locales. Each locale is a separate
 * build, so these are plain links (full page load), not routerLink.
 */
@Component({
  selector: 'app-language-switcher',
  template: `
    <nav class="langs" aria-label="Idioma" i18n-aria-label="@@langSwitcher.label">
      <ul>
        @for (link of links(); track link.locale) {
          <li>
            <a
              [href]="link.href"
              [attr.hreflang]="link.locale"
              [attr.lang]="link.locale"
              [attr.aria-current]="link.current ? 'true' : null"
              >{{ link.locale.toUpperCase()
              }}<span class="visually-hidden"> {{ link.name }}</span></a
            >
          </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    ul {
      display: flex;
      gap: 0.5rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    a[aria-current] {
      font-weight: 700;
      text-decoration: none;
    }
  `,
})
export class LanguageSwitcher {
  private readonly router = inject(Router);
  private readonly locale = inject(CURRENT_LOCALE);

  private readonly page = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => currentPage(this.router.routerState.snapshot.root)),
    ),
    { initialValue: currentPage(this.router.routerState.snapshot.root) },
  );

  protected readonly links = computed(() =>
    LOCALES.map((locale) => ({
      locale,
      name: LOCALE_NAMES[locale],
      href: pagePath(this.page() ?? 'home', locale),
      current: locale === this.locale,
    })),
  );
}

function currentPage(route: ActivatedRouteSnapshot): PageKey | undefined {
  while (route.firstChild) {
    route = route.firstChild;
  }
  return (route.data as Partial<PageData>).page;
}
