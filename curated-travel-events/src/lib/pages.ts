// Page titles and descriptions. Used by the app at runtime (usePageMeta)
// and by the build, which writes a pre-filled HTML file for every route.

export const SITE_URL = 'https://curatedtravelandevents.co.uk'

export type PageMeta = {
  title: string
  description: string
  noindex?: boolean
}

export const pageMeta = {
  '/': {
    title: 'Curated Travel & Events | Luxury Travel & Corporate Events',
    description:
      'Luxury holidays, cruises, honeymoons and bucket-list experiences, plus conference and group hotel accommodation. UK-based, booking worldwide.',
  },
  '/travel': {
    title: 'Luxury Holidays & Cruises | Curated Travel & Events',
    description:
      'Tailor-made luxury holidays, cruises, honeymoons, milestone celebrations, Business Class, accessible travel and bucket-list experiences.',
  },
  '/events': {
    title: 'Conference & Group Hotel Booking | Curated Travel & Events',
    description:
      'Hotel sourcing and group accommodation for conferences, retreats and medical, dental and pharmaceutical events, from 10 rooms to several hundred.',
  },
  '/contact': {
    title: 'Contact Us | Curated Travel & Events',
    description:
      "Tell us about your trip or event. Email, call or WhatsApp our UK team, or send a short enquiry and we'll reply with tailored options.",
  },
  '/privacy': {
    title: 'Privacy Policy | Curated Travel & Events',
    description:
      'How Curated Travel & Events collects, uses and protects your personal information, and your rights.',
  },
  '/terms': {
    title: 'Terms & Conditions | Curated Travel & Events',
    description: 'The terms of use for our website, and how booking terms apply when you book with Curated Travel & Events.',
  },
  '/cookies': {
    title: 'Cookie Policy | Curated Travel & Events',
    description: 'Our website uses no advertising or analytics cookies, only storage that is strictly necessary for it to work.',
  },
  '/financial-protection': {
    title: 'Booking & Financial Protection | Curated Travel & Events',
    description:
      'Our ABTA membership through InteleTravel UK (P7384) and how ATOL applies to bookings made through us.',
  },
} satisfies Record<string, PageMeta>

export type PagePath = keyof typeof pageMeta

export const notFoundMeta: PageMeta = {
  title: 'Page Not Found | Curated Travel & Events',
  description: 'This page could not be found. Explore our travel and events services, or get in touch.',
  noindex: true,
}

export const canonicalUrl = (path: string) => `${SITE_URL}${path === '/' ? '/' : path}`
