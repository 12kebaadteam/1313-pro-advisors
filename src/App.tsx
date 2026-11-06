import React, { useState, useEffect } from 'react'
import { PageId } from './types'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ServiceDetailPage } from './pages/ServiceDetailPage'
import { ContactPage } from './pages/ContactPage'
import { PrivacyPage } from './pages/PrivacyPage'

const BASE_URL = 'https://1313-pro-advisors.vercel.app'

// Route to Path mapping
function getPathForPage(page: PageId): string {
  switch (page) {
    case 'home':
      return '/'
    case 'about':
      return '/about'
    case 'bookkeeping':
      return '/services/bookkeeping'
    case 'payroll':
      return '/services/payroll'
    case 'timesheet-management':
      return '/services/timesheet-management'
    case 'back-office-services':
      return '/services/back-office-services'
    case 'contact':
      return '/contact'
    case 'privacy':
      return '/privacy-policy'
    default:
      return '/'
  }
}

// Path to Route mapping
function getPageFromPath(path: string): PageId {
  const cleanPath = path.toLowerCase().replace(/\/+$/, '') || '/'

  if (cleanPath === '/' || cleanPath === '/home') return 'home'
  if (cleanPath === '/about' || cleanPath === '/about-us') return 'about'
  if (cleanPath === '/services/bookkeeping' || cleanPath === '/bookkeeping') return 'bookkeeping'
  if (cleanPath === '/services/payroll' || cleanPath === '/payroll') return 'payroll'
  if (cleanPath === '/services/timesheet-management' || cleanPath === '/timesheet-management') return 'timesheet-management'
  if (cleanPath === '/services/back-office-services' || cleanPath === '/back-office-services') return 'back-office-services'
  if (cleanPath === '/contact' || cleanPath === '/contact-us') return 'contact'
  if (cleanPath === '/privacy-policy' || cleanPath === '/privacy') return 'privacy'

  return 'home'
}

// Page-level SEO Metadata configuration
const PAGE_SEO: Record<PageId, { title: string; description: string; path: string }> = {
  home: {
    title: '1313 Pro Advisors Ltd | Bookkeeping & Payroll Services UK',
    description: 'Professional bookkeeping, payroll, timesheet management and back-office support for UK businesses. Contact 1313 Pro Advisors Ltd to discuss your business needs.',
    path: '/'
  },
  about: {
    title: 'About Us | 1313 Pro Advisors Ltd | UK Business Administration',
    description: 'Learn about 1313 Pro Advisors Ltd, a dedicated UK business services provider offering direct bookkeeping, payroll, timesheet, and back-office support.',
    path: '/about'
  },
  bookkeeping: {
    title: 'Bookkeeping Services UK | 1313 Pro Advisors Ltd',
    description: 'Professional bookkeeping services for UK businesses. Systematic transaction recording, ledger records and structured financial administration.',
    path: '/services/bookkeeping'
  },
  payroll: {
    title: 'Payroll Administration & Processing Support UK | 1313 Pro Advisors Ltd',
    description: 'Dependable payroll administration and processing support for UK businesses. Employee payroll records, pay cycle workflows, and direct management.',
    path: '/services/payroll'
  },
  'timesheet-management': {
    title: 'Employee Timesheet Management Services UK | 1313 Pro Advisors Ltd',
    description: 'Accurate timesheet management and working hours tracking for UK businesses. Hours verification, shift review, and organised workforce records.',
    path: '/services/timesheet-management'
  },
  'back-office-services': {
    title: 'Back-Office Support for UK Businesses | 1313 Pro Advisors Ltd',
    description: 'Operational back-office support, documentation workflows, and business record management tailored to UK companies.',
    path: '/services/back-office-services'
  },
  contact: {
    title: 'Contact 1313 Pro Advisors Ltd | UK Business Enquiries',
    description: 'Get in touch with 1313 Pro Advisors Ltd for direct, confidential bookkeeping, payroll, timesheet management, and back-office support for your UK business.',
    path: '/contact'
  },
  privacy: {
    title: 'Privacy Policy | 1313 Pro Advisors Ltd',
    description: 'Privacy Policy and UK data protection notice for 1313 Pro Advisors Ltd. Details on how we handle enquiries and operational information securely.',
    path: '/privacy-policy'
  }
}

