import React from 'react'
import { Logo } from './Logo'
import { PageId } from '../types'
import { COMPANY_DETAILS } from '../data/servicesData'
import { 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  CheckCircle2, 
  Lock 
} from 'lucide-react'

interface FooterProps {
  onNavigate: (page: PageId) => void
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy text-cream pt-16 pb-12 border-t border-navy-light/40 relative overflow-hidden">
      {/* Subtle geometric line pattern in Navy/Coral accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-coral via-coral-deep to-navy" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-navy-light/60">
          {/* Brand & Overview (Col 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            <Logo variant="light" showTagline={true} />
            
            <p className="text-cream/80 text-sm leading-relaxed max-w-sm">
              Direct professional partner supporting UK businesses with meticulous bookkeeping, payroll administration, timesheet tracking, and operational back-office management.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-navy-light/60 border border-navy-light text-xs text-cream/90 font-medium">
              <ShieldCheck className="w-4 h-4 text-coral flex-shrink-0" />
              <span>Direct service provider — zero third-party outsourcing</span>
            </div>

            <div className="pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-cream/50 mb-2">
                Business Accountability
              </div>
              <p className="text-xs text-cream/70 leading-relaxed">
                Providing dedicated administrative operations directly to UK companies.
              </p>
            </div>
          </div>

          {/* Quick Navigation (Col 5-6) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-sm font-heading font-bold uppercase tracking-wider text-coral">
              Navigation
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-cream/75 hover:text-coral transition-colors flex items-center gap-1.5 text-left"
                >
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-cream/75 hover:text-coral transition-colors flex items-center gap-1.5 text-left"
                >
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-cream/75 hover:text-coral transition-colors flex items-center gap-1.5 text-left"
                >
                  <span>Contact &amp; Enquiries</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  className="text-cream/75 hover:text-coral transition-colors flex items-center gap-1.5 text-left"
                >
                  <span>Privacy Policy</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Services (Col 7-9) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-sm font-heading font-bold uppercase tracking-wider text-coral">
              Direct Services
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('bookkeeping')}
                  className="text-cream/75 hover:text-coral transition-colors flex items-center justify-between w-full group text-left"
                >
                  <span>Bookkeeping</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-coral" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('payroll')}
                  className="text-cream/75 hover:text-coral transition-colors flex items-center justify-between w-full group text-left"
                >
                  <span>Payroll</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-coral" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('timesheet-management')}
                  className="text-cream/75 hover:text-coral transition-colors flex items-center justify-between w-full group text-left"
                >
                  <span>Timesheet Management</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-coral" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('back-office-services')}
                  className="text-cream/75 hover:text-coral transition-colors flex items-center justify-between w-full group text-left"
                >
                  <span>Back-Office Services</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-coral" />
                </button>
              </li>
            </ul>

            <div className="pt-3 border-t border-navy-light/40">
              <div className="flex items-center gap-1.5 text-xs text-cream/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-coral flex-shrink-0" />
                <span>Strict operational confidentiality</span>
              </div>
            </div>
          </div>

          {/* Contact Details & Direct Engagement (Col 10-12) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-sm font-heading font-bold uppercase tracking-wider text-coral">
              UK Business Enquiries
            </div>
            <p className="text-xs text-cream/75 leading-relaxed">
              Have questions regarding bookkeeping, payroll cycles, timesheet verification, or back-office administration? Reach out directly to our team.
            </p>

            <div className="space-y-2.5 text-xs text-cream/85">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-coral flex-shrink-0" />
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="hover:text-coral transition-colors"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-coral flex-shrink-0" />
                <span>{COMPANY_DETAILS.phone}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" />
                <span>London &amp; Nationwide UK Client Coverage</span>
              </div>
              <div className="flex items-center gap-2.5 text-cream/60 text-[11px] pt-1">
                <ClockIcon className="w-3.5 h-3.5 text-coral" />
                <span>{COMPANY_DETAILS.operatingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>&copy; {currentYear} {COMPANY_DETAILS.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-coral transition-colors flex items-center gap-1"
            >
              <Lock className="w-3 h-3 text-coral/80" />
              <span>Privacy Policy &amp; Data Protection</span>
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-coral transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>

        {/* Developer Attribution Credit */}
        <div className="mt-6 pt-4 border-t border-navy-light/30 text-center text-[11px] text-cream/40 tracking-wide select-none">
          Developed by MyPaperTrail Co.
        </div>
      </div>
    </footer>
  )
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

