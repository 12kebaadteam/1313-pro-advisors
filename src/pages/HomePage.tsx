import React, { useEffect, useRef, useState } from 'react'
import { PageId } from '../types'
import { SERVICES_DATA } from '../data/servicesData'
import { Button } from '../components/Button'
import { ServiceCard } from '../components/ServiceCard'
import { WhyChooseUs } from '../components/WhyChooseUs'
import { ProcessTimeline } from '../components/ProcessTimeline'
import { EditorialHeroVisual } from '../components/EditorialHeroVisual'
import { ArrowRight, ChevronDown, Shield, FileText, Users } from 'lucide-react'

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

interface HomePageProps {
  onNavigate: (page: PageId) => void
  onContactClick: () => void
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onContactClick }) => {
  const heroReveal = useReveal(0.01)
  const servicesReveal = useReveal()
  const aboutReveal = useReveal()
  const ctaReveal = useReveal()

  const servicesArray = Object.values(SERVICES_DATA)

  return (
    <main>
      {/* ============================================================ */}
      {/* A. HERO SECTION — Split Layout                               */}
      {/* ============================================================ */}
      <section
        ref={heroReveal.ref}
        className={`relative min-h-[88vh] flex items-center bg-cream overflow-hidden transition-opacity duration-700 ${heroReveal.visible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Soft background composition */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Geometric top-right accent — desktop only to avoid background color splitting on mobile */}
          <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full bg-cream-ivory rounded-bl-[120px]" />
          {/* Coral fine accent line */}
          <div className="hidden sm:block absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-coral/60 via-coral/20 to-transparent" />
          {/* Large decorative numeral watermark */}
          <div className="absolute bottom-0 right-6 text-[220px] font-heading font-black text-navy/[0.03] select-none leading-none hidden lg:block">
            13
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT — Editorial Copy Block */}
            <div className="max-w-xl">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-soft border border-cream-border text-xs font-heading font-semibold uppercase tracking-widest text-navy mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" />
                <span>UK Business Administration Services</span>
              </div>

              {/* Primary Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-navy tracking-tight leading-[1.08] mb-4 text-balance">
                Your Business
                <br />
                Operations,{' '}
                <span className="relative">
                  <span className="relative z-10 text-coral">in Better</span>
                  <span className="absolute -bottom-1.5 left-0 right-0 h-3 bg-coral/10 rounded -z-0 blur-sm" />
                </span>
                <br />
                Hands.
              </h1>

              {/* Dividing rule */}
              <div className="w-16 h-1 bg-coral rounded-full mb-6" />

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-navy/70 leading-relaxed mb-8 max-w-lg">
                Professional bookkeeping, payroll administration, timesheet management, and back-office support for UK businesses. We help keep essential operations organised, accurate, and running smoothly.
              </p>

              {/* Value Proposition Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
                {[
                  { icon: <Shield className="w-4 h-4" />, label: 'Direct Service' },
                  { icon: <FileText className="w-4 h-4" />, label: 'Accurate Records' },
                  { icon: <Users className="w-4 h-4" />, label: 'UK-Based Team' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-heading font-semibold text-navy bg-white border border-cream-border px-3 py-2 rounded-lg">
                    <span className="text-coral">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button Group */}
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onContactClick}
                  icon={<ArrowRight className="w-5 h-5" />}
                  className="group"
                >
                  Get in Touch
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    document.getElementById('services-overview')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  icon={<ChevronDown className="w-4 h-4" />}
                >
                  Explore Our Services
                </Button>
              </div>
            </div>

            {/* RIGHT — Editorial Visual Composition */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <EditorialHeroVisual />
            </div>

          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-navy/40 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* B. SERVICES OVERVIEW                                         */}
      {/* ============================================================ */}
      <section
        id="services-overview"
        ref={servicesReveal.ref}
        className={`py-20 lg:py-28 bg-cream-ivory border-t border-cream-border transition-all duration-700 delay-100 ${servicesReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream border border-cream-border text-xs font-heading font-semibold uppercase tracking-wider text-navy mb-4">
                <span>Four Core Service Categories</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-navy tracking-tight">
                Direct Administrative Services for UK Businesses.
              </h2>
            </div>
            <div className="max-w-sm text-sm text-warmGrey leading-relaxed">
              Each service is delivered directly by our in-house team, with no outsourcing. We become an integrated extension of your business operations.
            </div>
          </div>

          {/* Asymmetric 2×2 Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {servicesArray.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                onNavigate={onNavigate}
              />
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-10 pt-8 border-t border-cream-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warmGrey">
            <span>All services provided directly by 1313 Pro Advisors Ltd — no subcontracting.</span>
            <Button variant="ghost" size="sm" onClick={onContactClick} icon={<ArrowRight className="w-3.5 h-3.5" />}>
              Discuss Your Requirements
            </Button>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* C. ABOUT EDITORIAL SECTION                                   */}
      {/* ============================================================ */}
      <section
        ref={aboutReveal.ref}
        className={`py-20 lg:py-28 bg-cream border-t border-cream-border transition-all duration-700 delay-100 ${aboutReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT — Visual Accent Panel */}
            <div className="relative order-2 lg:order-1">
              {/* Navy editorial panel composition */}
              <div className="relative bg-navy rounded-3xl p-8 sm:p-10 text-cream overflow-hidden">

                <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-[60px] bg-navy-light/50 -z-0" />
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-tr-[48px] bg-coral/20 -z-0" />

                <div className="relative z-10">
                  {/* Large decorative rule */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-navy-light flex items-center justify-center">
                      <div className="text-2xl font-heading font-black text-cream/90">
                        1313
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-heading font-bold text-cream">Pro Advisors Ltd</div>
                      <div className="text-xs text-cream/60 uppercase tracking-widest">United Kingdom</div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-cream mb-4 leading-tight">
                    Supporting the Work Behind Every Successful Business.
                  </h3>

                  <p className="text-cream/80 text-sm leading-relaxed mb-8">
                    Bookkeeping entries, payroll schedules, timesheet archives, and administrative records are the operational backbone of every effective UK enterprise. 1313 Pro Advisors Ltd exists to manage these critical workflows with precision and direct accountability.
                  </p>

                  {/* Operational pillars */}
                  <div className="space-y-3">
                    {[
                      'Direct service delivery — no third-party intermediaries.',
                      'Dedicated to UK businesses across sectors.',
                      'Meticulous record accuracy and strict confidentiality.',
                      'Adaptable support aligned to your business rhythm.',
                    ].map((point, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-cream/90">
                        <span className="w-5 h-5 rounded-full bg-coral/30 border border-coral/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-coral block" />
                        </span>
                        {point}
                      </div>
                    ))}
                  </div>

                  {/* Mobile badge */}
                  <div className="sm:hidden mt-6 pt-4 border-t border-navy-light/60 flex items-center justify-between text-xs text-coral font-medium">
                    <span>UK Business Operations Partner</span>
                    <span className="w-2 h-2 rounded-full bg-coral" />
                  </div>
                </div>
              </div>

              {/* Floating accent badge below the card — desktop/tablet only to prevent vertical overlap on mobile */}
              <div className="hidden sm:block absolute -bottom-5 right-6 bg-coral text-white text-xs font-heading font-bold px-5 py-2.5 rounded-xl shadow-elevated">
                UK Business Operations Partner
              </div>
            </div>

            {/* RIGHT — Editorial Text Column */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-soft border border-cream-border text-xs font-heading font-semibold uppercase tracking-wider text-navy mb-6">
                <span>About 1313 Pro Advisors Ltd</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-navy tracking-tight mb-6 leading-tight">
                A Direct Administrative Partner for UK Businesses.
              </h2>

              <div className="space-y-5 text-navy/75 text-base leading-relaxed">
                <p>
                  1313 Pro Advisors Ltd provides professional bookkeeping, payroll administration, timesheet management, and back-office support directly to UK businesses. Our team delivers every service in-house, ensuring complete transparency, direct responsibility, and consistent operational quality.
                </p>
                <p>
                  We work with UK companies that require dependable operational administration — managing the structured work that keeps businesses organised, their financial records accurate, and their internal workflows running efficiently.
                </p>
                <p>
                  Whether you require day-to-day bookkeeping, regular payroll cycle processing support, structured timesheet verification, or broader administrative operations management, our team provides the focused, direct support your business deserves.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-10">
                <Button variant="navy" size="md" onClick={() => onNavigate('about')} icon={<ArrowRight className="w-4 h-4" />}>
                  Learn About Us
                </Button>
                <Button variant="ghost" size="md" onClick={onContactClick}>
                  Start a Discussion
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* D. WHY WORK WITH US — Navy Background                       */}
      {/* ============================================================ */}
      <WhyChooseUs />

      {/* ============================================================ */}
      {/* E. HOW WE WORK TIMELINE                                      */}
      {/* ============================================================ */}
      <ProcessTimeline />

      {/* ============================================================ */}
      {/* F. CLOSING CTA SECTION                                       */}
      {/* ============================================================ */}
      <section
        ref={ctaReveal.ref}
        className={`py-20 lg:py-28 bg-cream-ivory border-t border-cream-border transition-all duration-700 ${ctaReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream border border-cream-border text-xs font-heading font-semibold uppercase tracking-wider text-navy mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-coral" />
            <span>Get Started Today</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-navy tracking-tight mb-6">
            Let's Make Your Business Operations Simpler.
          </h2>

          <p className="text-navy/70 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Discuss your bookkeeping, payroll, timesheet, or back-office requirements with our UK administrative team. Direct, confidential, and tailored to your operational structure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onContactClick}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Get in Touch
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('about')}
            >
              Read More About Us
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-cream-border grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Bookkeeping', desc: 'Day-to-day records' },
              { label: 'Payroll', desc: 'Payroll administration' },
              { label: 'Timesheets', desc: 'Hours verification' },
              { label: 'Back-Office', desc: 'Operational workflows' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-sm font-heading font-bold text-navy mb-0.5">{item.label}</div>
                <div className="text-xs text-warmGrey">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

