import React from 'react'
import { PageId } from '../types'
import { Button } from '../components/Button'
import { COMPANY_DETAILS } from '../data/servicesData'
import { ArrowRight, Shield } from 'lucide-react'

interface PrivacyPageProps {
  onNavigate: (page: PageId) => void
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <main>
      {/* ——— HERO ——— */}
      <section className="relative bg-cream pt-16 pb-14 lg:pt-20 lg:pb-16 overflow-hidden border-b border-cream-border">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-coral/60 via-coral/15 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-soft border border-cream-border text-xs font-heading font-semibold uppercase tracking-widest text-navy mb-6">
            <Shield className="w-3.5 h-3.5 text-coral" />
            Legal &amp; Data Protection
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-navy tracking-tight mb-5">
            Privacy Policy
          </h1>
          <div className="w-12 h-1 bg-coral rounded-full mb-5" />
          <p className="text-navy/70 text-sm leading-relaxed max-w-xl">
            This Privacy Policy sets out how 1313 Pro Advisors Ltd collects, uses, and protects personal data provided to us in connection with our business enquiry and service delivery activities.
          </p>
          <p className="text-xs text-warmGrey mt-4">
            Last reviewed: November 2026 &nbsp;·&nbsp; Registered in England &amp; Wales
          </p>
        </div>
      </section>