function updatePageMetadata(page: PageId) {
  const seo = PAGE_SEO[page] || PAGE_SEO.home
  const canonicalUrl = `${BASE_URL}${seo.path === '/' ? '/' : seo.path}`

  // Title
  document.title = seo.title

  // Meta description
  let descMeta = document.querySelector('meta[name="description"]')
  if (!descMeta) {
    descMeta = document.createElement('meta')
    descMeta.setAttribute('name', 'description')
    document.head.appendChild(descMeta)
  }
  descMeta.setAttribute('content', seo.description)

  // Canonical link
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', canonicalUrl)

  // Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.setAttribute('content', seo.title)

  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.setAttribute('content', seo.description)

  const ogUrl = document.querySelector('meta[property="og:url"]')
  if (ogUrl) ogUrl.setAttribute('content', canonicalUrl)

  const ogImg = document.querySelector('meta[property="og:image"]')
  if (ogImg) ogImg.setAttribute('content', `${BASE_URL}/og-image.png`)

  const twitterImg = document.querySelector('meta[name="twitter:image"]')
  if (twitterImg) twitterImg.setAttribute('content', `${BASE_URL}/og-image.png`)

  // Dynamic Breadcrumbs Structured Data
  let breadcrumbScript = document.getElementById('schema-breadcrumb')
  if (breadcrumbScript) breadcrumbScript.remove()

  if (page !== 'home') {
    const script = document.createElement('script')
    script.id = 'schema-breadcrumb'
    script.type = 'application/ld+json'

    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': `${BASE_URL}/`
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': seo.title.split('|')[0].trim(),
          'item': canonicalUrl
        }
      ]
    }
    script.text = JSON.stringify(breadcrumbData)
    document.head.appendChild(script)
  }
}

// Contact Modal (lightweight inline modal)
interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  onNavigateContact: () => void
}
const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onNavigateContact }) => {
  if (!isOpen) return null
  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 sm:p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-cream flex items-center justify-center text-navy hover:bg-cream-soft transition-colors text-lg leading-none"
          aria-label="Close"
        >
          ×
        </button>

        <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center mx-auto mb-5 text-navy font-heading font-black text-xl border border-cream-border">
          1313
        </div>

        <h2 className="text-xl font-heading font-bold text-navy mb-2">Get in Touch</h2>
        <p className="text-sm text-warmGrey leading-relaxed mb-6">
          Visit our contact page to submit your direct enquiry to the 1313 Pro Advisors Ltd UK administrative team.
        </p>

        <button
          onClick={() => { onClose(); onNavigateContact() }}
          className="w-full py-3 px-5 rounded-xl bg-coral text-white text-sm font-heading font-semibold hover:bg-coral-hover transition-colors mb-3"
        >
          Go to Contact Page →
        </button>
        <button
          onClick={onClose}
          className="w-full py-2.5 px-5 rounded-xl bg-cream text-navy text-sm font-heading font-medium hover:bg-cream-soft transition-colors border border-cream-border"
        >
          Close
        </button>
      </div>
    </div>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      return getPageFromPath(window.location.pathname)
    }
    return 'home'
  })
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [contactInitialService, setContactInitialService] = useState<string>('Bookkeeping')

  // Sync initial page metadata
  useEffect(() => {
    updatePageMetadata(currentPage)
  }, [currentPage])

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromPath(window.location.pathname)
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (page: PageId) => {
    setCurrentPage(page)
    const newPath = getPathForPage(page)
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openContact = (service?: string) => {
    if (service) setContactInitialService(service)
    navigate('contact')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={navigate}
            onContactClick={() => openContact()}
          />
        )
      case 'about':
        return (
          <AboutPage
            onNavigate={navigate}
            onContactClick={() => openContact()}
          />
        )
      case 'bookkeeping':
      case 'payroll':
      case 'timesheet-management':
      case 'back-office-services':
        return (
          <ServiceDetailPage
            serviceId={currentPage}
            onNavigate={navigate}
            onContactClick={() => openContact(currentPage)}
          />
        )
      case 'contact':
        return (
          <ContactPage
            onNavigate={navigate}
            initialService={contactInitialService}
          />
        )
      case 'privacy':
        return <PrivacyPage onNavigate={navigate} />
      default:
        return (
          <HomePage
            onNavigate={navigate}
            onContactClick={() => openContact()}
          />
        )
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream overflow-x-hidden">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        onContactClick={() => openContact()}
      />

      <div className="flex-1">
        {renderPage()}
      </div>

      <Footer onNavigate={navigate} />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        onNavigateContact={() => navigate('contact')}
      />
    </div>
  )
}

export default App
