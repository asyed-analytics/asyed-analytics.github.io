import { Link } from 'react-router'
import { ArrowIcon, DividedRow, Label, Photo, type PhotoName } from '../components/ui'
import { pageMeta } from '../lib/pages'
import { usePageMeta } from '../lib/usePageMeta'

const services: {
  title: string
  text: string
  cta: string
  to: string
  photo: { name: PhotoName; alt: string; focus: string }
}[] = [
  {
    title: 'Travel',
    text: 'Luxury holidays, cruises, honeymoons, premium air travel, milestone celebrations and once-in-a-lifetime experiences.',
    cta: 'Explore travel',
    to: '/travel',
    photo: {
      name: 'travel-hero',
      alt: 'Wooden rowing boats on a turquoise alpine lake beneath forested mountains',
      focus: '36% 60%',
    },
  },
  {
    title: 'Events',
    text: 'Corporate conferences, retreats, medical and pharmaceutical events, group hotel accommodation and business travel.',
    cta: 'Explore events',
    to: '/events',
    photo: { name: 'events-hero', alt: 'Conference delegates seated in a darkened auditorium', focus: '52% 60%' },
  },
]

const celebrations: {
  title: string
  text: string
  cta: string
  to: string
  photo: { name: PhotoName; alt: string; focus: string }
}[] = [
  {
    title: 'Honeymoons & Romantic Getaways',
    text: 'Celebrate the beginning of your next chapter with overwater villas, private pool suites, romantic island escapes and private dining for two.',
    cta: 'Explore honeymoons',
    to: '/travel#honeymoons',
    photo: { name: 'honeymoons', alt: 'Aerial view of a heart-shaped island in a turquoise lagoon', focus: '50% 42%' },
  },
  {
    title: 'Milestone Birthdays & Anniversaries',
    text: 'Milestone birthdays, anniversaries and family celebrations, with private villas, sunset cruises and special dining.',
    cta: 'Explore celebrations',
    to: '/travel#milestones',
    photo: {
      name: 'milestones',
      alt: 'Sparklers being lit on a celebration cake beside a vase of yellow tulips',
      focus: '62% 55%',
    },
  },
]

export function Home() {
  usePageMeta(pageMeta['/'], '/')

  return (
    <>
      <section className="on-dark bg-midnight pb-20 pt-20 text-white md:pb-24 md:pt-28">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end lg:gap-[72px]">
          <div>
            <h1 className="text-[clamp(2.4rem,7.4vw,3.4rem)] leading-[1.08] lg:text-[clamp(2.4rem,4.4vw,3.4rem)]">
              Extraordinary Journeys.
              <br />
              <em className="gold-on-dark">Exceptional Experiences.</em>
            </h1>
            <DividedRow
              items={['Luxury Travel', 'Corporate Events', 'Bucket-List Experiences']}
              className="mt-8 text-white/90"
            />
          </div>
          <div className="text-[1.0625rem] font-light leading-[1.65] text-haze">
            <p>
              At Curated Travel &amp; Events, we create personalised journeys, unforgettable experiences and seamless
              corporate travel arrangements.
            </p>
            <p className="mt-4">
              From luxury holidays and milestone celebrations to retreats and group accommodation, we take care of the
              details so our clients can focus on the experience.
            </p>
            <p className="mt-6 border-t border-line-dark pt-5 text-[0.95rem] font-normal text-gold-pale">
              UK-Based | Booking Worldwide
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="services-label" className="bg-[linear-gradient(to_bottom,var(--color-midnight)_240px,#fff_240px)] md:bg-[linear-gradient(to_bottom,var(--color-midnight)_30%,#fff_30%)]">
        <div className="wrap">
          <div className="on-dark">
            <Label className="justify-center">
              <span id="services-label">Explore our services</span>
            </Label>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-[30px]">
            {services.map((service) => (
              <article
                key={service.title}
                className="on-dark group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden bg-midnight-raised"
              >
                <Photo
                  {...service.photo}
                  eager
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="zoom-photo absolute inset-0 -z-10"
                />
                <div
                  className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(11,26,51,0.92)_0%,rgba(11,26,51,0.55)_38%,rgba(11,26,51,0)_68%)]"
                  aria-hidden="true"
                />
                {/* Not positioned, so the link's ::after stretches over the whole card. */}
                <div className="p-7 text-white md:p-10">
                  <h2 className="text-[clamp(2.1rem,4vw,2.9rem)] uppercase leading-none tracking-[0.14em]">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-[30rem] text-[0.98rem] font-light leading-[1.65] text-[#e1e5ec]">{service.text}</p>
                  <Link to={service.to} className="btn btn-outline mt-7 after:absolute after:inset-0">
                    {service.cta}
                    <ArrowIcon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="celebrate-heading" className="pb-24 pt-24 md:pb-32 md:pt-28">
        <div className="wrap">
          <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
            <div>
              <Label>Celebrate with us</Label>
              <h2 id="celebrate-heading" className="mt-3 text-[clamp(2rem,3.4vw,2.72rem)] leading-[1.06]">
                Honeymoons &amp; Milestone Celebrations
              </h2>
            </div>
            <p className="text-[1.0625rem] leading-[1.65] text-muted">
              Life&rsquo;s biggest moments deserve more than an ordinary holiday. We plan honeymoons, milestone birthdays and
              anniversaries around the people celebrating, down to the last detail.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-[30px]">
            {celebrations.map((card) => (
              <article
                key={card.title}
                className="group relative flex flex-col border border-line bg-white transition-colors duration-300 hover:border-gold"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <Photo {...card.photo} sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <h3 className="text-[clamp(1.6rem,2.4vw,2rem)] leading-[1.12]">{card.title}</h3>
                  <p className="mt-4 text-[1.0625rem] leading-[1.65] text-muted">{card.text}</p>
                  <Link
                    to={card.to}
                    className="caps mt-auto inline-flex items-center gap-3 self-start pt-6 text-[0.74rem] text-gold-ink after:absolute after:inset-0"
                  >
                    {card.cta}
                    <ArrowIcon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
