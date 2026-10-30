import { Link } from 'react-router'
import { contact } from '../lib/site'
import { AbtaBadge, ExternalLink } from './ui'

const infoLinks = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms & Conditions' },
  { to: '/cookies', label: 'Cookie Policy' },
  { to: '/financial-protection', label: 'Booking & Financial Protection' },
]

const columnHeading = 'mb-5 text-[0.7rem] font-medium uppercase leading-none tracking-[0.24em] text-gold-pale'
const linkClass = 'text-[1.0625rem] leading-[1.5] font-light text-[#d3d8e2] transition-colors hover:text-white'

export function Footer() {
  return (
    <footer className="on-dark bg-midnight text-haze">
      <div className="wrap pb-6 pt-20 md:pt-24">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1.2fr_1fr] md:gap-12">
          <div>
            <p className="text-[0.88rem] font-medium uppercase leading-snug tracking-[0.26em] text-white">
              Curated Travel &amp; Events
            </p>
            <p className="mt-1 text-[0.97rem] font-light text-[#d3d8e2]">
              Luxury Travel | Corporate Events | Bucket-List Experiences
            </p>
            <p className="mt-4 text-[0.8rem] uppercase tracking-[0.2em] text-gold-pale">UK-Based · Booking Worldwide</p>
            <AbtaBadge className="mt-7 border-[#3a4c70] text-white" />
            <p className="mt-4 max-w-[360px] text-[0.875rem] font-light leading-[1.65] text-haze">
              Affiliated with InteleTravel UK (ABTA P7384). InteleTravel are appointed agents with our suppliers that hold
              ATOL.
            </p>
          </div>

          <div>
            <h2 className={`font-sans ${columnHeading}`}>Contact</h2>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${contact.email}`} className={`${linkClass} [overflow-wrap:anywhere]`}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className={linkClass}>
                  {contact.phoneDisplay} (Telephone/WhatsApp)
                </a>
              </li>
              <li>
                <ExternalLink href={contact.instagramHref} className={linkClass}>
                  {contact.instagramHandle}
                </ExternalLink>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={`font-sans ${columnHeading}`}>Information</h2>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line-dark pt-8 text-[0.82rem] font-light leading-[1.65] text-haze-soft md:flex-row md:justify-between md:gap-12">
          <p>© 2026 Curated Travel and Events Ltd</p>
          <p className="md:max-w-[470px]">
            Registered in England and Wales · Company No. 17408331 · Registered office: 128 City Road, London, EC1V 2NX
          </p>
        </div>
      </div>
    </footer>
  )
}
