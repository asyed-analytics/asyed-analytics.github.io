import type { EnquiryType } from './site'

export type Enquiry = {
  type: EnquiryType
  fullName: string
  email: string
  phone: string
  location: string
  dates: string
  size: string
  requirements: string
}

/**
 * Sends an enquiry from the contact form.
 *
 * For now nothing is sent: the promise simply resolves so the form shows its thank-you panel.
 *
 * ─── CONNECT A FORM OR EMAIL SERVICE HERE ───────────────────────────────────────────
 * Replace the body of this function with a call to your form or email service, e.g.
 *
 *   const response = await fetch('https://your-form-service.example/endpoint', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
 *     body: JSON.stringify(enquiry),
 *   })
 *   if (!response.ok) throw new Error(`Enquiry failed: ${response.status}`)
 *
 * Throwing an error makes the form show a "couldn't send" message instead of the thank-you panel.
 * ─────────────────────────────────────────────────────────────────────────────────────
 */
export async function sendEnquiry(enquiry: Enquiry): Promise<void> {
  void enquiry
}
