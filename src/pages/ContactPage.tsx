import React from 'react'
import { PageId } from '../types'
import { ContactForm } from '../components/ContactForm'
import { Button } from '../components/Button'
import { COMPANY_DETAILS } from '../data/servicesData'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  BookOpen,
  Calculator,
  Briefcase
} from 'lucide-react'

interface ContactPageProps {
  onNavigate: (page: PageId) => void
  initialService?: string
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, initialService }) => {
  return (
    <main>
      {/* ——— HERO ——— */}
      <section className="relative bg-cream pt-10 pb-10 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28 overflow-hidden border-b border-cream-border">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-cream-ivory rounded-bl-[100px] hidden lg:block" />
        <div className="hidden sm:block absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-coral/60 via-coral/15 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-soft border border-cream-border text-xs font-heading font-semibold uppercase tracking-widest text-navy mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" />
              Direct UK Business Enquiries
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-navy tracking-tight leading-[1.08] mb-3 sm:mb-5">
              Let's Make Your Business Operations Simpler.
            </h1>

            <div className="w-14 h-1 bg-coral rounded-full mb-4 sm:mb-6" />

            <p className="text-navy/70 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
              Discuss your bookkeeping, payroll, timesheet management, or back-office requirements directly with our UK administrative team. All enquiries are treated with strict confidentiality.
            </p>
          </div>
        </div>
      </section>

      {/* ——— CONTACT BODY ——— */}
      <section className="py-8 sm:py-16 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-14 items-start">

            {/* FORM WRAPPER — Order 1 on mobile (first!), Order 2 on desktop (right col-span-2) */}
            <div className="order-1 lg:order-2 lg:col-span-2">
              <ContactForm initialService={initialService || 'Bookkeeping'} />
            </div>

            {/* SIDEBAR — Order 2 on mobile (after form), Order 1 on desktop (left col-span-1) */}
            <div className="order-2 lg:order-1 lg:col-span-1 space-y-6">

              {/* What to Expect */}
              <div className="bg-navy rounded-2xl p-7 text-cream">
                <h3 className="text-lg font-heading font-bold text-cream mb-4">
                  What to Expect
                </h3>
                <div className="space-y-4 text-sm text-cream/80 leading-relaxed">
                  <p>
                    When you submit your enquiry, it goes directly to our UK administrative team. We review every submission personally.
                  </p>
                  <p>
                    You can expect a direct response — typically within one UK business day — where we confirm your requirements and outline how we can support your operations.
                  </p>
                </div>
                <div className="mt-5 pt-5 border-t border-navy-light/60 flex items-center gap-2 text-xs text-cream/70">
                  <ShieldCheck className="w-4 h-4 text-coral flex-shrink-0" />
                  <span>All information is treated as strictly confidential.</span>
                </div>
              </div>

              {/* Contact Details */}
              <div className="bg-white rounded-2xl p-7 border border-cream-border">
                <h3 className="text-base font-heading font-bold text-navy mb-5">
                  Direct Contact
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3 text-navy/80 group">
                    <div className="w-9 h-9 rounded-lg bg-cream flex items-center justify-center flex-shrink-0 group-hover:bg-coral transition-colors">
                      <Mail className="w-4 h-4 text-coral group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-warmGrey mb-0.5">Email</div>
                      <a href={`mailto:${COMPANY_DETAILS.email}`} className="font-medium hover:text-coral transition-colors text-navy">
                        {COMPANY_DETAILS.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-navy/80">
                    <div className="w-9 h-9 rounded-lg bg-cream flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-coral" />
                    </div>
                    <div>
                      <div className="text-xs text-warmGrey mb-0.5">Telephone</div>
                      <span className="font-medium text-navy">{COMPANY_DETAILS.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-navy/80">
                    <div className="w-9 h-9 rounded-lg bg-cream flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-coral" />
                    </div>
                    <div>
                      <div className="text-xs text-warmGrey mb-0.5">Service Coverage</div>
                      <span className="font-medium text-navy">London &amp; Nationwide UK</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-navy/80">
                    <div className="w-9 h-9 rounded-lg bg-cream flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-coral" />
                    </div>
                    <div>
                      <div className="text-xs text-warmGrey mb-0.5">Working Hours</div>
                      <span className="font-medium text-navy">{COMPANY_DETAILS.operatingHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Quick Reference */}
              <div className="bg-cream-ivory rounded-2xl p-7 border border-cream-border">
                <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-navy mb-4">
                  Services Available
                </h3>
                <div className="space-y-2.5 text-xs">
                  {[
                    { id: 'bookkeeping', icon: <BookOpen className="w-3.5 h-3.5" />, label: 'Bookkeeping' },
                    { id: 'payroll', icon: <Calculator className="w-3.5 h-3.5" />, label: 'Payroll' },
                    { id: 'timesheet-management', icon: <Clock className="w-3.5 h-3.5" />, label: 'Timesheet Management' },
                    { id: 'back-office-services', icon: <Briefcase className="w-3.5 h-3.5" />, label: 'Back-Office Services' },
                  ].map(svc => (
                    <button
                      key={svc.id}
                      onClick={() => onNavigate(svc.id as PageId)}
                      className="w-full flex items-center gap-2.5 py-2 px-3 rounded-lg text-left hover:bg-cream hover:text-coral transition-colors text-navy group border border-transparent hover:border-cream-border"
                    >
                      <span className="text-coral group-hover:text-coral">{svc.icon}</span>
                      <span className="font-medium">{svc.label}</span>
                      <ArrowRight className="w-3 h-3 ml-auto text-warmGrey/50 group-hover:text-coral transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ——— ALTERNATIVE CONTACT CTA ——— */}
      <section className="py-14 bg-cream-ivory border-t border-cream-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-warmGrey mb-4">
            Prefer to send an email directly? Reach our team at:
          </p>
          <a
            href={`mailto:${COMPANY_DETAILS.email}`}
            className="text-lg font-heading font-bold text-navy hover:text-coral transition-colors"
          >
            {COMPANY_DETAILS.email}
          </a>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="ghost" onClick={() => onNavigate('home')}>
              Back to Homepage
            </Button>
            <Button variant="ghost" onClick={() => onNavigate('about')}>
              Read About Us
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

