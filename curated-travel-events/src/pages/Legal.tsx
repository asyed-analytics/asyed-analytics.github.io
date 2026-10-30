import type { ReactNode } from 'react'
import { Markdown } from '../components/Markdown'
import { AbtaBadge, Label } from '../components/ui'
import { cookies, financialProtection, privacy, terms } from '../content/legal'
import { pageMeta, type PagePath } from '../lib/pages'
import { usePageMeta } from '../lib/usePageMeta'

function LegalPage({ path, title, source, children }: { path: PagePath; title: string; source: string; children?: ReactNode }) {
  usePageMeta(pageMeta[path], path)

  return (
    <section className="py-20 md:py-28">
      <div className="wrap">
        <div className="max-w-[72ch]">
          <Label>Policies</Label>
          <h1 className="mt-5 text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.06]">{title}</h1>
          {children}
          <div className="mt-10 border-t border-line pt-10">
            <Markdown source={source} />
          </div>
        </div>
      </div>
    </section>
  )
}

export const Privacy = () => <LegalPage path="/privacy" title="Privacy Policy" source={privacy} />

export const Terms = () => <LegalPage path="/terms" title="Terms & Conditions" source={terms} />

export const Cookies = () => <LegalPage path="/cookies" title="Cookie Policy" source={cookies} />

export const FinancialProtection = () => (
  <LegalPage path="/financial-protection" title="Booking & Financial Protection" source={financialProtection}>
    <AbtaBadge className="mt-6 border-gold text-ink" />
  </LegalPage>
)
