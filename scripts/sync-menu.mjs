// Brings the menu from Sobremesa, where the owners edit it, into the site:
// writes src/app/pages/menu/menu.json with every text in every locale, and
// public/photos/menu/<name>-{480,960,1600}.webp for each dish photo (photo
// names change on every upload, so existing files are kept as they are).
//
//   node scripts/sync-menu.mjs              # update the committed copy
//   node scripts/sync-menu.mjs --on-pages   # in a Cloudflare Pages build only
//
// The committed copy is what local builds, tests and CI use. Pages builds
// refresh it first (`prebuild`), and keep it if Sobremesa can't be reached,
// so a deploy never fails because of the menu.
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import { QUALITY, WIDTHS } from './photo-sizes.mjs';

const SOBREMESA = process.env.SOBREMESA_URL ?? 'https://reservas.dondenakiss.es';
const RESTAURANT = 'dondenakiss';
const OUT_JSON = 'src/app/pages/menu/menu.json';
const PHOTO_DIR = 'public/photos/menu';

const onPages = process.argv.includes('--on-pages');
if (onPages && !process.env.CF_PAGES) {
  console.log('sync-menu: not a Cloudflare Pages build, using the committed menu.');
  process.exit(0);
}

const pages = JSON.parse(await readFile('src/app/i18n/pages.json', 'utf8'));
const LOCALES = Object.keys(pages.home);

async function fetchMenu(lang) {
  const res = await fetch(`${SOBREMESA}/api/restaurants/${RESTAURANT}/menu?lang=${lang}`);
  if (!res.ok) throw new Error(`Sobremesa answered ${res.status} for ${lang}`);
  return res.json();
}

/** "Brunch" → "brunch": the tab's key in the URL, e.g. /carta#tapas. */
const slug = (text) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

let byLocale;
try {
  byLocale = Object.fromEntries(
    await Promise.all(LOCALES.map(async (l) => [l, await fetchMenu(l)])),
  );
} catch (error) {
  if (!onPages) throw error;
  console.warn(`sync-menu: ${error.message}; using the committed menu.`);
  process.exit(0);
}

const source = byLocale[LOCALES[0]];
/** The same text in every locale, from each locale's response. */
const localized = (pick) => {
  if (pick(source) == null) return undefined;
  return Object.fromEntries(LOCALES.map((l) => [l, pick(byLocale[l]) ?? pick(source)]));
};
const find = (menu, id) => menu.menus.find((m) => m.id === id);
const findSection = (menu, menuId, id) => find(menu, menuId)?.sections.find((s) => s.id === id);

await mkdir(PHOTO_DIR, { recursive: true });
const photos = new Set();

async function photo(url) {
  if (!url) return undefined;
  const name = url
    .split('/')
    .at(-1)
    .replace(/\.\w+$/, '');
  photos.add(name);
  if (!WIDTHS.every((w) => existsSync(join(PHOTO_DIR, `${name}-${w}.webp`)))) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Photo ${url} answered ${res.status}`);
    const image = Buffer.from(await res.arrayBuffer());
    for (const w of WIDTHS) {
      await sharp(image)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(join(PHOTO_DIR, `${name}-${w}.webp`));
    }
    console.log(`sync-menu: photo ${name}`);
  }
  return `photos/menu/${name}`;
}

const menus = [];
for (const m of source.menus) {
  const sections = [];
  for (const s of m.sections) {
    const items = [];
    for (const i of s.items) {
      const item = (menu) => findSection(menu, m.id, s.id)?.items.find((x) => x.id === i.id);
      items.push({
        id: i.id,
        name: localized((menu) => item(menu)?.name),
        description: localized((menu) => item(menu)?.description),
        price: i.price == null ? null : i.price / 100,
        priceNote: localized((menu) => item(menu)?.priceNote),
        allergens: i.allergens,
        featured: i.featured,
        photo: await photo(i.photo),
      });
    }
    sections.push({
      id: s.id,
      title: localized((menu) => findSection(menu, m.id, s.id)?.title),
      note: localized((menu) => findSection(menu, m.id, s.id)?.note),
      footnote: localized((menu) => findSection(menu, m.id, s.id)?.footnote),
      items,
    });
  }
  menus.push({
    key: slug(m.name),
    name: localized((menu) => find(menu, m.id)?.name),
    note: localized((menu) => find(menu, m.id)?.note),
    sections,
  });
}

await writeFile(OUT_JSON, `${JSON.stringify({ menus }, null, 2)}\n`);
for (const file of await readdir(PHOTO_DIR)) {
  const name = file.replace(/-\d+\.webp$/, '');
  if (!photos.has(name)) await rm(join(PHOTO_DIR, file));
}
const dishes = menus.flatMap((m) => m.sections.flatMap((s) => s.items));
console.log(
  `sync-menu: ${menus.length} menus, ${dishes.length} dishes, ${photos.size} photos, in ${LOCALES.join(', ')}.`,
);
