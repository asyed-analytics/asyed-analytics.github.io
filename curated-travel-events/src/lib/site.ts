export const contact = {
  email: 'aayesha@curatedtravelandevents.co.uk',
  phoneDisplay: '07947 653744',
  phoneHref: 'tel:+447947653744',
  whatsappHref: 'https://wa.me/447947653744',
  instagramHandle: '@curated_travelandevents',
  instagramHref: 'https://www.instagram.com/curated_travelandevents/',
}

export type EnquiryType = 'Travel' | 'Events'

/** Link to the contact form with the enquiry type chosen and "Interested in: …" pre-filled. */
export const enquiryLink = (type: EnquiryType, interest: string) =>
  `/contact?${new URLSearchParams({ type, interest }).toString()}`
