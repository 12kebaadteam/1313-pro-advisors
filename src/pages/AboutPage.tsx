import React from 'react'
import { PageId } from '../types'
import { Button } from '../components/Button'
import { WhyChooseUs } from '../components/WhyChooseUs'
import { ProcessTimeline } from '../components/ProcessTimeline'
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Clock,
  Briefcase,
  CheckCircle2,
  Target,
  Eye,
  Users,
  Shield
} from 'lucide-react'

interface AboutPageProps {
  onNavigate: (page: PageId) => void
  onContactClick: () => void
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onContactClick }) => {
  const services = [
    { id: 'bookkeeping' as PageId, icon: <BookOpen className="w-5 h-5" />, title: 'Bookkeeping', desc: 'Day-to-day financial transaction recording and organised ledger maintenance.' },
    { id: 'payroll' as PageId, icon: <Calculator className="w-5 h-5" />, title: 'Payroll', desc: 'Payroll administration, processing support and employee payroll records.' },
    { id: 'timesheet-management' as PageId, icon: <Clock className="w-5 h-5" />, title: 'Timesheet Management', desc: 'Working hours recording, timesheet verification and workforce records.' },
    { id: 'back-office-services' as PageId, icon: <Briefcase className="w-5 h-5" />, title: 'Back-Office Services', desc: 'Operational workflows, business records and routine administrative support.' },
  ]

  return (
    <main>
      {/* ——— HERO ——— */}
      <section className="relative bg-cream pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden border-b border-cream-border">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-cream-ivory rounded-bl-[100px] hidden lg:block" />
        <div className="hidden sm:block absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-coral/60 via-coral/15 to-transparent" />
        <div className="absolute bottom-0 right-0 text-[180px] font-heading font-black text-navy/[0.03] select-none leading-none hidden lg:block pr-8">
          AB
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-soft border border-cream-border text-xs font-heading font-semibold uppercase tracking-widest text-navy mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" />
              About 1313 Pro Advisors Ltd
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-navy tracking-tight leading-[1.08] mb-5 text-balance">
              Supporting the Work Behind Every Successful Business.
            </h1>

            <div className="w-14 h-1 bg-coral rounded-full mb-6" />

            <p className="text-navy/70 text-base sm:text-lg leading-relaxed max-w-2xl">
              1313 Pro Advisors Ltd is a dedicated UK business services provider offering direct bookkeeping, payroll administration, timesheet management, and back-office support. We work directly with UK companies to manage the essential administrative functions that keep operations accurate, organised, and running smoothly.
            </p>
          </div>
        </div>
      </section>

      {/* ——— WHO WE ARE ——— */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left — Detailed narrative */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-soft border border-cream-border text-xs font-heading font-semibold uppercase tracking-wider text-navy mb-6">
                Who We Are
              </div>

              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-navy tracking-tight mb-6 leading-tight">
                A Direct Partner for UK Business Administration.
              </h2>

              <div className="space-y-5 text-navy/75 text-base leading-relaxed">
                <p>
                  1313 Pro Advisors Ltd provides professional operational administration services directly to UK businesses. Our focus is on the core transactional, payroll, and organisational functions that every business depends on to maintain clear, accurate records and functional internal workflows.
                </p>
                <p>
                  We work as a direct administrative partner — not an agency, not an outsourcing intermediary, and not a subcontracting vehicle. When your business engages 1313 Pro Advisors Ltd, the work is handled personally, professionally, and with a consistent standard of accountability that we maintain as a core operating principle.
                </p>
                <p>
                  Our services span day-to-day bookkeeping, payroll cycle administration, employee timesheet management, and the broader back-office functions that keep operational documentation organised and accessible. Each engagement is managed directly, with confidential handling of all business records.
                </p>
              </div>
            </div>

            {/* Right — commitment panels */}
            <div className="space-y-5">
              {/* Mission */}
              <div className="bg-white rounded-2xl p-7 border border-cream-border shadow-subtle">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-coral">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-navy">Our Focus</h3>
                </div>
                <p className="text-sm text-warmGrey leading-relaxed">
                  Providing accurate, dependable, and directly delivered bookkeeping, payroll, timesheet, and back-office support exclusively to UK-based enterprises — helping them maintain organised internal operations.
                </p>
              </div>

              {/* Approach */}
              <div className="bg-cream-ivory rounded-2xl p-7 border border-cream-border shadow-subtle">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-coral">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-navy">Our Approach</h3>
                </div>
                <p className="text-sm text-warmGrey leading-relaxed">
                  We establish clear operational processes from the outset, maintain direct professional communication, and structure every workflow around precision, reliability, and confidentiality.
                </p>
              </div>

              {/* Service Scope */}
              <div className="bg-navy rounded-2xl p-7 text-cream">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-light flex items-center justify-center text-coral">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-cream">Our Commitment</h3>
                </div>
                <p className="text-sm text-cream/80 leading-relaxed">
                  Every piece of administrative work is managed in-house. No outsourcing, no delegation to third parties — just direct professional service from our UK team to your business.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ——— WHAT WE PROVIDE ——— */}
      <section className="py-20 bg-cream-ivory border-t border-cream-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream border border-cream-border text-xs font-heading font-semibold uppercase tracking-wider text-navy mb-4">
              Direct Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-navy tracking-tight mb-4">
              What We Provide for UK Businesses
            </h2>
            <p className="text-warmGrey text-base leading-relaxed">
              Four defined service categories, each delivered directly and managed to a consistent professional standard.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((svc, i) => (
              <button
                key={i}
                onClick={() => onNavigate(svc.id)}
                className="group text-left bg-white rounded-2xl p-7 border border-cream-border hover:border-navy/40 hover:-translate-y-1 hover:shadow-card transition-all duration-300 flex gap-5 items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-cream transition-colors flex-shrink-0 mt-0.5">
                  {svc.icon}
                </div>
                <div>
                  <div className="text-lg font-heading font-bold text-navy mb-1 group-hover:text-coral transition-colors">
                    {svc.title}
                  </div>
                  <p className="text-sm text-warmGrey leading-relaxed mb-3">{svc.desc}</p>
                  <div className="flex items-center gap-1.5 text-xs font-heading font-semibold text-coral">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ——— OPERATING VALUES ——— */}
      <section className="py-20 lg:py-28 bg-cream border-t border-cream-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* Left — heading anchored */}
            <div className="lg:col-span-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-soft border border-cream-border text-xs font-heading font-semibold uppercase tracking-wider text-navy mb-5">
                Our Operating Values
              </div>
              <h2 className="text-3xl font-heading font-bold text-navy tracking-tight mb-5 leading-tight">
                How We Operate Every Day.
              </h2>
              <p className="text-warmGrey text-sm leading-relaxed mb-8">
                Our professional values are embedded in every task we handle — from individual ledger entries to full-scale back-office administration programmes.
              </p>
              <Button variant="navy" onClick={onContactClick} icon={<ArrowRight className="w-4 h-4" />}>
                Work With Us
              </Button>
            </div>

            {/* Right — value grid */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: <CheckCircle2 className="w-5 h-5 text-coral" />, title: 'Accuracy in Every Detail', desc: 'Every financial entry, payroll figure, and timesheet hour is recorded methodically and verified before delivery.' },
                { icon: <Shield className="w-5 h-5 text-coral" />, title: 'Strict Confidentiality', desc: 'Your business data, employee payroll records, and operational documents are handled with the highest discretion.' },
                { icon: <Clock className="w-5 h-5 text-coral" />, title: 'Reliability & Punctuality', desc: 'Fixed deadlines, agreed schedules, and consistent delivery — your operations cannot be disrupted by late administration.' },
                { icon: <Users className="w-5 h-5 text-coral" />, title: 'Direct Accountability', desc: 'You engage with our team directly. No handoffs, no layers, no ambiguity about who is responsible for your records.' },
              ].map((val, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-cream-border shadow-subtle">
                  <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center mb-4">
                    {val.icon}
                  </div>
                  <h3 className="text-base font-heading font-bold text-navy mb-2">{val.title}</h3>
                  <p className="text-sm text-warmGrey leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ——— WHY CHOOSE US ——— */}
      <WhyChooseUs />

      {/* ——— PROCESS ——— */}
      <ProcessTimeline />

      {/* ——— CTA ——— */}
      <section className="py-20 lg:py-24 bg-cream-ivory border-t border-cream-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-navy mb-4 tracking-tight">
            Ready to Bring Order to Your Business Administration?
          </h2>
          <p className="text-warmGrey text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Connect with our team to discuss your bookkeeping, payroll, timesheet, or back-office requirements. All engagements are confidential and direct.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" onClick={onContactClick} icon={<ArrowRight className="w-5 h-5" />}>
              Get in Touch
            </Button>
            <Button variant="secondary" size="lg" onClick={() => onNavigate('home')}>
              Back to Homepage
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

