import React, { useState } from 'react'
import { ContactFormData } from '../types'
import { Button } from './Button'
import { COMPANY_DETAILS } from '../data/servicesData'
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Copy, 
  Check 
} from 'lucide-react'

interface ContactFormProps {
  initialService?: string
  className?: string
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialService = 'Bookkeeping',
  className = ''
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    businessName: '',
    businessEmail: '',
    telephone: '',
    serviceRequired: initialService,
    message: '',
    consent: false,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)
  const [referenceId, setReferenceId] = useState('')
  const [copied, setCopied] = useState(false)

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.'
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business Name is required.'
    }
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Please provide a valid email address.'
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Telephone Number is required.'
    }
    if (!formData.serviceRequired) {
      newErrors.serviceRequired = 'Please select a service.'
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      newErrors.message = 'Please provide brief details regarding your operational requirements (at least 15 characters).'
    }
    if (!formData.consent) {
      newErrors.consent = 'You must acknowledge the UK data protection and privacy consent to proceed.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // Generate unique inquiry reference
    const uniqueRef = `1313-ENQ-${Date.now().toString().slice(-6)}`

    // Simulate direct dispatch processing
    setTimeout(() => {
      setIsSubmitting(false)
      setReferenceId(uniqueRef)
      setSubmissionSuccess(true)
    }, 600)
  }

  const handleCopySummary = () => {
    const summary = `1313 Pro Advisors Ltd Enquiry Reference: ${referenceId}\nClient: ${formData.fullName}\nBusiness: ${formData.businessName}\nEmail: ${formData.businessEmail}\nPhone: ${formData.telephone}\nService: ${formData.serviceRequired}\nMessage: ${formData.message}`
    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const mailtoLink = `mailto:${COMPANY_DETAILS.email}?subject=${encodeURIComponent(
    `Direct Service Enquiry [${referenceId || '1313'}] - ${formData.businessName}`
  )}&body=${encodeURIComponent(
    `Dear 1313 Pro Advisors Ltd,\n\nI would like to discuss direct administrative support for our business:\n\nContact Name: ${formData.fullName}\nBusiness Name: ${formData.businessName}\nEmail: ${formData.businessEmail}\nPhone: ${formData.telephone}\nService Required: ${formData.serviceRequired}\n\nEnquiry Details:\n${formData.message}\n\nEnquiry Reference: ${referenceId}`
  )}`

  if (submissionSuccess) {
    return (
      <div className={`bg-white rounded-2xl p-8 border border-cream-border shadow-card text-navy ${className}`}>
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-heading font-bold text-center mb-2 text-navy">
          Enquiry Registered Successfully
        </h3>

        <p className="text-warmGrey text-sm text-center mb-6 max-w-md mx-auto leading-relaxed">
          Thank you, <strong className="text-navy">{formData.fullName}</strong>. Your enquiry for{' '}
          <strong className="text-navy">{formData.businessName}</strong> regarding{' '}
          <strong className="text-navy">{formData.serviceRequired}</strong> has been logged directly with our UK administrative desk.
        </p>

        {/* Reference Number Box */}
        <div className="bg-cream p-4 rounded-xl border border-cream-border mb-6">
          <div className="flex items-center justify-between text-xs text-warmGrey mb-1">
            <span className="font-semibold uppercase tracking-wider">Inquiry Reference Number</span>
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Logged
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-lg text-navy">{referenceId}</span>
            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 text-xs text-navy hover:text-coral font-medium transition-colors p-1.5 rounded hover:bg-white"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Summary'}</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href={mailtoLink}
            className="w-full inline-flex items-center justify-center gap-2 bg-coral text-white font-heading font-semibold py-3 px-5 rounded-lg hover:bg-coral-hover transition-colors text-sm"
          >
            <Mail className="w-4 h-4" />
            <span>Open in Your Email Client (Direct Confirmation)</span>
          </a>

          <Button
            variant="secondary"
            fullWidth
            onClick={() => {
              setSubmissionSuccess(false)
              setFormData({
                fullName: '',
                businessName: '',
                businessEmail: '',
                telephone: '',
                serviceRequired: 'Bookkeeping',
                message: '',
                consent: false,
              })
            }}
          >
            Submit Another Enquiry
          </Button>
        </div>

        <div className="mt-6 pt-4 border-t border-cream-border text-center text-xs text-warmGrey">
          Our team reviews submissions directly. Response time is typically within 1 business day.
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl p-5 sm:p-8 lg:p-10 border border-cream-border shadow-card ${className}`}>
      
      {/* Form Intro Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream text-navy text-xs font-heading font-semibold uppercase tracking-wider mb-3 border border-cream-border">
          <ShieldCheck className="w-3.5 h-3.5 text-coral" />
          <span>Direct UK Business Consultation</span>
        </div>
        <h3 className="text-2xl font-heading font-bold text-navy mb-2">
          Discuss Your Operational Requirements
        </h3>
        <p className="text-warmGrey text-sm leading-relaxed">
          Complete the form below to connect directly with our UK administration team. All discussions are confidential and direct.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        
        {/* Name & Business Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-navy mb-1.5">
              Full Name <span className="text-coral">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Eleanor Vance"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-navy bg-cream-ivory focus:bg-white focus:outline-none transition-colors ${
                errors.fullName ? 'border-coral ring-1 ring-coral' : 'border-cream-border focus:border-navy'
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-coral mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-navy mb-1.5">
              Business Name <span className="text-coral">*</span>
            </label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              placeholder="e.g. Vantage Logistical Ltd"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-navy bg-cream-ivory focus:bg-white focus:outline-none transition-colors ${
                errors.businessName ? 'border-coral ring-1 ring-coral' : 'border-cream-border focus:border-navy'
              }`}
            />
            {errors.businessName && (
              <p className="text-xs text-coral mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.businessName}</span>
              </p>
            )}
          </div>
        </div>

        {/* Email & Phone Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-navy mb-1.5">
              Business Email <span className="text-coral">*</span>
            </label>
            <input
              type="email"
              value={formData.businessEmail}
              onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
              placeholder="e.g. director@company.co.uk"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-navy bg-cream-ivory focus:bg-white focus:outline-none transition-colors ${
                errors.businessEmail ? 'border-coral ring-1 ring-coral' : 'border-cream-border focus:border-navy'
              }`}
            />
            {errors.businessEmail && (
              <p className="text-xs text-coral mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.businessEmail}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-navy mb-1.5">
              Telephone Number <span className="text-coral">*</span>
            </label>
            <input
              type="tel"
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              placeholder="e.g. +44 20 7946 0000"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-navy bg-cream-ivory focus:bg-white focus:outline-none transition-colors ${
                errors.telephone ? 'border-coral ring-1 ring-coral' : 'border-cream-border focus:border-navy'
              }`}
            />
            {errors.telephone && (
              <p className="text-xs text-coral mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.telephone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Service Required Dropdown */}
        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-navy mb-1.5">
            Service Required <span className="text-coral">*</span>
          </label>
          <select
            value={formData.serviceRequired}
            onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
            className={`w-full px-4 py-2.5 rounded-lg border text-sm text-navy bg-cream-ivory focus:bg-white focus:outline-none transition-colors ${
              errors.serviceRequired ? 'border-coral ring-1 ring-coral' : 'border-cream-border focus:border-navy'
            }`}
          >
            <option value="Bookkeeping">Bookkeeping (Transaction recording &amp; ledger records)</option>
            <option value="Payroll">Payroll (Payroll administration &amp; employee records)</option>
            <option value="Timesheet Management">Timesheet Management (Hours tracking &amp; verification)</option>
            <option value="Back-Office Services">Back-Office Services (Operations &amp; business records)</option>
            <option value="Multiple Services">Multiple Services (Combined operational package)</option>
            <option value="Other Enquiry">Other Operational Administrative Enquiry</option>
          </select>
          {errors.serviceRequired && (
            <p className="text-xs text-coral mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.serviceRequired}</span>
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-navy mb-1.5">
            Your Operational Requirements <span className="text-coral">*</span>
          </label>
          <textarea
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Please outline your current setup, frequency of support needed (e.g., weekly payroll, daily transactions), or key operational bottlenecks..."
            className={`w-full px-4 py-2.5 rounded-lg border text-sm text-navy bg-cream-ivory focus:bg-white focus:outline-none transition-colors resize-none ${
              errors.message ? 'border-coral ring-1 ring-coral' : 'border-cream-border focus:border-navy'
            }`}
          />
          {errors.message && (
            <p className="text-xs text-coral mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Consent Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-1 w-4 h-4 rounded border-cream-border text-coral focus:ring-coral focus:ring-offset-cream"
            />
            <span className="text-xs text-warmGrey leading-relaxed select-none">
              I consent to 1313 Pro Advisors Ltd collecting and processing my details to respond to this business enquiry in accordance with UK Data Protection and our Privacy Policy. Information is never shared with third parties.
            </span>
          </label>
          {errors.consent && (
            <p className="text-xs text-coral mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.consent}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isSubmitting}
            icon={<Send className="w-4 h-4" />}
          >
            {isSubmitting ? 'Registering Enquiry...' : 'Submit Business Enquiry'}
          </Button>
        </div>

        {/* Confidence Assurance */}
        <div className="flex items-center justify-center gap-2 pt-2 text-xs text-warmGrey">
          <ShieldCheck className="w-4 h-4 text-coral" />
          <span>Direct service delivery • Strictly confidential</span>
        </div>
      </form>
    </div>
  )
}

