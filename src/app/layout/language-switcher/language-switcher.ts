import { Component, ElementRef, computed, inject, input, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { PageData } from '../../app.routes';
import { CURRENT_LOCALE, LOCALES, LOCALE_NAMES, PageKey, pagePath } from '../../i18n/locales';

let nextId = 0;

/**
 * Links to the current page in the other locales. Each locale is a separate
 * build, so these are plain links (full page load), not routerLink.
 *
 * `list`: every language inline (mobile nav, footer). `dropdown`: a compact
 * "ES" button that discloses the list (desktop header).
 */
@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
  host: {
    '[class.dropdown]': "variant() === 'dropdown'",
    '(document:click)': 'closeIfOutside($event.target)',
    '(focusout)': 'closeIfOutside($event.relatedTarget)',
    '(keydown.escape)': 'closeMenu(true)',
  },
})
export class LanguageSwitcher {
  private readonly router = inject(Router);
  private readonly locale = inject(CURRENT_LOCALE);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly trigger = viewChild<ElementRef<HTMLButtonElement>>('trigger');

  readonly variant = input<'list' | 'dropdown'>('list');

  protected readonly menuId = `lang-menu-${nextId++}`;
  protected readonly menuOpen = signal(false);
  protected readonly currentLocale = this.locale;

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

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  /** Closes the dropdown; on Esc, focus goes back to the button. */
  protected closeMenu(restoreFocus = false): void {
    if (!this.menuOpen()) {
      return;
    }
    this.menuOpen.set(false);
    if (restoreFocus) {
      this.trigger()?.nativeElement.focus();
    }
  }

  /** Closes on a click outside, or when keyboard focus leaves the switcher. */
  protected closeIfOutside(target: EventTarget | null): void {
    if (!this.host.nativeElement.contains(target as Node | null)) {
      this.closeMenu();
    }
  }
}

function currentPage(route: ActivatedRouteSnapshot): PageKey | undefined {
  while (route.firstChild) {
    route = route.firstChild;
  }
  return (route.data as Partial<PageData>).page;
}
