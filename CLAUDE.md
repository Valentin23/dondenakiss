# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Web del restaurante DondeNakiss (dondenakiss.es). Angular 22, prerender 100 % estático, 5 idiomas, hospedada en Cloudflare Pages. El README tiene los detalles de despliegue y del flujo de traducción.

## Comandos

- `npm start`: dev server en español. Para otro idioma: `npm run start:en` o `ng serve --configuration fr|it|pl`.
- `npm run build`: build de producción de los 5 idiomas + `postbuild` (`scripts/postbuild.mjs`). Salida: `dist/dondenakiss/browser`.
- `npm test`: Vitest vía `ng test`, sin watch.
  - Un fichero: `npx ng test --watch=false --include src/app/i18n/locales.spec.ts`
  - Por nombre: `npx ng test --watch=false --filter "buildRoutes"`
- `npm run lint`, `npm run format` / `npm run format:check`.
- `npm run extract-i18n`: regenera `src/locale/messages.json` (textos fuente en español).

El CI (`.github/workflows/ci.yml`) ejecuta lint, format:check, test y build. Hay que dejar los cuatro en verde.

Node: la versión exacta está en `.nvmrc` (Angular 22 exige ≥ 24.15.0). En Cloudflare Pages la variable `NODE_VERSION` debe coincidir con `.nvmrc`, porque tiene prioridad sobre el fichero.

## Arquitectura

**Build estático, sin servidor.** `outputMode: "static"` con `@angular/ssr`. Todas las rutas se prerenderizan en el build (`app.routes.server.ts`: `**` → `RenderMode.Prerender`). No hay `server.ts` ni Express. Nada puede depender de datos de la petición en tiempo de ejecución, y valores como `new Date()` se congelan en la fecha del build.

**i18n en tiempo de build (`@angular/localize`).** Hay un bundle por idioma (`angular.json` → `i18n`):

- `es` es el idioma fuente y va en la raíz (`subPath: ""`). `en`, `fr`, `it`, `pl` van en `/<locale>/`, cada uno con su propio `<base href>`.
- `i18nMissingTranslation: "error"`: si falta una clave en cualquier `src/locale/messages.<locale>.json`, el build falla.
- Todo texto visible lleva un id explícito: `i18n="@@area.clave"` en plantillas y `` $localize`:@@area.clave:texto` `` en TS. Tras añadir o cambiar textos: `npm run extract-i18n` y copiar las claves nuevas a los 4 ficheros de traducción.
- En `ng serve` sin configuración de idioma, `LOCALE_ID` es `en-US`. Por eso se usa el token `CURRENT_LOCALE` (`src/app/i18n/locales.ts`), que lo normaliza a `es`. Usa siempre `CURRENT_LOCALE`, no `LOCALE_ID`.

**Slugs traducidos: una sola fuente de verdad.** `src/app/i18n/pages.json` mapea cada `PageKey` a su slug en cada idioma. De ahí salen:

- las rutas: `buildRoutes(locale)` en `app.routes.ts`, que se registra con un provider `ROUTES` con factory en `app.config.ts` (por eso `provideRouter([])` va vacío);
- los enlaces del menú: `/${PAGE_SLUGS[page][locale]}`, relativos al `<base href>` del idioma;
- el selector de idioma y las etiquetas `hreflang`/canonical: `pagePath()`;
- el `sitemap.xml` (lo genera `postbuild.mjs`, que lee el mismo JSON).

Añadir una página implica: una entrada en `pages.json` (los 5 idiomas), una ruta en `buildRoutes()` con `data: { page, description }` y los textos traducidos. El test `app.routes.spec.ts` comprueba que rutas y slugs coinciden.

**Enlaces entre idiomas.** Cada idioma es otra app, así que se usan `<a href>` normales (`LanguageSwitcher`), nunca `routerLink`.

**SEO.** El servicio `src/app/seo/seo.ts` se arranca con `provideAppInitializer`. En cada `NavigationEnd` escribe la descripción, la canonical, `og:*` y los `hreflang` a partir de `route.data`. Las rutas sin `data.page` (404) llevan `noindex`. Las URLs canónicas terminan en `/`, porque Pages sirve `carta/index.html` en `/carta/`.

**Postbuild para Cloudflare Pages** (`scripts/postbuild.mjs`):

- mueve `404/index.html` → `404.html` en cada idioma (Pages sirve el `404.html` más cercano; sin él trataría el sitio como SPA);
- genera `sitemap.xml`;
- borra `_headers`, `_redirects` y `robots.txt` de las subcarpetas de idioma, porque Angular copia `public/` en cada una y Pages solo los lee en la raíz.

`public/_headers` pone `noindex` en `*.pages.dev`.

**Contenido.**

- Los datos del negocio (teléfono, dirección, URL del widget de DISH Reservation) están en `src/app/config/site.ts`.
- La carta está en `src/app/pages/menu/menu-data.ts`, como datos con un texto por idioma (`Localized`), no en los ficheros de traducción. Así podrá editarse desde el futuro `/admin`.

**Futuro `/admin`** (aún no existe): SPA con `RenderMode.Client` en `app.routes.server.ts`, lazy loading, `noindex`, `Disallow: /admin` en `robots.txt` y `_redirects` con `/admin/* /index.csr.html 200`.

## Angular / TypeScript conventions

### TypeScript

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

### Angular

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

### Accessibility

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

#### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `model()` for two-way bound properties with `[(prop)]` syntax instead of pairing `input()` with `output()`
- Use `computed()` for derived state
- Use `linkedSignal()` for state derived from multiple reactive sources that must stay synchronized
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- Do NOT import `CommonModule`, import only the directives and pipes the template uses, such as `AsyncPipe` or `DatePipe`
- When using external templates/styles, use paths relative to the component TS file.

### State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

### Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume browser globals are available: every route is prerendered in Node at build time.

### Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection
