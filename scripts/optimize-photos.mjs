// Converts the restaurant's original photos into web-ready WebP files.
//
//   node scripts/optimize-photos.mjs <source-folder>
//
// For every image in <source-folder> it writes public/photos/<slug>-<width>.webp
// for each width in WIDTHS (never upscaled), applying the EXIF orientation and
// dropping metadata (GPS included). The originals stay out of the repo.
// The `photoLoader` in src/app/config/photo-loader.ts picks the files by width.

import { mkdir, readdir } from 'node:fs/promises';
import { extname, join, parse } from 'node:path';
import sharp from 'sharp';

export const WIDTHS = [480, 960, 1600];
const QUALITY = 78;
const OUT_DIR = 'public/photos';
const INPUT = new Set(['.jpg', '.jpeg', '.png', '.heic', '.heif', '.webp']);

// Typos and duplicates in the original file names.
const RENAMES = {
  hambuerguesa_americana: 'hamburguesa-americana',
  sandwitch_club: 'sandwich-club-2',
};

const source = process.argv[2];
if (!source) {
  console.error('Usage: node scripts/optimize-photos.mjs <source-folder>');
  process.exit(1);
}

// Screenshots with black bars above and below the photo.
const TRIM_BLACK_BARS = new Set(['hambuerguesa_americana']);

const slugify = (name) =>
  (RENAMES[name] ?? name)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

await mkdir(OUT_DIR, { recursive: true });
const files = (await readdir(source)).filter((f) => INPUT.has(extname(f).toLowerCase())).sort();

for (const file of files) {
  const name = parse(file).name;
  const slug = slugify(name);
  let image = sharp(join(source, file)).rotate();
  if (TRIM_BLACK_BARS.has(name)) {
    image = sharp(await image.trim({ background: '#000000', threshold: 20 }).toBuffer());
  }
  const { width, height } = await image.metadata();
  for (const w of WIDTHS) {
    await image
      .clone()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(join(OUT_DIR, `${slug}-${w}.webp`));
  }
  console.log(`${file} (${width}×${height}) → ${slug}-{${WIDTHS.join(',')}}.webp`);
}
console.log(`${files.length} photos written to ${OUT_DIR}/`);
