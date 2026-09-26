# DondeNakiss

Web del restaurante DondeNakiss ([dondenakiss.es](https://dondenakiss.es)).

Angular 22 con prerender estático (`outputMode: "static"`), en 5 idiomas con `@angular/localize`.
Se publica en Cloudflare Pages.

## Requisitos

Node 24 LTS (ver `.nvmrc`).

## Comandos

| Comando                | Qué hace                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `npm start`            | Servidor de desarrollo en español (http://localhost:4200)                           |
| `npm run start:en`     | Igual, en inglés (también `fr`, `it`, `pl` con `ng serve --configuration <idioma>`) |
| `npm run build`        | Build de producción de todos los idiomas + postbuild                                |
| `npm test`             | Tests unitarios (Vitest)                                                            |
| `npm run lint`         | ESLint                                                                              |
| `npm run format`       | Prettier                                                                            |
| `npm run extract-i18n` | Regenera `src/locale/messages.json` con los textos fuente                           |

## Idiomas

| Idioma           | URL                        |
| ---------------- | -------------------------- |
| Español (fuente) | `dondenakiss.es/carta/`    |
| Inglés           | `dondenakiss.es/en/menu/`  |
| Francés          | `dondenakiss.es/fr/carte/` |
| Italiano         | `dondenakiss.es/it/menu/`  |
| Polaco           | `dondenakiss.es/pl/menu/`  |

- **Slugs**: `src/app/i18n/pages.json`. Es la única fuente de verdad, y de ahí salen las rutas, el selector de
  idioma, las etiquetas `hreflang` y el `sitemap.xml`.
- **Textos de la interfaz**: se marcan con `i18n="@@id"` en las plantillas y con `` $localize`:@@id:texto` `` en TypeScript.
  Usa siempre un id explícito.
- **Traducir**:
  1. `npm run extract-i18n`
  2. Copia las claves nuevas de `messages.json` a `messages.{en,fr,it,pl}.json` y tradúcelas.

  El build falla si falta alguna traducción (`i18nMissingTranslation: "error"`).

- **Carta**: no va en los ficheros de traducción. Está en `src/app/pages/menu/menu-data.ts`, con un
  texto por idioma en cada plato.

## Despliegue en Cloudflare Pages

Conecta el repositorio de GitHub en _Workers & Pages → Create → Pages → Connect to Git_:

| Ajuste                 | Valor                      |
| ---------------------- | -------------------------- |
| Framework preset       | None                       |
| Build command          | `npm run build`            |
| Build output directory | `dist/dondenakiss/browser` |
| Variable de entorno    | `NODE_VERSION` = `24`      |
| Production branch      | `main`                     |

Cada PR genera una URL de preview. Las URLs `*.pages.dev` llevan `X-Robots-Tag: noindex` (ver `public/_headers`).

El postbuild (`scripts/postbuild.mjs`) hace lo siguiente:

- Genera un `404.html` por idioma. Pages sirve el más cercano, y al existir un 404.html deja de tratar
  el sitio como SPA.
- Genera `sitemap.xml` con las alternativas `hreflang`.

Después, añade el dominio `dondenakiss.es` (y `www`) en _Custom domains_.

## Analítica

Cloudflare Web Analytics se activa desde el proyecto de Pages (_Metrics → Web Analytics → Enable_).
Cloudflare inyecta el script automáticamente, así que no hace falta código. No usa cookies.

Enlace para la ficha de Google Business Profile:

```
https://dondenakiss.es/?utm_source=google&utm_medium=organic&utm_campaign=gbp
```

## Pendiente

- Datos reales en `src/app/config/site.ts` (teléfono, dirección, Google Maps, URL del widget de DISH).
- Textos del aviso legal y de la política de privacidad.
- Carta en `menu-data.ts`.
- `/admin` (SPA): `RenderMode.Client` en `app.routes.server.ts`, `noindex`, `Disallow: /admin` en
  `robots.txt` y `_redirects` con `/admin/* /index.csr.html 200`.
