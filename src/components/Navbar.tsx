import React, { useState, useEffect } from 'react'
import { Logo } from './Logo'
import { Button } from './Button'
import { PageId } from '../types'
import { 
  Menu, 
  X, 
  ChevronDown, 
  BookOpen, 
  Calculator, 
  Clock, 
  Briefcase, 
  ArrowRight,
  PhoneCall,
  ShieldCheck
} from 'lucide-react'

interface NavbarProps {
  currentPage: PageId
  onNavigate: (page: PageId) => void
  onContactClick: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onContactClick
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on page change
  const handleNav = (page: PageId) => {
    onNavigate(page)
    setMobileMenuOpen(false)
    setServicesDropdownOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isServicePage = [
    'bookkeeping',
    'payroll',
    'timesheet-management',
    'back-office-services'
  ].includes(currentPage)

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-cream-border py-3.5'
          : 'bg-cream py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNav('home')
            }}
            className="focus:outline-none"
            aria-label="1313 Pro Advisors Ltd Homepage"
          >
            <Logo variant="dark" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 text-sm font-heading font-medium rounded-md transition-colors ${
                currentPage === 'home'
                  ? 'text-navy font-bold bg-navy/5'
                  : 'text-navy/80 hover:text-navy hover:bg-navy/5'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('about')}
              className={`px-3.5 py-2 text-sm font-heading font-medium rounded-md transition-colors ${
                currentPage === 'about'
                  ? 'text-navy font-bold bg-navy/5'
                  : 'text-navy/80 hover:text-navy hover:bg-navy/5'
              }`}
            >
              About Us
            </button>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-heading font-medium rounded-md transition-colors ${
                  isServicePage
                    ? 'text-navy font-bold bg-navy/5'
                    : 'text-navy/80 hover:text-navy hover:bg-navy/5'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-coral' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-cream-border p-3 pt-2.5 mt-1 transition-all animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-warmGrey border-b border-cream-border/60 mb-1 flex items-center justify-between">
                    <span>Direct Services</span>
                    <span className="text-navy font-semibold text-[10px] bg-cream px-2 py-0.5 rounded">UK Focus</span>
                  </div>

                  <button
                    onClick={() => handleNav('bookkeeping')}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-cream/50 transition-colors group flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-md bg-cream flex items-center justify-center flex-shrink-0 mt-0.5 text-navy group-hover:bg-navy group-hover:text-cream transition-colors">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-heading font-semibold text-navy group-hover:text-coral transition-colors">
                        Bookkeeping
                      </div>
                      <div className="text-xs text-warmGrey line-clamp-1">
                        Day-to-day transactions & ledger records
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('payroll')}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-cream/50 transition-colors group flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-md bg-cream flex items-center justify-center flex-shrink-0 mt-0.5 text-navy group-hover:bg-navy group-hover:text-cream transition-colors">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-heading font-semibold text-navy group-hover:text-coral transition-colors">
                        Payroll
                      </div>
                      <div className="text-xs text-warmGrey line-clamp-1">
                        Payroll administration & employee records
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('timesheet-management')}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-cream/50 transition-colors group flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-md bg-cream flex items-center justify-center flex-shrink-0 mt-0.5 text-navy group-hover:bg-navy group-hover:text-cream transition-colors">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-heading font-semibold text-navy group-hover:text-coral transition-colors">
                        Timesheet Management
                      </div>
                      <div className="text-xs text-warmGrey line-clamp-1">
                        Hours tracking, verification & schedules
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('back-office-services')}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-cream/50 transition-colors group flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-md bg-cream flex items-center justify-center flex-shrink-0 mt-0.5 text-navy group-hover:bg-navy group-hover:text-cream transition-colors">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-heading font-semibold text-navy group-hover:text-coral transition-colors">
                        Back-Office Services
                      </div>
                      <div className="text-xs text-warmGrey line-clamp-1">
                        Operational workflows & administration
                      </div>
                    </div>
                  </button>

                  <div className="mt-2 pt-2 border-t border-cream-border/60 px-3 py-1 flex items-center justify-between text-[11px] text-warmGrey">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-coral" /> Direct Service Delivery
                    </span>
                    <span className="text-navy/70">No Outsourcing</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('contact')}
              className={`px-3.5 py-2 text-sm font-heading font-medium rounded-md transition-colors ${
                currentPage === 'contact'
                  ? 'text-navy font-bold bg-navy/5'
                  : 'text-navy/80 hover:text-navy hover:bg-navy/5'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-2 text-xs text-navy/75 font-medium pr-3 border-r border-cream-border">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Direct Support for UK Businesses</span>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={onContactClick}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-navy hover:bg-navy/5 focus:outline-none focus:ring-2 focus:ring-coral"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-cream-border bg-cream-ivory px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="space-y-1 pb-4">
            <button
              onClick={() => handleNav('home')}
              className={`w-full text-left px-3 py-2.5 rounded-lg font-heading text-sm font-medium ${
                currentPage === 'home' ? 'bg-navy text-cream' : 'text-navy hover:bg-cream'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`w-full text-left px-3 py-2.5 rounded-lg font-heading text-sm font-medium ${
                currentPage === 'about' ? 'bg-navy text-cream' : 'text-navy hover:bg-cream'
              }`}
            >
              About Us
            </button>

            <div className="pt-2 pb-1">
              <div className="px-3 text-xs font-bold uppercase tracking-wider text-warmGrey mb-1">
                Direct Services
              </div>
              <button
                onClick={() => handleNav('bookkeeping')}
                className={`w-full text-left px-3 py-2 pl-6 rounded-lg text-sm flex items-center justify-between ${
                  currentPage === 'bookkeeping' ? 'bg-navy text-cream' : 'text-navy hover:bg-cream'
                }`}
              >
                <span>Bookkeeping</span>
                <BookOpen className="w-4 h-4 opacity-70" />
              </button>
              <button
                onClick={() => handleNav('payroll')}
                className={`w-full text-left px-3 py-2 pl-6 rounded-lg text-sm flex items-center justify-between ${
                  currentPage === 'payroll' ? 'bg-navy text-cream' : 'text-navy hover:bg-cream'
                }`}
              >
                <span>Payroll</span>
                <Calculator className="w-4 h-4 opacity-70" />
              </button>
              <button
                onClick={() => handleNav('timesheet-management')}
                className={`w-full text-left px-3 py-2 pl-6 rounded-lg text-sm flex items-center justify-between ${
                  currentPage === 'timesheet-management' ? 'bg-navy text-cream' : 'text-navy hover:bg-cream'
                }`}
              >
                <span>Timesheet Management</span>
                <Clock className="w-4 h-4 opacity-70" />
              </button>
              <button
                onClick={() => handleNav('back-office-services')}
                className={`w-full text-left px-3 py-2 pl-6 rounded-lg text-sm flex items-center justify-between ${
                  currentPage === 'back-office-services' ? 'bg-navy text-cream' : 'text-navy hover:bg-cream'
                }`}
              >
                <span>Back-Office Services</span>
                <Briefcase className="w-4 h-4 opacity-70" />
              </button>
            </div>

            <button
              onClick={() => handleNav('contact')}
              className={`w-full text-left px-3 py-2.5 rounded-lg font-heading text-sm font-medium ${
                currentPage === 'contact' ? 'bg-navy text-cream' : 'text-navy hover:bg-cream'
              }`}
            >
              Contact Us
            </button>
          </div>

          <div className="pt-3 border-t border-cream-border space-y-3">
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                setMobileMenuOpen(false)
                onContactClick()
              }}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Get in Touch
            </Button>
            <div className="text-center text-xs text-warmGrey flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-coral" />
              <span>Direct delivery to UK enterprises</span>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

