import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router'
import { ArrowIcon, ExternalLink, Label } from '../components/ui'
import { pageMeta } from '../lib/pages'
import { sendEnquiry, type Enquiry } from '../lib/sendEnquiry'
import { contact, type EnquiryType } from '../lib/site'
import { usePageMeta } from '../lib/usePageMeta'

type FormState = Omit<Enquiry, 'type'> & { type: EnquiryType | '' }
type FieldName = keyof FormState
type Errors = Partial<Record<'type' | 'fullName' | 'email', string>>

const emptyForm: FormState = {
  type: '',
  fullName: '',
  email: '',
  phone: '',
  location: '',
  dates: '',
  size: '',
  requirements: '',
}

const typeOptions: { value: EnquiryType; text: string }[] = [
  { value: 'Travel', text: 'Holidays, cruises, honeymoons, celebrations, premium flights, accessible travel, experiences' },
  { value: 'Events', text: 'Conferences, retreats, group hotel bookings, corporate travel' },
]

// Labels and placeholders that change with the enquiry type.
const typeFields = {
  '': {
    location: 'Destination or event location',
    size: 'Travellers or rooms required',
    placeholders: { location: '', dates: '', size: '' },
  },
  Travel: {
    location: 'Destination',
    size: 'Number of travellers',
    placeholders: {
      location: 'e.g. Maldives, Santorini or Kenya',
      dates: 'e.g. February 2027, around 10 nights',
      size: 'e.g. 2 adults',
    },
  },
  Events: {
    location: 'Event location or venue',
    size: 'Number of rooms required',
    placeholders: {
      location: "e.g. Regent's Park, London",
      dates: 'e.g. 1 to 3 October 2027',
      size: 'e.g. 120 rooms at peak',
    },
  },
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())

function validate(form: FormState): Errors {
  const errors: Errors = {}
  if (!form.type) errors.type = 'Choose Travel or Events so we know who should reply.'
  if (!form.fullName.trim()) errors.fullName = 'Enter your full name.'
  if (!form.email.trim()) errors.email = 'Enter your email address.'
  else if (!isEmail(form.email)) errors.email = 'Enter an email address in the correct format, like name@example.com.'
  return errors
}

function formFromParams(params: URLSearchParams): FormState {
  const type = params.get('type')
  const interest = params.get('interest')?.trim()
  return {
    ...emptyForm,
    type: type === 'Travel' || type === 'Events' ? type : '',
    requirements: interest ? `Interested in: ${interest}` : '',
  }
}

const inputClass = (hasError: boolean) =>
  `block min-h-12 w-full rounded-[2px] border bg-white px-4 py-3 text-base text-ink placeholder:text-[#6b7489] focus:border-midnight ${
    hasError ? 'border-error' : 'border-field'
  }`

function Field({
  id,
  label,
  required = false,
  error,
  children,
  className = '',
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[0.9rem] font-medium leading-snug text-ink">
        {label}
        {required && (
          <span className="text-gold-ink" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[0.88rem] font-medium leading-snug text-error">
          {error}
        </p>
      )}
    </div>
  )
}

