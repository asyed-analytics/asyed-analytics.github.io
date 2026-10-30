import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { canonicalUrl, notFoundMeta, pageMeta, type PageMeta } from './src/lib/pages'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function applyMeta(html: string, meta: PageMeta, url: string) {
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  let out = html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${description}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${description}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${title}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${description}`)
  if (meta.noindex) {
    out = out.replace('</title>', '</title>\n    <meta name="robots" content="noindex" />')
  }
  return out
}

// Writes dist/<route>/index.html with each page's own title, description and canonical URL,
// so links shared or crawled without JavaScript still show the right details,
// and static hosts can serve every route directly.
function pageHtml(): Plugin {
  let outDir = 'dist'
  return {
    name: 'page-html',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const template = await readFile(path.join(outDir, 'index.html'), 'utf8')
      for (const [route, meta] of Object.entries(pageMeta)) {
        if (route === '/') continue
        const dir = path.join(outDir, route.slice(1))
        await mkdir(dir, { recursive: true })
        await writeFile(path.join(dir, 'index.html'), applyMeta(template, meta, canonicalUrl(route)))
      }
      await writeFile(path.join(outDir, '404.html'), applyMeta(template, notFoundMeta, canonicalUrl('/')))
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), pageHtml()],
})
