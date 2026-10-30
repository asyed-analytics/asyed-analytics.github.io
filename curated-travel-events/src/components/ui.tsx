import type { ReactNode } from 'react'
import { Link } from 'react-router'

export function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`label ${className}`}>{children}</p>
}

export function ArrowIcon() {
  return (
    <svg className="btn-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
      <path d="M0 5h12.5M8.5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

type ButtonVariant = 'midnight' | 'gold' | 'outline'

export function ButtonLink({
  to,
  variant = 'midnight',
  children,
  className = '',
}: {
  to: string
  variant?: ButtonVariant
  children: ReactNode
  className?: string
}) {
  return (
    <Link to={to} className={`btn btn-${variant} ${className}`}>
      {children}
      <ArrowIcon />
    </Link>
  )
}

export function GoldList({ items, columns = 2, className = '' }: { items: string[]; columns?: 1 | 2; className?: string }) {
  return (
    <ul className={`gold-list ${columns === 2 ? 'gold-list-2' : ''} ${className}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

/** Items separated by thin gold dividers, in small spaced capitals. */
export function DividedRow({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`divided caps ${className}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" className={className}>
      {children}
    </a>
  )
}

export function AbtaBadge({ className = '' }: { className?: string }) {
  return (
    <p className={`inline-flex items-baseline gap-2.5 rounded-[2px] border px-3.5 py-3.5 leading-none ${className}`}>
      <span className="text-[0.8rem] font-medium tracking-[0.1em]">ABTA</span>
      <span className="text-[0.76rem] tracking-[0.04em] opacity-80">P7384</span>
    </p>
  )
}

// Full-size widths of the images in public/images (each also has an 800px "-800" version).
const photoWidths = {
  'travel-hero': 1600,
  'events-hero': 1600,
  honeymoons: 1000,
  milestones: 1600,
  'luxury-holidays': 1300,
  cruises: 1280,
  'premium-travel': 1400,
  'accessible-travel': 1400,
  'bucket-list': 1400,
  'gallery-cappadocia': 1066,
  'gallery-northern-lights': 1066,
  'gallery-desert-camps': 1066,
} as const

export type PhotoName = keyof typeof photoWidths

/** A photo that fills its frame. Lazy-loaded unless `eager` is set. */
export function Photo({
  name,
  alt,
  focus = '50% 50%',
  sizes = '100vw',
  eager = false,
  className = '',
}: {
  name: PhotoName
  alt: string
  focus?: string
  sizes?: string
  eager?: boolean
  className?: string
}) {
  return (
    <img
      src={`/images/${name}.webp`}
      srcSet={`/images/${name}-800.webp 800w, /images/${name}.webp ${photoWidths[name]}w`}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
      style={{ objectPosition: focus }}
    />
  )
}
