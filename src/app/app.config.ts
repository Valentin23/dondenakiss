import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ROUTES, provideRouter, withInMemoryScrolling } from '@angular/router';
import { buildRoutes } from './app.routes';
import { CURRENT_LOCALE } from './i18n/locales';
import { Seo } from './seo/seo';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter([], withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    { provide: ROUTES, multi: true, useFactory: () => buildRoutes(inject(CURRENT_LOCALE)) },
    provideClientHydration(withEventReplay()),
    provideAppInitializer(() => inject(Seo).init()),
  ],
};
