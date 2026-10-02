import { CurrencyPipe, Location } from '@angular/common';
import { Component, ElementRef, inject, linkedSignal, viewChildren } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CURRENT_LOCALE, PAGE_SLUGS } from '../../i18n/locales';
import { PhotoSlot } from '../../layout/photo-slot/photo-slot';
import { MENUS, MenuKey } from './menu-data';

const KEYS: MenuKey[] = ['brunch', 'tapas'];

/**
 * The menu, in two tabs: Brunch and Tapas (rest of the day, desserts
 * included). Both panels are prerendered; `/carta#tapas` opens the Tapas tab.
 */
@Component({
  selector: 'app-menu',
  imports: [CurrencyPipe, RouterLink, PhotoSlot],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  private readonly location = inject(Location);
  private readonly tabs = viewChildren<ElementRef<HTMLButtonElement>>('tab');
  private readonly fragment = toSignal(inject(ActivatedRoute).fragment);

  protected readonly locale = inject(CURRENT_LOCALE);
  protected readonly menus = MENUS;
  protected readonly keys = KEYS;
  protected readonly reservationsPath = `/${PAGE_SLUGS.reservations[this.locale]}`;
  protected readonly tabLabels: Record<MenuKey, string> = {
    brunch: $localize`:@@menu.tabBrunch:Brunch`,
    tapas: $localize`:@@menu.tabTapas:Tapas`,
  };

  protected readonly active = linkedSignal<MenuKey>(() =>
    this.fragment() === 'tapas' ? 'tapas' : 'brunch',
  );

  protected select(key: MenuKey): void {
    this.active.set(key);
    // Keep the tab in the URL (shareable) without a router navigation, which
    // would scroll back to the top.
    this.location.replaceState(`${this.location.path()}#${key}`);
  }

  /** Arrow keys, Home and End move between tabs (WAI-ARIA tabs pattern). */
  protected onTabKeydown(event: KeyboardEvent, index: number): void {
    const last = KEYS.length - 1;
    const next =
      event.key === 'ArrowRight'
        ? (index + 1) % KEYS.length
        : event.key === 'ArrowLeft'
          ? (index + last) % KEYS.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : -1;
    if (next < 0) {
      return;
    }
    event.preventDefault();
    this.select(KEYS[next]);
    this.tabs()[next].nativeElement.focus();
  }
}
