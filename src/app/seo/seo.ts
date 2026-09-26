import { DOCUMENT, Service, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { PageData } from '../app.routes';
import { CURRENT_LOCALE, DEFAULT_LOCALE, LOCALES, SITE_URL, pagePath } from '../i18n/locales';
import { restaurantSchema } from './restaurant-schema';

/**
 * Keeps the <head> in sync with the current page: description, canonical URL,
 * `hreflang` links to the other locales and the schema.org JSON-LD.
 */
@Service()
export class Seo {
  private readonly router = inject(Router);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly locale = inject(CURRENT_LOCALE);

  init(): void {
    this.addStructuredData();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.update(deepestChild(this.router.routerState.snapshot.root)));
  }

  private update(route: ActivatedRouteSnapshot): void {
    const data = route.data as Partial<PageData>;
    this.clearLinks();

    if (!data.page) {
      this.meta.updateTag({ name: 'robots', content: 'noindex' });
      this.meta.removeTag('name="description"');
      return;
    }

    this.meta.removeTag('name="robots"');
    this.meta.updateTag({ name: 'description', content: data.description ?? '' });

    const url = SITE_URL + pagePath(data.page, this.locale);
    this.addLink({ rel: 'canonical', href: url });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:title', content: this.document.title });
    this.meta.updateTag({ property: 'og:description', content: data.description ?? '' });

    for (const locale of LOCALES) {
      this.addLink({
        rel: 'alternate',
        hreflang: locale,
        href: SITE_URL + pagePath(data.page, locale),
      });
    }
    this.addLink({
      rel: 'alternate',
      hreflang: 'x-default',
      href: SITE_URL + pagePath(data.page, DEFAULT_LOCALE),
    });
  }

  private addStructuredData(): void {
    // In the browser it is already in the prerendered HTML: replace it to avoid a duplicate.
    this.document.getElementById('schema-restaurant')?.remove();
    const script = this.document.createElement('script');
    script.id = 'schema-restaurant';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(restaurantSchema(this.locale));
    this.document.head.appendChild(script);
  }

  private addLink(attrs: Record<string, string>): void {
    const link = this.document.createElement('link');
    for (const [name, value] of Object.entries(attrs)) {
      link.setAttribute(name, value);
    }
    link.setAttribute('data-seo', '');
    this.document.head.appendChild(link);
  }

  private clearLinks(): void {
    this.document.head.querySelectorAll('link[data-seo]').forEach((link) => link.remove());
  }
}

function deepestChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
  return route.firstChild ? deepestChild(route.firstChild) : route;
}
