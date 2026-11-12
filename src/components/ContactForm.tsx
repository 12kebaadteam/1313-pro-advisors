import React, { useState } from 'react'
import { ContactFormData } from '../types'
import { Button } from './Button'
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Copy, 
  Check,
  Loader2,
  Mail
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

  // Honeypot field (hidden from legitimate visitors to trap spam bots)
  const [honeypot, setHoneypot] = useState('')

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)
  const [referenceId, setReferenceId] = useState('')
  const [copied, setCopied] = useState(false)

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {}

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name is required (at least 2 characters).'
    }
    if (!formData.businessName.trim() || formData.businessName.trim().length < 2) {
      newErrors.businessName = 'Business Name is required (at least 2 characters).'
    }
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Please provide a valid email address.'
    }
    if (!formData.telephone.trim() || formData.telephone.trim().length < 5) {
      newErrors.telephone = 'A valid telephone number is required.'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError(null)

    if (!validate()) return

    // Prevent duplicate submissions
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          website: honeypot // Honeypot trap
        })
      })

      const data = await response.json().catch(() => null)

      if (!response.ok || !data?.success) {
        if (data?.validationErrors) {
          setErrors(data.validationErrors)
        }
        setApiError(
          data?.error || 
          'We were unable to deliver your enquiry automatically. Please verify your entries or contact office@1313proadvisors.ltd directly.'
        )
        setIsSubmitting(false)
        return
      }

      // Success
      setReferenceId(data.referenceId || `1313-ENQ-${Date.now().toString().slice(-6)}`)
      setSubmissionSuccess(true)
      setIsSubmitting(false)
    } catch (err: any) {
      setApiError(
        'Unable to connect to the enquiry service. Please check your internet connection or email office@1313proadvisors.ltd directly.'
      )
      setIsSubmitting(false)
    }
  }

  const handleCopySummary = () => {
    const summary = `1313 Pro Advisors Ltd Enquiry Reference: ${referenceId}\nClient: ${formData.fullName}\nBusiness: ${formData.businessName}\nEmail: ${formData.businessEmail}\nPhone: ${formData.telephone}\nService: ${formData.serviceRequired}\nMessage: ${formData.message}`
    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleResetForm = () => {
    setSubmissionSuccess(false)
    setApiError(null)
    setErrors({})
    setFormData({
      fullName: '',
      businessName: '',
      businessEmail: '',
      telephone: '',
      serviceRequired: initialService,
      message: '',
      consent: false,
    })
    setHoneypot('')
  }

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
          <strong className="text-navy">{formData.serviceRequired}</strong> has been emailed directly to our UK administrative desk at <strong className="text-navy">office@1313proadvisors.ltd</strong>.
        </p>

        {/* Reference Number Box */}
        <div className="bg-cream p-4 rounded-xl border border-cream-border mb-6">
          <div className="flex items-center justify-between text-xs text-warmGrey mb-1">
            <span className="font-semibold uppercase tracking-wider">Inquiry Reference Number</span>
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Delivered &amp; Logged
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
          <Button
            variant="secondary"
            fullWidth
            onClick={handleResetForm}
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

      {/* Global Error Alert Banner */}
      {apiError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold mb-1">Enquiry Submission Alert</p>
            <p className="text-xs leading-relaxed">{apiError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        
        {/* Honeypot field (hidden from humans, catches automated bots) */}
        <div className="opacity-0 absolute -left-[9999px] -top-[9999px]" aria-hidden="true" tabIndex={-1}>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            name="website"
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
          />
        </div>

        {/* Name & Business Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-navy mb-1.5">
              Full Name <span className="text-coral">*</span>
            </label>
            <input
              type="text"
              disabled={isSubmitting}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Eleanor Vance"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-navy bg-cream-ivory focus:bg-white focus:outline-none transition-colors disabled:opacity-60 ${
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
              disabled={isSubmitting}
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              placeholder="e.g. Vantage Logistical Ltd"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-navy bg-cream-ivory focus:bg-white focus:outline-none transition-colors disabled:opacity-60 ${
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
              disabled={isSubmitting}
              value={formData.businessEmail}
              onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
              placeholder="e.g. director@company.co.uk"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-navy bg-cream-ivory focus:bg-white focus:outline-none transition-colors disabled:opacity-60 ${
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
              disabled={isSubmitting}
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              placeholder="e.g. +44 20 7946 0000"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-navy bg-cream-ivory focus:bg-white focus:outline-none transition-colors disabled:opacity-60 ${
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
            disabled={isSubmitting}
            value={formData.serviceRequired}
            onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
            className={`w-full px-4 py-2.5 rounded-lg border text-sm text-navy bg-cream-ivory focus:bg-white focus:outline-none transition-colors disabled:opacity-60 ${
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
            disabled={isSubmitting}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Please outline your current setup, frequency of support needed (e.g., weekly payroll, daily transactions), or key operational bottlenecks..."
            className={`w-full px-4 py-2.5 rounded-lg border text-sm text-navy bg-cream-ivory focus:bg-white focus:outline-none transition-colors resize-none disabled:opacity-60 ${
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
              disabled={isSubmitting}
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-1 w-4 h-4 rounded border-cream-border text-coral focus:ring-coral focus:ring-offset-cream disabled:opacity-60"
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
            icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
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
