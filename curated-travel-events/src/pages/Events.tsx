import { useState, type ReactNode } from 'react'
import { Intro, PageHero } from '../components/PageHero'
import { ButtonLink, DividedRow, GoldList, Label } from '../components/ui'
import { pageMeta } from '../lib/pages'
import { enquiryLink } from '../lib/site'
import { usePageMeta } from '../lib/usePageMeta'

const nights = [
  { night: 'Thursday 1 October 2026', rooms: 11 },
  { night: 'Friday 2 October 2026', rooms: 123 },
  { night: 'Saturday 3 October 2026', rooms: 130 },
]
const busiestNight = Math.max(...nights.map((n) => n.rooms))

function NightlyBreakdown() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-10 border-y border-line-dark">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="nightly-breakdown"
        onClick={() => setOpen((value) => !value)}
        className="caps flex min-h-14 w-full items-center justify-between gap-4 text-left text-[0.74rem] text-white"
      >
        View nightly breakdown
        <span className={`relative size-3.5 flex-none text-gold-pale ${open ? 'rotate-45' : ''}`} aria-hidden="true">
          <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
          <span className="absolute inset-y-0 left-1/2 w-px bg-current" />
        </span>
      </button>
      <div id="nightly-breakdown" hidden={!open} className="pb-6">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Room nights per night at Meliá White House, London, October 2026</caption>
          <thead>
            <tr className="caps text-[0.66rem] text-haze-soft">
              <th scope="col" className="pb-3 font-medium">
                Night
              </th>
              <th scope="col" className="pb-3 text-right font-medium">
                Room nights
              </th>
            </tr>
          </thead>
          <tbody>
            {nights.map(({ night, rooms }) => (
              <tr key={night} className="border-t border-line-dark">
                <th scope="row" className="w-[46%] py-3.5 pr-4 text-[0.95rem] font-light text-haze">
                  {night}
                </th>
                <td className="py-3.5">
                  <div className="flex items-center gap-4">
                    <div className="h-1.5 flex-1 bg-line-dark" aria-hidden="true">
                      <div
                        className="h-full bg-[linear-gradient(100deg,#9c7631_0%,#e8cf8f_30%,#b8924a_52%,#f2dda4_74%,#a07a35_100%)]"
                        style={{ width: `${(rooms / busiestNight) * 100}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-[0.95rem] tabular-nums text-white">{rooms}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-gold">
              <th scope="row" className="pt-4 text-[0.95rem] font-medium text-white">
                Total
              </th>
              <td className="pt-4 text-right text-[0.95rem] font-medium tabular-nums text-gold-pale">264 room nights</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

function EditorialRow({
  id,
  label,
  title,
  first = false,
  children,
}: {
  id?: string
  label: string
  title: string
  first?: boolean
  children: ReactNode
}) {
  const headingId = `${title.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '')}-heading`
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`grid gap-8 py-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:py-20 ${
        first ? '' : 'border-t border-line'
      }`}
    >
      <div className="self-start md:sticky md:top-[calc(var(--header-h)+40px)]">
        <Label>{label}</Label>
        <h2 id={headingId} className="mt-4 text-[clamp(2rem,3.2vw,2.72rem)] leading-[1.08]">
          {title}
        </h2>
      </div>
      <div className="text-[1.0625rem] leading-[1.65] text-muted">{children}</div>
    </section>
  )
}

export function Events() {
  usePageMeta(pageMeta['/events'], '/events')

  return (
    <>
      <PageHero
        label="Events"
        photo={{ name: 'events-hero', alt: 'Conference delegates seated in a darkened auditorium', focus: '50% 66%' }}
        overlay="bg-[linear-gradient(90deg,rgba(11,26,51,0.9)_0%,rgba(11,26,51,0.68)_45%,rgba(11,26,51,0.4)_100%)]"
      >
        <h1 className="mt-5 max-w-[780px] text-[clamp(2.6rem,6vw,4.35rem)] leading-[1.08]">
          Corporate Events &amp; Group Accommodation
        </h1>
        <p className="mt-4 font-display text-[clamp(1.25rem,1.8vw,1.45rem)] italic leading-[1.3]">
          <span className="gold-on-dark">Your Venue. Your Delegates. Our Expertise.</span>
        </p>
      </PageHero>

      <Intro lead="Curated Travel & Events provides hotel sourcing, group accommodation and travel coordination for conferences, retreats, professional organisations and corporate events.">
        From executive meetings to large-scale conferences, we simplify the accommodation process through carefully
        selected hotels, negotiated group rates and dedicated booking coordination. Our focus is on providing a reliable,
        professional and personalised service.
      </Intro>

      <section aria-labelledby="featured-heading" className="on-dark bg-midnight py-24 text-white md:py-[120px]">
        <div className="wrap grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,560px)] md:gap-16">
          <div>
            <Label>Featured group booking</Label>
            <p className="mt-6 font-display text-[clamp(7rem,15vw,10.75rem)] leading-[0.8]">
              <span className="gold-on-dark">264</span>
            </p>
            <p className="mt-3 text-[0.9rem] font-medium uppercase tracking-[0.42em]">Room nights</p>
            <p className="mt-6 font-display text-[1.25rem] italic leading-[1.35]">
              <span className="gold-on-dark">Meliá White House, London · October 2026</span>
            </p>
          </div>

          <div className="md:pt-8">
            <h2 id="featured-heading" className="text-[clamp(2rem,3.4vw,2.72rem)] leading-[1.06]">
              Medical Conference Accommodation
            </h2>
            <DividedRow
              items={['Group Accommodation', 'Bed & Breakfast', 'Premium Organiser Hospitality']}
              className="mt-6 text-[0.68rem] text-white"
            />
            <p className="mt-6 text-[1.0625rem] font-light leading-[1.65] text-haze">
              Our first major medical conference accommodation booking, at the prestigious Meliá White House near
              Regent&rsquo;s Park and Euston: 264 room nights across three nights, all on a bed &amp; breakfast basis,
              including group room allocations and rooming list coordination.
            </p>
            <h3 className="caps mt-8 font-sans text-[0.72rem] text-gold-pale">
              Premium accommodation for conference organisers
            </h3>
            <p className="mt-3 text-[1.0625rem] font-light leading-[1.65] text-haze">
              Conference organisers stayed in The Level rooms with access to The Level Lounge, an enhanced hotel
              experience with exclusive lounge facilities.
            </p>
            <NightlyBreakdown />
            <ButtonLink to={enquiryLink('Events', 'Group accommodation')} variant="gold" className="mt-10">
              Enquire about group accommodation
            </ButtonLink>
          </div>
        </div>
      </section>

      <div className="wrap py-10 md:py-16">
        <EditorialRow first label="Specialist sectors" title="Medical, Dental & Pharmaceutical Conferences">
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
            <div>
              <p className="text-ink">We support accommodation requirements for</p>
              <GoldList
                columns={1}
                className="mt-3 text-ink"
                items={[
                  'Medical colleges and professional institutions',
                  'Dental colleges and associations',
                  'Pharmaceutical companies',
                  'Healthcare organisations',
                  'Scientific and educational conferences',
                  'Medical training programmes',
                  'Corporate and professional meetings',
                  'Conference organisers and event management companies',
                ]}
              />
            </div>
            <div>
              <p className="text-ink">We can coordinate accommodation for</p>
              <GoldList
                columns={1}
                className="mt-3 text-ink"
                items={[
                  'Conference delegates',
                  'Consultants and healthcare professionals',
                  'Professors and faculty members',
                  'Guest speakers',
                  'VIP guests',
                  'Corporate representatives',
                  'Event organisers',
                ]}
              />
            </div>
          </div>
        </EditorialRow>

        <EditorialRow label="London" title="Specialist Hotel Accommodation&nbsp;– London">
          <p className="text-ink">
            We can source and arrange hotel accommodation in key London locations, particularly:
          </p>
          <GoldList
            className="mt-3 text-ink"
            items={[
              "NW1 and Regent's Park",
              'Euston Station and surrounding areas',
              'Marylebone',
              'Bloomsbury',
              'Hotels near medical colleges',
              'Hotels near dental colleges and institutions',
              'Hotels near pharmaceutical meeting venues',
              'Hotels near conference centres and professional institutions',
            ]}
          />
          <p className="mt-6">
            We aim to identify hotels conveniently located near the client&rsquo;s conference or event venue. Our services
            are not limited to London. We also arrange group accommodation throughout the UK and internationally.
          </p>
        </EditorialRow>

        <EditorialRow label="10 to several hundred rooms" title="Group Hotel Bookings">
          <p className="text-ink">
            We can assist with accommodation requirements ranging from smaller groups to large conferences.
          </p>
          <GoldList
            className="mt-3 text-ink"
            items={[
              'Hotel sourcing and rate negotiation',
              'Group bookings from 10 rooms to several hundred',
              'Bed & breakfast accommodation packages',
              'Room allocations',
              'Delegate and speaker accommodation',
              'Faculty and VIP accommodation',
              'Rooming list coordination',
              'Arrival and departure date management',
              'Group booking administration',
              'Dedicated booking support',
            ]}
          />
        </EditorialRow>

        <EditorialRow id="retreats" label="Retreats" title="Corporate & Wellness Retreats">
          <p className="text-ink">
            From leadership away-days in a country house to wellness retreats by the sea, we source the venue, the rooms
            and the travel, so your group can focus on time together.
          </p>
          <GoldList
            className="mt-3 text-ink"
            items={[
              'Leadership and team retreats',
              'Strategy days and company offsites',
              'Incentive and reward trips',
              'Wellness, yoga and spa retreats',
              'Country house hotels and coastal resorts in the UK',
              'Retreat venues abroad',
              'Meeting rooms with accommodation packages',
              'Group transfers, private dining and team activities',
            ]}
          />
          <ButtonLink to={enquiryLink('Events', 'A corporate or wellness retreat')} className="mt-9">
            Plan my retreat
          </ButtonLink>
        </EditorialRow>

        <EditorialRow label="Business travel" title="Corporate Travel & Event Arrangements">
          <p className="text-ink">We can also assist with:</p>
          <GoldList
            className="mt-3 text-ink"
            items={[
              'Corporate hotel reservations',
              'Business Class travel arrangements',
              'Airport and executive transfers',
              'Conference and meeting venue sourcing',
              'Accommodation for company meetings',
              'Group travel coordination',
              'Multi-night business stays',
            ]}
          />
          <blockquote className="mt-10 border-l border-gold pl-6 font-display text-[1.45rem] italic leading-[1.4] text-ink md:text-[1.6rem]">
            <p>Our objective is to simplify the booking process by providing one dedicated point of contact.</p>
          </blockquote>
        </EditorialRow>
      </div>
    </>
  )
}
