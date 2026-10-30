import { Link } from 'react-router'
import { ArrowIcon, Label } from '../components/ui'
import { notFoundMeta } from '../lib/pages'
import { usePageMeta } from '../lib/usePageMeta'

const links = [
  { to: '/travel', label: 'Travel', text: 'Luxury holidays, cruises, honeymoons and bucket-list experiences' },
  { to: '/events', label: 'Events', text: 'Conferences, retreats and group hotel accommodation' },
  { to: '/contact', label: 'Contact', text: 'Tell us about your trip or event' },
]

export function NotFound() {
  usePageMeta(notFoundMeta, '/')

  return (
    <section className="on-dark bg-midnight py-24 text-white md:py-32">
      <div className="wrap">
        <Label>Page not found</Label>
        <h1 className="mt-5 max-w-[720px] text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.06]">
          This page has <em className="gold-on-dark">wandered off.</em>
        </h1>
        <p className="mt-6 max-w-[520px] text-[1.05rem] font-light leading-[1.7] text-haze">
          The link may be old or mistyped. These pages will help you find what you were looking for.
        </p>
        <ul className="mt-12 grid gap-px border border-line-dark bg-line-dark md:grid-cols-3">
          {links.map((link) => (
            <li key={link.to} className="bg-midnight">
              <Link to={link.to} className="group flex h-full flex-col p-7 transition-colors hover:bg-midnight-raised">
                <span className="flex items-center justify-between font-display text-[1.75rem]">
                  {link.label}
                  <span className="text-gold-pale">
                    <ArrowIcon />
                  </span>
                </span>
                <span className="mt-2 text-[0.95rem] font-light leading-[1.6] text-haze">{link.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
