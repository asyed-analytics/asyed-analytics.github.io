import { Intro, PageHero } from '../components/PageHero'
import { ButtonLink, GoldList, Label, Photo, type PhotoName } from '../components/ui'
import { pageMeta } from '../lib/pages'
import { enquiryLink } from '../lib/site'
import { usePageMeta } from '../lib/usePageMeta'

type TravelSection = {
  id: string
  title: string
  subtitle?: string
  text: string
  listLabel: string
  items: string[]
  after?: { text: string; muted?: boolean }
  note?: string
  button: string
  interest: string
  photo: { name: PhotoName; alt: string; focus: string }
}

const sections: TravelSection[] = [
  {
    id: 'holidays',
    title: 'Luxury Holidays & Bespoke Escapes',
    text: 'From secluded island retreats to vibrant city destinations, we curate holidays designed around your needs.',
    listLabel: 'Our services include',
    items: [
      'Five-star hotels and luxury resorts',
      'Private villas and exclusive retreats',
      'Luxury beach holidays',
      'City breaks and cultural escapes',
      'Family holidays',
      'Luxury cruises',
      'Multi-destination itineraries',
      'Private transfers',
      'Tailor-made travel experiences',
    ],
    button: 'Plan my luxury escape',
    interest: 'Luxury holidays & bespoke escapes',
    photo: {
      name: 'luxury-holidays',
      alt: 'Seaplane moored off a palm-fringed island resort with white sand and turquoise water',
      focus: '50% 55%',
    },
  },
  {
    id: 'cruises',
    title: 'Cruise Holidays',
    subtitle: 'Unpack Once. Wake Up Somewhere New.',
    text: 'From grand ocean ships to intimate river cruises and small luxury vessels, a cruise lets you see more of the world without ever changing hotels. We match you with the right cruise line, ship and cabin for the way you like to travel, then arrange everything around it.',
    listLabel: 'We can arrange',
    items: [
      'Ocean cruises in the Mediterranean, Caribbean and beyond',
      'River cruises on the Danube, Rhine and Nile',
      'Expedition cruises to Antarctica, the Galápagos and the Norwegian fjords',
      'Luxury small-ship and yacht-style cruises',
      'Suites and balcony cabins, including accessible cabins',
      'Fly-cruise packages with flights and transfers',
      'Hotel stays before and after your cruise',
      'Shore excursions and private tours ashore',
      'Honeymoon and celebration cruises',
    ],
    button: 'Plan my cruise',
    interest: 'Cruise holidays',
    photo: { name: 'cruises', alt: 'Cruise ship moored at a long pier off a tropical island', focus: '55% 45%' },
  },
  {
    id: 'honeymoons',
    title: 'Honeymoons & Romantic Getaways',
    subtitle: 'Celebrate the beginning of your next chapter with a beautifully planned escape.',
    text: 'We help arrange romantic destinations, exceptional accommodation and thoughtful experiences to make your honeymoon or romantic getaway memorable.',
    listLabel: 'Our services include',
    items: [
      'Luxury honeymoon resorts',
      'Overwater villas and private pool suites',
      'Romantic island escapes',
      'Multi-destination honeymoons',
      'Private dining experiences',
      "Couples' spa experiences",
      'Hotel celebration arrangements',
    ],
    button: 'Plan my honeymoon',
    interest: 'Honeymoons & romantic getaways',
    photo: { name: 'honeymoons', alt: 'Aerial view of a heart-shaped island in a turquoise lagoon', focus: '50% 42%' },
  },
  {
    id: 'milestones',
    title: 'Milestone Birthdays & Anniversaries',
    subtitle: "Celebrate Life's Special Moments.",
    text: 'Some occasions deserve more than an ordinary holiday. From milestone birthdays and anniversaries to special family celebrations, we help create experiences that bring people together and leave lasting memories.',
    listLabel: 'We can help arrange',
    items: [
      'Milestone birthday celebrations',
      'Anniversary holidays',
      'Luxury group celebrations',
      "Family and friends' getaways",
      'Private villas and exclusive resort stays',
      'Yacht and sunset cruise experiences',
      'Special dining arrangements',
      'Spa and wellness escapes',
      'Personalised celebration requests',
    ],
    after: {
      text: 'Whether it is an intimate escape for two or a memorable celebration with family and friends, we help bring the occasion to life.',
    },
    button: 'Plan my celebration',
    interest: 'Milestone birthdays & anniversaries',
    photo: {
      name: 'milestones',
      alt: 'Sparklers being lit on a celebration cake beside a vase of yellow tulips',
      focus: '62% 55%',
    },
  },
  {
    id: 'premium',
    title: 'Business Class & First Class Travel',
    subtitle: 'Travel in Comfort. Arrive in Style.',
    text: 'We arrange premium air travel as part of personalised luxury journeys and corporate travel requirements.',
    listLabel: 'Our services include',
    items: [
      'Business Class tickets',
      'First Class tickets',
      'Premium long-haul travel',
      'Multi-city premium itineraries',
      'Luxury hotel and flight combinations',
      'Private airport transfers',
      'Premium corporate travel arrangements',
    ],
    after: {
      text: 'We focus on complete premium travel experiences rather than competing with airlines and comparison websites on standard flight-only prices. Our emphasis is on convenience, comfort and personalised arrangements.',
      muted: true,
    },
    button: 'Arrange my premium journey',
    interest: 'Business Class & First Class travel',
    photo: { name: 'premium-travel', alt: 'Cream leather seats in a private jet cabin', focus: '50% 50%' },
  },
  {
    id: 'accessible',
    title: 'Accessible Travel',
    subtitle: 'Travel Without Barriers.',
    text: 'Everyone deserves to travel with confidence. We take the time to understand your needs, then plan every step around them, from airport assistance to step-free rooms and adapted transfers, confirming the details with each supplier before you book.',
    listLabel: 'We can help arrange',
    items: [
      'Accessible hotel rooms with step-free access and roll-in showers',
      'Airport special assistance, requested with your airline',
      'Wheelchair-accessible transfers and private drivers',
      'Mobility equipment hire at your destination',
      'Accessible cruise cabins and shore excursions',
      'Travelling with a carer or companion',
      'Dietary and medical requirements passed to suppliers',
      'Support for hidden disabilities and sensory needs',
      'Relaxed, slower-paced itineraries',
    ],
    note: 'Accessibility features are provided by hotels, airlines and other suppliers and depend on availability. We share health details only with your consent, and confirm arrangements in writing before you book.',
    button: 'Plan my accessible trip',
    interest: 'Accessible travel',
    photo: {
      name: 'accessible-travel',
      alt: 'Beach wheelchairs with wide balloon tyres beneath a straw parasol on a boardwalk by the sea',
      focus: '50% 50%',
    },
  },
  {
    id: 'bucket-list',
    title: 'Excursions & Bucket-List Experiences',
    subtitle: 'Go Beyond the Ordinary.',
    text: 'Travel is about more than the destination. It is about the experiences, discoveries and memories that stay with you long after you return. From extraordinary adventures to exclusive private experiences, we help transform travel aspirations into unforgettable journeys.',
    listLabel: 'Experiences we can help arrange',
    items: [
      'African safaris and luxury wilderness lodges',
      'Northern Lights and Arctic adventures',
      'Hot-air balloon experiences in Cappadocia',
      'Private yacht charters and island hopping',
      'Helicopter tours and scenic flights',
      'Luxury desert camps and stargazing',
      'Snorkelling, diving and marine wildlife experiences',
      'Cultural and heritage tours',
      'UNESCO World Heritage experiences',
      'Private guided excursions',
      'Wellness retreats and luxury spa experiences',
      'Skiing and winter adventures',
      'Scenic train journeys',
      'Special occasion and celebration experiences',
    ],
    note: 'All experiences are subject to destination, supplier availability and suitability.',
    button: 'Plan my bucket-list experience',
    interest: 'Excursions & bucket-list experiences',
    photo: { name: 'bucket-list', alt: 'Hot-air balloon drifting above zebras on the African savannah', focus: '38% 60%' },
  },
]

