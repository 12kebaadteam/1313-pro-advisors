import React, { useState } from 'react'
import { PageId } from './types'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ServiceDetailPage } from './pages/ServiceDetailPage'
import { ContactPage } from './pages/ContactPage'
import { PrivacyPage } from './pages/PrivacyPage'

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
  const [currentPage, setCurrentPage] = useState<PageId>('home')
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [contactInitialService, setContactInitialService] = useState<string>('Bookkeeping')

  const navigate = (page: PageId) => {
    setCurrentPage(page)
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
    <div className="min-h-screen flex flex-col bg-cream">
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
