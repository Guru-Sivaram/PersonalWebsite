/**
 * Resize and compress hobby images: max width 1200px, JPEG quality 82%.
 * Run: node scripts/optimize-hobby-images.mjs
 */
import sharp from 'sharp'
import { rename } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')
const MAX_WIDTH = 1200
const JPEG_QUALITY = 82

const IMAGE_PATHS = [
  '1832.jpg', '1833.jpg', '1834.jpg', '1835.jpg', '1836.jpg', '1837.jpg',
  'paint/1486.jpg', 'paint/1488.jpg', 'paint/1792.jpg', 'paint/1794.jpg', 'paint/1795.jpg',
  '3dprinting/1838.jpg', '3dprinting/1839.jpg',
  'botany/1840.jpg', 'botany/1841.jpg',
]

async function optimize(path) {
  const inputPath = join(PUBLIC, path)
  try {
    const info = await sharp(inputPath)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toFile(inputPath + '.tmp')
    await rename(inputPath + '.tmp', inputPath)
    return { path, size: info.size }
  } catch (err) {
    console.error(path, err.message)
    return { path, error: err.message }
  }
}

const results = await Promise.all(IMAGE_PATHS.map(optimize))
const ok = results.filter(r => !r.error)
const failed = results.filter(r => r.error)
console.log('Optimized:', ok.length)
ok.forEach(r => console.log('  ', r.path, (r.size / 1024).toFixed(1) + ' KB'))
if (failed.length) console.log('Failed:', failed.map(r => r.path))