      {/* ——— CONTENT ——— */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-sm max-w-none text-navy/80 leading-relaxed">

            <div className="space-y-10">

              {[
                {
                  heading: '1. Who We Are',
                  content: (
                    <p>
                      1313 Pro Advisors Ltd is registered in England &amp; Wales as a direct provider of bookkeeping, payroll administration, timesheet management, and back-office business support services. As a data controller, we are responsible for the personal data we collect and process in connection with our business operations and client service delivery. For enquiries relating to data protection, you may contact us at{' '}
                      <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-coral hover:underline">
                        {COMPANY_DETAILS.email}
                      </a>.
                    </p>
                  )
                },
                {
                  heading: '2. Information We Collect',
                  content: (
                    <div>
                      <p>We may collect the following types of personal information:</p>
                      <ul className="mt-3 space-y-2 pl-5 list-disc text-sm">
                        <li><strong>Contact Details:</strong> Full name, business name, business email address, and telephone number provided via our enquiry form or direct correspondence.</li>
                        <li><strong>Operational Data:</strong> Information relating to your business requirements, service needs, and administrative processes shared for the purpose of service delivery.</li>
                        <li><strong>Correspondence Records:</strong> Records of communications between your business and 1313 Pro Advisors Ltd via email or telephone.</li>
                        <li><strong>Website Usage Data:</strong> Standard browser and device information collected via standard server logs if you visit our website (e.g. IP address, browser type, page accessed). We do not use third-party tracking or advertising cookies.</li>
                      </ul>
                    </div>
                  )
                },
                {
                  heading: '3. How We Use Your Information',
                  content: (
                    <div>
                      <p>We use the personal information you provide for the following purposes:</p>
                      <ul className="mt-3 space-y-2 pl-5 list-disc text-sm">
                        <li>To respond directly to business enquiries submitted via our contact form or email.</li>
                        <li>To provide and administer our direct bookkeeping, payroll, timesheet management, and back-office services.</li>
                        <li>To maintain operational records and communicate with existing clients regarding their service requirements.</li>
                        <li>To fulfil our legal and contractual obligations as a service provider registered in England &amp; Wales.</li>
                      </ul>
                      <p className="mt-4">We do not use personal data for unsolicited marketing, automated profiling, or any purpose unrelated to the direct provision of our services.</p>
                    </div>
                  )
                },
                {
                  heading: '4. Legal Basis for Processing',
                  content: (
                    <div>
                      <p>Under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018, we process personal data on the following lawful bases:</p>
                      <ul className="mt-3 space-y-2 pl-5 list-disc text-sm">
                        <li><strong>Consent:</strong> Where you have provided explicit consent via our enquiry form.</li>
                        <li><strong>Contractual Necessity:</strong> Where processing is necessary to deliver our services pursuant to an agreement with your business.</li>
                        <li><strong>Legitimate Interests:</strong> To respond to direct business enquiries and maintain standard commercial administration records.</li>
                        <li><strong>Legal Obligation:</strong> Where required to comply with applicable UK law.</li>
                      </ul>
                    </div>
                  )
                },
                {
                  heading: '5. Data Sharing and Third Parties',
                  content: (
                    <p>
                      1313 Pro Advisors Ltd does not share, sell, rent, or transfer your personal information to third-party marketing organisations, data brokers, or external intermediaries. All service delivery is conducted directly by our in-house UK team. We may be required to disclose information to competent legal or regulatory authorities if required by law, in which case we will do so only to the extent required and in accordance with applicable UK legislation.
                    </p>
                  )
                },
                {
                  heading: '6. Data Retention',
                  content: (
                    <p>
                      We retain personal data only for as long as is necessary to fulfil the purpose for which it was collected, to deliver our services, or to comply with any applicable legal obligation. Business enquiry information is retained for a reasonable period to enable us to respond and to maintain a record of correspondence. Where you request deletion of your personal data, we will act on that request promptly in accordance with your rights under UK GDPR, subject to any overriding legal obligations.
                    </p>
                  )
                },
                {
                  heading: '7. Your Rights Under UK GDPR',
                  content: (
                    <div>
                      <p>Under UK data protection law, you have the following rights:</p>
                      <ul className="mt-3 space-y-2 pl-5 list-disc text-sm">
                        <li><strong>Right of Access:</strong> To request a copy of the personal data we hold about you.</li>
                        <li><strong>Right to Rectification:</strong> To request correction of inaccurate or incomplete data.</li>
                        <li><strong>Right to Erasure:</strong> To request deletion of your personal data where it is no longer needed or where consent is withdrawn.</li>
                        <li><strong>Right to Restriction:</strong> To request that we limit the way we use your data in certain circumstances.</li>
                        <li><strong>Right to Withdraw Consent:</strong> Where processing is based on your consent, you may withdraw that consent at any time.</li>
                        <li><strong>Right to Complain:</strong> If you believe your data protection rights have been infringed, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">ico.org.uk</a>.</li>
                      </ul>
                      <p className="mt-4">To exercise any of your rights, please contact us at <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-coral hover:underline">{COMPANY_DETAILS.email}</a>.</p>
                    </div>
                  )
                },
                {
                  heading: '8. Data Security',
                  content: (
                    <p>
                      We take the security of your personal and business data seriously. 1313 Pro Advisors Ltd implements appropriate technical and organisational measures to protect personal data from unauthorised access, disclosure, alteration, or loss. Access to business records and client information is restricted to authorised team members only, in line with our internal confidentiality protocols.
                    </p>
                  )
                },
                {
                  heading: '9. Contact &amp; Queries',
                  content: (
                    <p>
                      If you have any questions regarding this Privacy Policy or the way in which 1313 Pro Advisors Ltd handles your personal data, please contact us directly at{' '}
                      <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-coral hover:underline">{COMPANY_DETAILS.email}</a>
                      {' '}or by telephone at {COMPANY_DETAILS.phone}. We are committed to addressing all data protection queries directly and transparently.
                    </p>
                  )
                },
                {
                  heading: '10. Policy Updates',
                  content: (
                    <p>
                      This Privacy Policy may be updated from time to time to reflect changes in our practices or applicable UK data protection law. Any material changes will be reflected on this page with an updated review date. We encourage you to review this policy periodically.
                    </p>
                  )
                },
              ].map((section, i) => (
                <div key={i} className="pb-10 border-b border-cream-border last:border-0 last:pb-0">
                  <h2 className="text-xl font-heading font-bold text-navy mb-4">{section.heading}</h2>
                  <div className="text-navy/75 text-sm leading-relaxed">
                    {section.content}
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-14 pt-10 border-t border-cream-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-warmGrey">
              &copy; {new Date().getFullYear()} {COMPANY_DETAILS.name}. Registered in England &amp; Wales.
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" size="sm" onClick={() => onNavigate('contact')} icon={<ArrowRight className="w-3.5 h-3.5" />}>
                Contact Us
              </Button>
              <Button variant="secondary" size="sm" onClick={() => onNavigate('home')}>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
