# Donde Nakiss

Website for **Donde Nakiss Brunch & Tapas Sin Gluten**, Alicante ([dondenakiss.es](https://dondenakiss.es)).

Angular 22 with static prerendering (`outputMode: "static"`), in 5 languages with `@angular/localize`.
Deployed on Cloudflare Pages.

## Requirements

Node 24 LTS; the exact version is in `.nvmrc` (Angular 22 requires >= 24.15.0).

## Commands

| Command                | What it does                                                                      |
| ---------------------- | --------------------------------------------------------------------------------- |
| `npm start`            | Dev server in Spanish (http://localhost:4200)                                     |
| `npm run start:en`     | Same, in English (also `fr`, `it`, `pl` with `ng serve --configuration <locale>`) |
| `npm run build`        | Production build of every locale + postbuild                                      |
| `npm test`             | Unit tests (Vitest)                                                               |
| `npm run lint`         | ESLint                                                                            |
| `npm run format`       | Prettier                                                                          |
| `npm run extract-i18n` | Regenerates `src/locale/messages.json` with the source texts                      |

## Languages

| Language         | URL                        |
| ---------------- | -------------------------- |
| Spanish (source) | `dondenakiss.es/carta/`    |
| English          | `dondenakiss.es/en/menu/`  |
| French           | `dondenakiss.es/fr/carte/` |
| Italian          | `dondenakiss.es/it/menu/`  |
| Polish           | `dondenakiss.es/pl/menu/`  |

- **Slugs**: `src/app/i18n/pages.json` is the single source of truth. Routes, the language switcher, the
  `hreflang` tags and `sitemap.xml` are all generated from it.
- **UI texts**: marked with `i18n="@@id"` in templates and `` $localize`:@@id:text` `` in TypeScript.
  Always use an explicit id.
- **Translating**:
  1. `npm run extract-i18n`
  2. Copy the new keys from `messages.json` into `messages.{en,fr,it,pl}.json` and translate them.

  The build fails if a translation is missing (`i18nMissingTranslation: "error"`).

- **Menu**: not in the translation files. It lives in `src/app/pages/menu/menu-data.ts`, with one text per
  language for each dish.

## Workflow

`main` is protected: open a PR from a branch; it can only be merged once the `ci` check (lint, format,
test, build) passes. Cloudflare Pages builds a preview URL for every PR.

## Deploying to Cloudflare Pages

The GitHub repository is connected in _Workers & Pages → Pages_:

| Setting                | Value                             |
| ---------------------- | --------------------------------- |
| Framework preset       | None                              |
| Build command          | `npm run build`                   |
| Build output directory | `dist/dondenakiss/browser`        |
| Environment variable   | `NODE_VERSION` = same as `.nvmrc` |
| Production branch      | `main`                            |

`*.pages.dev` URLs send `X-Robots-Tag: noindex` (see `public/_headers`).

The postbuild step (`scripts/postbuild.mjs`):

- Generates a `404.html` per locale. Pages serves the nearest one, and having a 404.html stops it from
  treating the site as an SPA.
- Generates `sitemap.xml` with the `hreflang` alternates.

Then add `dondenakiss.es` (and `www`) under _Custom domains_.

## Analytics

Cloudflare Web Analytics is enabled from the Pages project (_Metrics → Web Analytics → Enable_).
Cloudflare injects the script automatically, so no code is needed. It does not use cookies.

Link for the Google Business Profile listing:

```
https://dondenakiss.es/?utm_source=google&utm_medium=organic&utm_campaign=gbp
```

## To do

- In `src/app/config/site.ts`: DISH widget URL, and the email on the domain (currently the Gmail address).
- When adding the DISH widget or any other third-party service: update the privacy policy (recipients
  and cookies) and `SITE.legalUpdated`.
- Real menu in `menu-data.ts`.
- `/admin` (SPA): `RenderMode.Client` in `app.routes.server.ts`, `noindex`, `Disallow: /admin` in
  `robots.txt` and `_redirects` with `/admin/* /index.csr.html 200`.