const gallery: { name: PhotoName; alt: string; caption: string }[] = [
  {
    name: 'gallery-cappadocia',
    alt: 'Hot-air balloons rising over the rock formations of Cappadocia at sunrise',
    caption: 'Hot-air balloons, Cappadocia',
  },
  {
    name: 'gallery-northern-lights',
    alt: 'Northern Lights above snow-capped mountains and a lit fishing village',
    caption: 'Northern Lights & Arctic adventures',
  },
  { name: 'gallery-desert-camps', alt: 'The Milky Way over desert dunes at night', caption: 'Desert camps & stargazing' },
]

function Gallery() {
  return (
    <div
      role="region"
      aria-label="Bucket-list experiences"
      tabIndex={0}
      className="-mx-[var(--gutter)] mt-12 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
    >
      {gallery.map((item) => (
        <figure key={item.name} className="w-[78%] flex-none snap-start md:w-auto">
          <div className="aspect-[4/5] overflow-hidden bg-mist">
            <Photo name={item.name} alt={item.alt} sizes="(min-width: 768px) 33vw, 78vw" />
          </div>
          <figcaption className="mt-4 flex items-center gap-2.5 text-[0.68rem] font-medium uppercase leading-snug tracking-[0.23em] text-ink before:h-px before:w-3 before:flex-none before:bg-gold">
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

function SectionRow({ section, photoRight }: { section: TravelSection; photoRight: boolean }) {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-12 lg:gap-20">
      <div className={`aspect-[3/2] overflow-hidden bg-mist md:aspect-[4/5] ${photoRight ? 'md:order-2' : ''}`}>
        <Photo {...section.photo} sizes="(min-width: 768px) 50vw, 100vw" />
      </div>
      <div>
        <h2 id={`${section.id}-heading`} className="text-[clamp(2rem,3.4vw,2.72rem)] leading-[1.06]">
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="mt-3 font-display text-[1.3rem] italic leading-[1.35]">
            <span className="gold-on-light">{section.subtitle}</span>
          </p>
        )}
        <p className="mt-5 text-[1.0625rem] leading-[1.65] text-muted">{section.text}</p>
        <h3 className="caps mt-8 font-sans text-[0.72rem] text-ink">{section.listLabel}</h3>
        <GoldList items={section.items} className="mt-2" />
        {section.after && (
          <p className={`mt-6 text-[1.0625rem] leading-[1.65] ${section.after.muted ? 'text-muted' : 'text-ink'}`}>
            {section.after.text}
          </p>
        )}
        {section.note && <p className="mt-6 text-[0.88rem] italic leading-[1.65] text-muted">{section.note}</p>}
        <ButtonLink to={enquiryLink('Travel', section.interest)} className="mt-9">
          {section.button}
        </ButtonLink>
      </div>
    </div>
  )
}

export function Travel() {
  usePageMeta(pageMeta['/travel'], '/travel')

  return (
    <>
      <PageHero
        label="Travel"
        photo={{
          name: 'travel-hero',
          alt: 'Wooden rowing boats on a turquoise alpine lake beneath forested mountains',
          focus: '50% 62%',
        }}
        overlay="bg-[linear-gradient(90deg,rgba(11,26,51,0.94)_0%,rgba(11,26,51,0.8)_32%,rgba(11,26,51,0.25)_68%,rgba(11,26,51,0.05)_100%)]"
      >
        <h1 className="mt-5 max-w-[720px] text-[clamp(2.6rem,6vw,4.35rem)] leading-[1.08]">
          Luxury Travel,
          <br />
          <em className="gold-on-dark">Beautifully Curated.</em>
        </h1>
        <p className="mt-6 max-w-[520px] text-[1.05rem] font-light leading-[1.7] text-[#dde2ea]">
          Discover exceptional destinations, carefully selected accommodation and extraordinary experiences, thoughtfully
          arranged around you.
        </p>
      </PageHero>

      <Intro lead="Whether you are planning a dream holiday, celebrating a special occasion or embarking on a once-in-a-lifetime adventure, we create journeys that reflect your individual preferences and travel style.">
        Our aim is to make travel seamless through personalised service, carefully selected options and attention to
        detail.
      </Intro>

      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-heading`}
          className={`${index === 0 ? '' : 'pt-14 md:pt-20'} ${index === sections.length - 1 ? 'pb-24 md:pb-32' : 'pb-14 md:pb-20'}`}
        >
          <div className="wrap">
            <SectionRow section={section} photoRight={index % 2 === 1} />
            {section.id === 'bucket-list' && <Gallery />}
          </div>
        </section>
      ))}

      <section className="on-dark bg-midnight py-24 text-center text-white md:py-[120px]">
        <div className="wrap">
          <Label className="justify-center">Our approach</Label>
          <h2 className="mt-5 text-[clamp(2rem,3.4vw,2.72rem)] leading-[1.06]">Travel, Thoughtfully Arranged</h2>
          <div className="mx-auto mt-8 h-px w-16 bg-gold" aria-hidden="true" />
          <div className="mx-auto mt-8 max-w-[580px] text-[1.1rem] font-light leading-[1.6] text-haze">
            <p>
              From the first enquiry to the final details of your journey, our focus is on making travel personal, seamless
              and memorable.
            </p>
            <p className="mt-4">
              We bring together exceptional destinations, carefully selected stays and meaningful experiences, creating
              journeys that feel entirely your own.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
