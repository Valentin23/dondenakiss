# Donde Nakiss design system

Visual and verbal rules for dondenakiss.es. Tokens live in [`tokens.css`](tokens.css); approved mockups live in [`mockups/`](mockups/) (open them directly in a browser). When the code and this document disagree, update one of them in the same PR.

## Brand in one paragraph

Donde Nakiss is a small family restaurant in Alicante (about ten tables) serving brunch in the morning and tapas, rice dishes and burgers the rest of the day, with a gluten-free option for everything. The site should feel like the place: small, green, warm and good-humoured. Never corporate, never a chain.

## Voice (user-facing copy, Spanish source)

The printed menu already has the brand voice; the site copies it: close, humorous, proud of being homemade. Short sentences, informal "tú", playful asides ("con más capas que una telenovela", "para que comas como un señor").

- Do: describe dishes with wit, mention what is homemade ("el secreto de la abuela").
- Don't: empty superlatives, emoji, chain-restaurant language, unnecessary anglicisms.
- **Gluten-free is a headline, not a footnote**: it appears in the hero and on the menu. Keep claims accurate (see `CLAUDE.md`): never "100% sin gluten".
- Do not mention a founding year. The logo says "ESTD 2012", but that is not the opening year of the restaurant.

Approved hero headline: **"Aquí se come como en casa. Y sin gluten, también."**

## Colour

Sources: the printed **menu** (deep olive cover with a leaf illustration, lime paper), the **facade** (green), and the **interior** (green velvet stools, oak ceiling).

| Token                | Hex       | Use                                                      |
| -------------------- | --------- | -------------------------------------------------------- |
| `--dn-surface`       | `#F6F4EA` | Page background                                          |
| `--dn-surface-carta` | `#D8DFAE` | Menu page and "most ordered" section                     |
| `--dn-line`          | `#CFCDB9` | Hairlines on `--dn-surface`                              |
| `--dn-ink`           | `#252B1C` | Primary text                                             |
| `--dn-ink-muted`     | `#5A6147` | Descriptions, secondary text                             |
| `--dn-olive-deep`    | `#272F1D` | Hero, footer, mobile nav, menu tab "on" state            |
| `--dn-olive-leaf`    | `#36402A` | Leaf motif on `--dn-olive-deep` (decorative only)        |
| `--dn-on-deep`       | `#D8DFAE` | Text on `--dn-olive-deep`                                |
| `--dn-facade`        | `#1E7A5A` | Primary CTA ("Reservar mesa"), links                     |
| `--dn-facade-hover`  | `#1F4D3A` | Hover/pressed; also the "Sin gluten" band background     |
| `--dn-on-facade`     | `#F6F4EA` | Text on `--dn-facade` / `--dn-facade-hover`              |
| `--dn-oak`           | `#C8995F` | Eyebrow on dark, "Sin gluten" chip, arrows in mobile nav |

Rules:

- One primary action per screen: **Reservar mesa** in `--dn-facade`.
- `--dn-oak` is an accent on dark surfaces only. Never text on light surfaces.
- Checked contrast (WCAG AA): ink/surface 13.2:1, ink-muted/surface 5.9:1, ink-muted/surface-carta 4.7:1, on-deep/olive-deep 10:1, facade/surface 4.8:1, on-facade/facade-hover 8.7:1, oak/olive-deep 5.4:1. Keep any new pair at 4.5:1 or more (3:1 for text ≥ 24px).
- Colours were sampled from photos of the menu and the facade; replace them if the original menu files turn up.

## Typography

- **Marcellus** (`--dn-font-display`): headings, dish names, prices. Classic and close to the printed menu headings.
- **Poppins** (`--dn-font-sans`): body copy and UI. It is the font of the printed menu.
- Eyebrows (`--dn-text-eyebrow`): uppercase, `letter-spacing: 0.12em`, e.g. `BRUNCH & TAPAS · ALICANTE`.
- The logo has its own lettering: always use the image, never recreate it with a font.
- Menu page: a huge "Menú" watermark in Marcellus (`#C7CF9C` on `--dn-surface-carta`) behind the page title, like the printed menu.

