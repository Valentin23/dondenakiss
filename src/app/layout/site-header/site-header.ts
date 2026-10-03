import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { PHONE_HREF, SITE } from '../../config/site';
import { CURRENT_LOCALE, PAGE_SLUGS, PageKey } from '../../i18n/locales';
import { HoursSummary } from '../hours-summary/hours-summary';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { LeafMotif } from '../leaf-motif/leaf-motif';

/**
 * Site header. From 900px: logo, links, "Reservar mesa" and languages. Below
 * that: logo and a hamburger that opens the full-screen nav as a modal
 * <dialog> (focus trap, Esc and focus return come from the browser).
 */
@Component({
  selector: 'app-site-header',
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    HoursSummary,
    LanguageSwitcher,
    LeafMotif,
  ],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  private readonly locale = inject(CURRENT_LOCALE);
  private readonly mobileNav = viewChild<ElementRef<HTMLDialogElement>>('mobileNav');

  protected readonly site = SITE;
  protected readonly phoneHref = PHONE_HREF;
  protected readonly instagramHandle = `@${new URL(SITE.instagramUrl).pathname.replaceAll('/', '')}`;
  protected readonly menuOpen = signal(false);

  protected readonly links = [
    { label: $localize`:@@nav.menu:Carta`, path: this.path('menu') },
    { label: $localize`:@@nav.contact:Contacto`, path: this.path('contact') },
  ];
  protected readonly mobileLinks = [
    { label: $localize`:@@nav.home:Inicio`, path: this.path('home') },
    ...this.links,
  ];
  protected readonly homePath = this.path('home');
  protected readonly reservationsPath = this.path('reservations');

  constructor() {
    // Close the nav after navigating, e.g. with the browser's back button.
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeMenu());
  }

  protected openMenu(): void {
    this.mobileNav()?.nativeElement.showModal();
    this.menuOpen.set(true);
  }

  /** Links call this too: a link to the current page does not trigger a navigation. */
  protected closeMenu(): void {
    // `open` is also undefined while prerendering, where there is no dialog API.
    const dialog = this.mobileNav()?.nativeElement;
    if (dialog?.open) {
      dialog.close();
    }
  }

  private path(page: PageKey): string {
    return `/${PAGE_SLUGS[page][this.locale]}`;
  }
}
