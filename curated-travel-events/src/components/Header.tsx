import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/travel', label: 'Travel' },
  { to: '/events', label: 'Events' },
  { to: '/contact', label: 'Contact' },
]

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3.5" aria-label="Curated Travel & Events, home">
      <span
        className="grid size-11 flex-none place-items-center rounded-full border border-gold text-[0.62rem] font-medium tracking-[0.14em] text-[#dfe3ea]"
        aria-hidden="true"
      >
        <span className="pl-[0.14em]">CTE</span>
      </span>
      <span className="flex flex-col" aria-hidden="true">
        <span className="font-display text-[1.55rem] leading-none text-white">Curated</span>
        <span className="mt-1.5 text-[0.58rem] font-medium leading-none tracking-[0.34em] text-gold-pale">
          TRAVEL &amp; EVENTS
        </span>
      </span>
    </Link>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative inline-block py-1 text-[0.78rem] font-medium uppercase tracking-[0.2em] transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gold ${
      isActive ? 'text-gold-pale after:opacity-100' : 'text-[#c9d0dc] after:opacity-0 hover:text-white'
    }`

  return (
    <header className="on-dark sticky top-0 z-50 border-b border-line-dark bg-midnight">
      <div className="wrap flex h-[var(--header-h)] items-center justify-between">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-[34px]">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-3 flex min-h-11 items-center gap-3 px-3 text-[0.74rem] font-medium uppercase tracking-[0.22em] text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
          <span className="relative block h-2.5 w-5" aria-hidden="true">
            <span className={`absolute left-0 h-px w-5 bg-gold-pale ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 h-px w-5 bg-gold-pale ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`} />
          </span>
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full border-t border-line-dark bg-midnight shadow-[0_24px_40px_-24px_rgba(0,0,0,0.6)] md:hidden"
      >
        <ul className="wrap pb-6 pt-2">
          {navItems.map((item) => (
            <li key={item.to} className="border-b border-line-dark last:border-b-0">
              <NavLink
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex min-h-14 items-center text-[0.82rem] font-medium uppercase tracking-[0.22em] ${
                    isActive ? 'text-gold-pale' : 'text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