## Logo

Files in `public/brand/` (transparent PNG):

- `logo-dark.png` / `logo-dark-512.png`: ink (`#252B1C`) for light backgrounds.
- `logo-light.png` / `logo-light-512.png`: bone (`#F6F4EA`) for `--dn-olive-deep` and photos.

Keep clear space around it of at least the height of the word "DONDE". Do not recolour it outside these two versions. An SVG version would be better for the header; replace these files when one is available.

## Imagery and motif

- **Food photography is the hero**: top-down or 45°, natural light, wooden table. Few and good beats many.
- **Leaf motif**: the line leaf illustration of the menu cover, drawn in `--dn-olive-leaf` on `--dn-olive-deep`. Only on dark blocks, as background, `aria-hidden`.
- Icons: thin line icons (1.5px stroke) in `--dn-ink` or `--dn-on-deep`. Never filled or coloured.

## Layout

- Desktop mockups are 1440px wide with 80px side padding; mobile mockups are 390px with 16px gutters.
- Section rhythm: 96px vertical padding on desktop, 48px on mobile.
- Radii: `--dn-radius-md` for buttons, cards and photos; `--dn-radius-pill` for chips and the menu tabs.

## Components (as in the mockups)

- **Header**: logo left; nav links + "Reservar mesa" button right. On mobile, logo + hamburger (44×44px) that opens a full-screen nav (`mockups/nav-mobile.html`).
- **Mobile nav**: `--dn-olive-deep` full screen, large Marcellus links with oak arrows, "Reservar mesa" and "Llamar" (tel: link) buttons, then hours, address and Instagram.
- **Buttons**: primary filled `--dn-facade`; secondary outlined in the surrounding text colour. Desktop height 52–56px; **mobile CTAs are 64px tall, full width, 18px text**.
- **"Sin gluten" band**: full-width `--dn-facade-hover` strip with an oak chip, right below the hero.
- **Dish row**: name and price in Marcellus on one line (space-between), description below in `--dn-ink-muted`.
- **Menu section title**: Marcellus with a 2px `--dn-olive-deep` underline that only spans the text.
- **Menu tabs (Brunch / Tapas)**: pill segmented control. On mobile it spans the full width and sticks to the top while scrolling (`mockups/menu-mobile.html`). Use proper `role="tablist"` / `role="tab"` / `aria-selected`.
- **Reservations block**: copy on the left, the DISH widget on the right (stacked on mobile).
- **Footer**: `--dn-olive-deep`. On the menu page, a "¿Te ha entrado hambre?" + "Reservar mesa" row sits above the regular footer (name, tagline, Instagram, legal links).

## Motion

Subtle and quick: fades and 8–16px slides on scroll (`--dn-duration`, `--dn-ease-out`), hover swaps to `--dn-facade-hover`. No heavy parallax. With `prefers-reduced-motion`, no animation (the token already drops to 0ms).

## Mockups

| File                        | Screen                   |
| --------------------------- | ------------------------ |
| `mockups/home-desktop.html` | Home, desktop            |
| `mockups/menu-desktop.html` | Menu, desktop            |
| `mockups/home-mobile.html`  | Home, mobile             |
| `mockups/menu-mobile.html`  | Menu, mobile (tabs work) |
| `mockups/nav-mobile.html`   | Mobile navigation open   |

They are visual references, not code to copy: placeholders in brackets (`[TELÉFONO]`, `[Foto]`) come from `src/app/config/site.ts` and real photos. Some brunch prices are `[€]` because they were not legible in the menu PDF; take them from `menu-data.ts` or ask the owners.

## Open items

- Official SVG logo.
- Real food and interior photos.
- Exact menu colours, if the original files exist.
