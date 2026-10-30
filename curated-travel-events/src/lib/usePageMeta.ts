import { useEffect } from 'react'
import { canonicalUrl, type PageMeta } from './pages'

function setAttr(selector: string, attr: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value)
}

/** Keeps the document title, description, canonical URL and social tags in step with the page. */
export function usePageMeta(meta: PageMeta, path: string) {
  useEffect(() => {
    const url = canonicalUrl(path)
    document.title = meta.title
    setAttr('meta[name="description"]', 'content', meta.description)
    setAttr('link[rel="canonical"]', 'href', url)
    setAttr('meta[property="og:title"]', 'content', meta.title)
    setAttr('meta[property="og:description"]', 'content', meta.description)
    setAttr('meta[property="og:url"]', 'content', url)
    setAttr('meta[name="twitter:title"]', 'content', meta.title)
    setAttr('meta[name="twitter:description"]', 'content', meta.description)

    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (meta.noindex) {
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        document.head.appendChild(robots)
      }
      robots.content = 'noindex'
    } else {
      robots?.remove()
    }
  }, [meta, path])
}
