import React from 'react'
import { PageId, ServiceInfo } from '../types'
import { Button } from '../components/Button'
import { SERVICES_DATA } from '../data/servicesData'
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Clock,
  Briefcase,
  CheckCircle2,
  ArrowLeft,
  ChevronRight
} from 'lucide-react'

function getServiceIcon(id: string, size = 'w-6 h-6') {
  const cls = `${size} flex-shrink-0`
  switch (id) {
    case 'bookkeeping': return <BookOpen className={cls} />
    case 'payroll': return <Calculator className={cls} />
    case 'timesheet-management': return <Clock className={cls} />
    case 'back-office-services': return <Briefcase className={cls} />
    default: return <BookOpen className={cls} />
  }
}

interface ServiceDetailPageProps {
  serviceId: string
  onNavigate: (page: PageId) => void
  onContactClick: () => void
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId,
  onNavigate,
  onContactClick
}) => {
  const service: ServiceInfo | undefined = SERVICES_DATA[serviceId]

  // Fallback if service not found
  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-cream px-4">
        <div className="text-6xl font-heading font-black text-navy/10">404</div>
        <h1 className="text-2xl font-heading font-bold text-navy">Service Not Found</h1>
        <Button variant="primary" onClick={() => onNavigate('home')}>Return Home</Button>
      </div>
    )
  }

  // Other services for the sidebar nav
  const otherServices = Object.values(SERVICES_DATA).filter(s => s.id !== service.id)

  return (
    <main>
      {/* ——— SERVICE HERO ——— */}
      <section className="relative bg-cream pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden border-b border-cream-border">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-cream-ivory rounded-bl-[100px] hidden lg:block" />
        <div className="hidden sm:block absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-coral/60 via-coral/15 to-transparent" />
        <div className="absolute bottom-0 right-0 text-[160px] font-heading font-black text-navy/[0.025] select-none leading-none hidden lg:block pr-6">
          {service.id === 'bookkeeping' ? 'BK' : service.id === 'payroll' ? 'PR' : service.id === 'timesheet-management' ? 'TS' : 'BO'}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-warmGrey mb-8" aria-label="Breadcrumb">
            <button onClick={() => onNavigate('home')} className="hover:text-coral transition-colors">Home</button>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="text-navy font-semibold">{service.title}</span>
          </nav>

          {/* Back button */}
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-heading font-semibold text-navy hover:text-coral transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to All Services
          </button>

          <div className="max-w-3xl">
            {/* Service Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-soft border border-cream-border text-xs font-heading font-semibold uppercase tracking-widest text-navy mb-6">
              <span className="text-coral">{getServiceIcon(service.id, 'w-3.5 h-3.5')}</span>
              <span>Direct UK Service</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-navy tracking-tight leading-[1.08] mb-5">
              {service.title}
            </h1>

            <div className="w-14 h-1 bg-coral rounded-full mb-6" />

            <p className="text-navy/70 text-base sm:text-lg leading-relaxed max-w-2xl">
              {service.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ——— CONTENT BODY ——— */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-14">

            {/* Main Content — 2 col span */}
            <div className="lg:col-span-2 space-y-14">

              {/* Introduction */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-navy mb-5">
                  What We Provide
                </h2>
                <p className="text-navy/70 text-base leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Core Activities */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-navy mb-6">
                  What This Service Covers
                </h2>
                <div className="space-y-3">
                  {service.coreActivities.map((activity, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-cream-border hover:border-navy/30 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-cream flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-coral group-hover:text-white transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-coral group-hover:text-white" />
                      </div>
                      <span className="text-sm text-navy/80 leading-relaxed">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operational Outcomes */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-navy mb-6">
                  What This Delivers for Your Business
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {service.operationalOutcomes.map((outcome, i) => (
                    <div key={i} className="bg-cream-ivory rounded-2xl p-6 border border-cream-border">
                      <div className="text-sm font-mono text-coral font-bold mb-2 opacity-70">
                        0{i + 1}
                      </div>
                      <h3 className="text-base font-heading font-bold text-navy mb-2">
                        {outcome.title}
                      </h3>
                      <p className="text-xs text-warmGrey leading-relaxed">
                        {outcome.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* How This Service Works — Process */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-navy mb-6">
                  How This Works in Practice
                </h2>
                <div className="space-y-4">
                  {service.processSteps.map((step, i) => (
                    <div
                      key={i}
                      className={`flex gap-5 p-5 rounded-xl border transition-all ${
                        i === 0
                          ? 'bg-navy text-cream border-navy-light'
                          : 'bg-white border-cream-border hover:border-navy/30'
                      }`}
                    >
                      <div className={`text-2xl font-heading font-black flex-shrink-0 leading-none mt-0.5 ${
                        i === 0 ? 'text-coral' : 'text-navy/20'
                      }`}>
                        {step.number}
                      </div>
                      <div>
                        <div className={`font-heading font-bold mb-1 ${i === 0 ? 'text-cream' : 'text-navy'}`}>
                          {step.step}
                        </div>
                        <p className={`text-sm leading-relaxed ${i === 0 ? 'text-cream/75' : 'text-warmGrey'}`}>
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inline CTA */}
              <div className="bg-navy rounded-2xl p-8 text-cream">
                <h3 className="text-2xl font-heading font-bold mb-3 text-cream">
                  Ready to Discuss Your {service.title} Requirements?
                </h3>
                <p className="text-cream/75 text-sm leading-relaxed mb-6">
                  Connect directly with our UK administrative team. All enquiries are handled confidentially and without obligation.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" onClick={onContactClick} icon={<ArrowRight className="w-4 h-4" />}>
                    Get in Touch
                  </Button>
                  <Button variant="cream" onClick={() => onNavigate('about')}>
                    About Our Team
                  </Button>
                </div>
              </div>

            </div>

            {/* RIGHT SIDEBAR */}
            <div className="lg:col-span-1 space-y-6">

              {/* Quick CTA Box */}
              <div className="bg-coral rounded-2xl p-6 text-white sticky top-24">
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3 text-white">
                    {getServiceIcon(service.id)}
                  </div>
                  <h3 className="text-lg font-heading font-bold">Start Your Enquiry</h3>
                  <p className="text-white/80 text-xs mt-1 leading-relaxed">
                    Speak directly with our UK team about your {service.title.toLowerCase()} requirements.
                  </p>
                </div>
                <Button variant="cream" fullWidth onClick={onContactClick} icon={<ArrowRight className="w-4 h-4" />}>
                  Get in Touch
                </Button>
                <div className="mt-4 pt-4 border-t border-white/20 text-[11px] text-white/70 text-center">
                  Confidential · Direct · No Obligation
                </div>
              </div>

              {/* Other Services */}
              <div className="bg-cream-ivory rounded-2xl p-6 border border-cream-border">
                <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-navy mb-4">
                  Other Direct Services
                </h3>
                <div className="space-y-2">
                  {otherServices.map(svc => (
                    <button
                      key={svc.id}
                      onClick={() => {
                        onNavigate(svc.id as PageId)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className="w-full text-left flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition-colors group border border-transparent hover:border-cream-border"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-cream transition-colors flex-shrink-0">
                        {getServiceIcon(svc.id, 'w-4 h-4')}
                      </div>
                      <span className="text-sm font-heading font-semibold text-navy group-hover:text-coral transition-colors">
                        {svc.title}
                      </span>
                      <ChevronRight className="w-4 h-4 text-warmGrey/50 ml-auto group-hover:text-coral transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Why Direct Card */}
              <div className="bg-white rounded-2xl p-6 border border-cream-border">
                <h3 className="text-sm font-heading font-bold text-navy mb-3">Why Direct Service Matters</h3>
                <ul className="space-y-2.5 text-xs text-warmGrey leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" />
                    <span>No outsourcing — work is handled in-house by our UK team.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" />
                    <span>Strict confidentiality of all records and financial documents.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" />
                    <span>Direct communication — no account management layers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" />
                    <span>Adaptable to your business schedule and operational cadence.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

