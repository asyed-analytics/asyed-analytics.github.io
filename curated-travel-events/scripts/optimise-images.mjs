// Converts the photos in curated-photos/ to WebP in public/images/.
// Each photo gets a full version (max 1600px wide) and an 800px version for phones.
// Run with: npm run images
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const sourceDir = path.join(root, 'curated-photos')
const outDir = path.join(root, 'public', 'images')

const photos = {
  '01-home-travel-card-and-travel-page-top.jpg': 'travel-hero',
  '02-home-events-card-and-events-page-top.jpg': 'events-hero',
  '03-honeymoons-STAND-IN-replace-with-real-photo.jpg': 'honeymoons',
  '04-milestone-birthdays-and-anniversaries.jpg': 'milestones',
  '05-luxury-holidays-and-bespoke-escapes.jpg': 'luxury-holidays',
  '06-cruise-holidays.jpg': 'cruises',
  '07-business-and-first-class.jpg': 'premium-travel',
  '08-accessible-travel.jpg': 'accessible-travel',
  '09-excursions-and-bucket-list-main.jpg': 'bucket-list',
  '10-gallery-hot-air-balloons-cappadocia.jpg': 'gallery-cappadocia',
  '11-gallery-northern-lights.jpg': 'gallery-northern-lights',
  '12-gallery-desert-camps.jpg': 'gallery-desert-camps',
}

await mkdir(outDir, { recursive: true })

for (const [file, name] of Object.entries(photos)) {
  const input = path.join(sourceDir, file)
  for (const [suffix, width] of [['', 1600], ['-800', 800]]) {
    const info = await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(outDir, `${name}${suffix}.webp`))
    console.log(`${name}${suffix}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`)
  }
}

// Share image for Open Graph and Twitter cards (JPEG is the most widely supported format).
await sharp(path.join(sourceDir, '01-home-travel-card-and-travel-page-top.jpg'))
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(outDir, 'share-travel-hero.jpg'))
console.log('share-travel-hero.jpg  1200x630')
