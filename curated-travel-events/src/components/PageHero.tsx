import type { ReactNode } from 'react'
import { Label, Photo, type PhotoName } from './ui'

/** Full-width photo hero with a midnight gradient: from the left on desktop, from the bottom on mobile. */
export function PageHero({
  label,
  photo,
  overlay,
  children,
}: {
  label: string
  photo: { name: PhotoName; alt: string; focus: string }
  overlay: string
  children: ReactNode
}) {
  return (
    <section className="on-dark relative isolate flex min-h-[clamp(440px,50vw,620px)] items-end overflow-hidden bg-midnight text-white">
      <Photo {...photo} eager className="absolute inset-0 -z-10" />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(11,26,51,0.96)_0%,rgba(11,26,51,0.78)_45%,rgba(11,26,51,0.25)_100%)] md:hidden"
        aria-hidden="true"
      />
      <div className={`absolute inset-0 -z-10 hidden md:block ${overlay}`} aria-hidden="true" />
      <div className="wrap pb-14 pt-40 md:pb-[88px] md:pt-32">
        <Label>{label}</Label>
        {children}
      </div>
    </section>
  )
}

export function Intro({ lead, children }: { lead: string; children: ReactNode }) {
  return (
    <section className="py-20 md:py-[100px]">
      <div className="wrap">
        <div className="max-w-[680px]">
          <p className="text-[1.2rem] font-light leading-[1.6] text-ink md:text-[1.3125rem]">{lead}</p>
          <p className="mt-5 text-[1.0625rem] leading-[1.65] text-muted">{children}</p>
        </div>
      </div>
    </section>
  )
}
