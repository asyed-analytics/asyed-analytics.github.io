import { useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'

/**
 * Scrolls to the top on every page change (or when a link to the current page is followed again),
 * or to the section named in the URL hash. A change to the query string alone keeps the scroll position.
 */
function useScrollOnNavigate(main: React.RefObject<HTMLElement | null>) {
  const { pathname, search, hash, key } = useLocation()
  const previous = useRef({ pathname, search })

  useLayoutEffect(() => {
    const pathChanged = previous.current.pathname !== pathname
    const searchChanged = previous.current.search !== search
    previous.current = { pathname, search }

    // Move focus to the new page so screen readers start from its content.
    if (pathChanged) main.current?.focus({ preventScroll: true })

    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)))
    if (target) {
      // scroll-margin-top on [id] leaves room for the sticky header.
      target.scrollIntoView({ block: 'start' })
    } else if (pathChanged || !searchChanged) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, search, hash, key, main])
}

export function Layout() {
  const { pathname } = useLocation()
  const main = useRef<HTMLElement>(null)
  useScrollOnNavigate(main)

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-gold-pale px-4 py-3 text-sm font-medium text-midnight focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main" ref={main} tabIndex={-1} key={pathname} className="page-fade outline-none">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