function DetailsList() {
  const rows: { label: string; value: ReactNode }[] = [
    { label: 'Company', value: 'Curated Travel & Events' },
    {
      label: 'Email',
      value: (
        <a href={`mailto:${contact.email}`} className="underline decoration-gold underline-offset-4 [overflow-wrap:anywhere]">
          {contact.email}
        </a>
      ),
    },
    {
      label: 'Telephone / WhatsApp',
      value: (
        <>
          <a href={contact.phoneHref} className="underline decoration-gold underline-offset-4">
            {contact.phoneDisplay}
          </a>
          <ExternalLink
            href={contact.whatsappHref}
            className="caps mt-1.5 flex w-fit items-center gap-2 text-[0.68rem] text-gold-ink hover:text-ink"
          >
            Message on WhatsApp
            <ArrowIcon />
          </ExternalLink>
        </>
      ),
    },
    {
      label: 'Instagram',
      value: (
        <ExternalLink href={contact.instagramHref} className="underline decoration-gold underline-offset-4">
          {contact.instagramHandle}
        </ExternalLink>
      ),
    },
    { label: 'Based', value: 'UK-Based | Booking Worldwide' },
    { label: 'ABTA', value: 'P7384, through InteleTravel UK, with whom we are affiliated' },
    { label: 'ATOL', value: 'InteleTravel are appointed agents with our suppliers that hold ATOL.' },
  ]

  return (
    <dl className="mt-12 border-t border-line">
      {rows.map((row) => (
        <div key={row.label} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-6">
          <dt className="caps pt-[0.3em] text-[0.66rem] text-gold-ink">{row.label}</dt>
          <dd className="text-[1rem] leading-[1.6] text-ink">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function EnquiryForm() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [form, setForm] = useState<FormState>(() => formFromParams(searchParams))
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'failed'>('idle')
  const [sent, setSent] = useState<FormState | null>(null)

  const panelRef = useRef<HTMLDivElement>(null)
  const thanksRef = useRef<HTMLHeadingElement>(null)
  const firstTypeRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const focusAfterRender = useRef<'thanks' | 'form' | null>(null)

  useEffect(() => {
    if (focusAfterRender.current === 'thanks') thanksRef.current?.focus()
    if (focusAfterRender.current === 'form') panelRef.current?.focus()
    focusAfterRender.current = null
  }, [sent])

  const errors = attempted ? validate(form) : {}
  const fields = typeFields[form.type]

  const update = (name: FieldName) => (event: { target: { value: string } }) =>
    setForm((current) => ({ ...current, [name]: event.target.value }))

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttempted(true)
    const found = validate(form)
    if (found.type) return firstTypeRef.current?.focus()
    if (found.fullName) return nameRef.current?.focus()
    if (found.email) return emailRef.current?.focus()

    setStatus('sending')
    try {
      await sendEnquiry({ ...form, type: form.type as EnquiryType })
      focusAfterRender.current = 'thanks'
      setSent(form)
      setStatus('idle')
    } catch {
      setStatus('failed')
    }
  }

  function reset() {
    focusAfterRender.current = 'form'
    setForm(emptyForm)
    setAttempted(false)
    setStatus('idle')
    setSent(null)
    setSearchParams({}, { replace: true })
  }

  const describedBy = (name: keyof Errors) => (errors[name] ? `${name}-error` : undefined)

  if (sent) {
    const sentFields = typeFields[sent.type]
    const summary = [
      { label: 'Enquiry type', value: sent.type },
      { label: 'Full name', value: sent.fullName },
      { label: 'Email address', value: sent.email },
      { label: 'Contact number', value: sent.phone },
      { label: sentFields.location, value: sent.location },
      { label: 'Preferred dates', value: sent.dates },
      { label: sentFields.size, value: sent.size },
      { label: 'Additional requirements', value: sent.requirements },
    ].filter((row) => row.value.trim())

    return (
      <div className="bg-mist p-6 sm:p-10" aria-live="polite">
        <h2 ref={thanksRef} tabIndex={-1} className="text-[clamp(2rem,3.4vw,2.6rem)] leading-[1.1] outline-none">
          Thank you, {sent.fullName.trim().split(/\s+/)[0]}.
        </h2>
        <p className="mt-4 text-[1.0625rem] leading-[1.65] text-muted">
          We&rsquo;ve received your {sent.type.toLowerCase()} enquiry and will be in touch shortly.
        </p>
        <dl className="mt-8 border-t border-line">
          {summary.map((row) => (
            <div key={row.label} className="grid gap-1 border-b border-line py-3.5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6">
              <dt className="caps pt-[0.3em] text-[0.64rem] text-gold-ink">{row.label}</dt>
              <dd className="whitespace-pre-line text-[0.98rem] leading-[1.6] text-ink [overflow-wrap:anywhere]">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
        <button type="button" onClick={reset} className="btn btn-midnight mt-8">
          Send another enquiry
          <ArrowIcon />
        </button>
      </div>
    )
  }

  return (
    <div ref={panelRef} tabIndex={-1} className="bg-mist p-6 outline-none sm:p-10">
      <form noValidate onSubmit={handleSubmit} aria-label="Enquiry form">
        <fieldset>
          <legend className="mb-3 text-[0.9rem] font-medium text-ink">
            Enquiry type
            <span className="text-gold-ink" aria-hidden="true">
              {' '}
              *
            </span>
          </legend>
          <div className="grid gap-3 min-[480px]:grid-cols-2">
            {typeOptions.map((option, index) => (
              <label
                key={option.value}
                className={`group/option flex cursor-pointer flex-col rounded-[2px] border bg-white p-5 transition-colors has-[:checked]:border-midnight has-[:checked]:bg-midnight has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-ink ${
                  errors.type ? 'border-error' : 'border-field hover:border-midnight'
                }`}
              >
                <input
                  ref={index === 0 ? firstTypeRef : undefined}
                  type="radio"
                  name="type"
                  value={option.value}
                  checked={form.type === option.value}
                  onChange={update('type')}
                  required
                  aria-describedby={describedBy('type')}
                  className="sr-only"
                />
                <span className="flex items-center justify-between gap-3">
                  <span className="font-display text-[1.6rem] leading-none">{option.value}</span>
                  <span
                    className="grid size-[18px] flex-none place-items-center rounded-full border border-gold"
                    aria-hidden="true"
                  >
                    <span className="size-2 rounded-full bg-gold-pale opacity-0 group-has-[:checked]/option:opacity-100" />
                  </span>
                </span>
                <span className="mt-3 text-[0.86rem] leading-[1.5] text-muted group-has-[:checked]/option:text-haze">
                  {option.text}
                </span>
              </label>
            ))}
          </div>
          {errors.type && (
            <p id="type-error" className="mt-2 text-[0.88rem] font-medium leading-snug text-error">
              {errors.type}
            </p>
          )}
        </fieldset>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <Field id="fullName" label="Full name" required error={errors.fullName}>
            <input
              ref={nameRef}
              id="fullName"
              name="fullName"
              autoComplete="name"
              required
              value={form.fullName}
              onChange={update('fullName')}
              aria-invalid={errors.fullName ? true : undefined}
              aria-describedby={describedBy('fullName')}
              className={inputClass(!!errors.fullName)}
            />
          </Field>
          <Field id="email" label="Email address" required error={errors.email}>
            <input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={update('email')}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy('email')}
              className={inputClass(!!errors.email)}
            />
          </Field>
          <Field id="phone" label="Contact number">
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={update('phone')}
              className={inputClass(false)}
            />
          </Field>
          <Field id="location" label={fields.location}>
            <input
              id="location"
              name="location"
              value={form.location}
              placeholder={fields.placeholders.location}
              onChange={update('location')}
              className={inputClass(false)}
            />
          </Field>
          <Field id="dates" label="Preferred dates">
            <input
              id="dates"
              name="dates"
              value={form.dates}
              placeholder={fields.placeholders.dates}
              onChange={update('dates')}
              className={inputClass(false)}
            />
          </Field>
          <Field id="size" label={fields.size}>
            <input
              id="size"
              name="size"
              value={form.size}
              placeholder={fields.placeholders.size}
              onChange={update('size')}
              className={inputClass(false)}
            />
          </Field>
          <Field id="requirements" label="Additional requirements" className="sm:col-span-2">
            <textarea
              id="requirements"
              name="requirements"
              rows={5}
              value={form.requirements}
              onChange={update('requirements')}
              className={`${inputClass(false)} resize-y`}
            />
          </Field>
        </div>

        <p className="mt-6 text-[0.9rem] leading-[1.6] text-muted">
          We&rsquo;ll only use your details to reply to your enquiry. See our{' '}
          <Link to="/privacy" className="text-ink underline decoration-gold underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>

        {status === 'failed' && (
          <p role="alert" className="mt-4 text-[0.9rem] font-medium leading-snug text-error">
            We couldn&rsquo;t send your enquiry. Please try again, or email us at {contact.email}.
          </p>
        )}

        <button type="submit" disabled={status === 'sending'} className="btn btn-midnight mt-6 w-full sm:w-auto">
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
          <ArrowIcon />
        </button>
      </form>
    </div>
  )
}

export function Contact() {
  usePageMeta(pageMeta['/contact'], '/contact')

  return (
    <section className="py-20 md:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-20">
        <div>
          <Label>Contact</Label>
          <h1 className="mt-5 text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.06]">
            Let&rsquo;s Curate Your Next
            <br />
            <em className="gold-on-light">Journey or Event.</em>
          </h1>
          <p className="mt-6 max-w-[520px] text-[1.05rem] leading-[1.7] text-muted">
            Whether you&rsquo;re planning a luxury holiday, celebrating a special occasion, exploring a bucket-list
            destination or organising a corporate conference, we&rsquo;d be delighted to assist.
          </p>
          <DetailsList />
        </div>
        <EnquiryForm />
      </div>
    </section>
  )
}
