import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

// In-memory rate limiting store (ephemeral per serverless instance)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5

function isRateLimited(clientIp: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(clientIp)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  record.count += 1
  return false
}

// Clean up stale rate limit entries periodically
function cleanupRateLimit() {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}

// Sanitize single-line text to protect against email header injection (CRLF removal)
function sanitizeHeader(input: string, maxLength = 150): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(/[\r\n]+/g, ' ')
    .replace(/[^\x20-\x7E\u00A0-\uFFFF]/g, '')
    .trim()
    .slice(0, maxLength)
}

// Sanitize multi-line text (preserves normal newlines but strips control characters)
function sanitizeBody(input: string, maxLength = 3000): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[^\x20-\x7E\n\t\u00A0-\uFFFF]/g, '')
    .trim()
    .slice(0, maxLength)
}

// HTML escaping utility for safe rendering in email body
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Valid service options
const ALLOWED_SERVICES = [
  'Bookkeeping',
  'Payroll',
  'Timesheet Management',
  'Back-Office Services',
  'Multiple Services',
  'Other Enquiry'
]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cleanupRateLimit()

  // Allowed origin validation
  const origin = req.headers.origin || ''
  const allowedOrigins = [
    'https://1313proadvisors.ltd',
    'https://www.1313proadvisors.ltd',
    'https://1313-pro-advisors.vercel.app'
  ]

  if (allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  } else if (!origin) {
    // Same-origin browser request
    res.setHeader('Access-Control-Allow-Origin', 'https://1313proadvisors.ltd')
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Enforce POST method
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Only POST requests are accepted.'
    })
  }

  // Rate Limiting Check
  const clientIp = (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    req.socket.remoteAddress ||
    'unknown-ip'
  ).trim()

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Too many enquiry submissions from this connection. Please wait a few minutes before trying again.'
    })
  }

  try {
    const body = req.body || {}

    // Honeypot check: If the hidden honeypot field is filled, silently drop the submission
    if (body.website || body.hp_company) {
      // Return fake success to deceive spam bots
      return res.status(200).json({
        success: true,
        referenceId: `1313-ENQ-${Date.now().toString().slice(-6)}`,
        message: 'Enquiry received successfully.'
      })
    }

    // Extract & sanitize input fields
    const fullName = sanitizeHeader(body.fullName || '', 100)
    const businessName = sanitizeHeader(body.businessName || '', 150)
    const businessEmail = sanitizeHeader(body.businessEmail || '', 100).toLowerCase()
    const telephone = sanitizeHeader(body.telephone || '', 35)
    const rawService = sanitizeHeader(body.serviceRequired || '', 50)
    const serviceRequired = ALLOWED_SERVICES.includes(rawService) ? rawService : 'Other Enquiry'
    const message = sanitizeBody(body.message || '', 3000)
    const consent = Boolean(body.consent)

    // Validation rules
    const errors: Record<string, string> = {}

    if (!fullName || fullName.length < 2) {
      errors.fullName = 'Full Name is required (at least 2 characters).'
    }

    if (!businessName || businessName.length < 2) {
      errors.businessName = 'Business Name is required (at least 2 characters).'
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
    if (!businessEmail || !emailRegex.test(businessEmail)) {
      errors.businessEmail = 'A valid business email address is required.'
    }

    if (!telephone || telephone.length < 5) {
      errors.telephone = 'A contact telephone number is required.'
    }

    if (!message || message.length < 15) {
      errors.message = 'Please provide details of your operational requirements (at least 15 characters).'
    }

    if (!consent) {
      errors.consent = 'UK Data Protection and Privacy consent acknowledgment is required.'
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed. Please review your entries.',
        validationErrors: errors
      })
    }

    // SMTP Configuration from server environment variables
    const smtpHost = process.env.SMTP_HOST || 'smtpout.secureserver.net'
    const smtpPort = Number(process.env.SMTP_PORT) || 465
    const smtpSecure = process.env.SMTP_SECURE !== 'false'
    const smtpUser = process.env.SMTP_USER || 'office@1313proadvisors.ltd'
    const smtpPass = process.env.SMTP_PASSWORD
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'office@1313proadvisors.ltd'

    if (!smtpPass) {
      console.error('[SMTP Config Error] SMTP_PASSWORD environment variable is not configured in Vercel.')
      return res.status(503).json({
        success: false,
        error: 'The enquiry notification service is currently undergoing maintenance. Please email office@1313proadvisors.ltd directly.'
      })
    }

    // Generate unique inquiry reference code
    const timestamp = Date.now()
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase()
    const referenceId = `1313-ENQ-${timestamp.toString().slice(-6)}-${randomSuffix}`
    const submissionDate = new Date().toUTCString()

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      connectionTimeout: 10000, // 10s connection timeout
      greetingTimeout: 7000,    // 7s greeting timeout
      socketTimeout: 15000       // 15s socket timeout
    })

    // Prepare Plain Text email body
    const plainTextBody = `===================================================================
NEW WEBSITE ENQUIRY — 1313 PRO ADVISORS LTD
===================================================================
Reference ID:       ${referenceId}
Submission Time:    ${submissionDate}
-------------------------------------------------------------------
CLIENT & BUSINESS INFORMATION:
Contact Name:       ${fullName}
Business Name:      ${businessName}
Business Email:     ${businessEmail}
Telephone:          ${telephone}
Service Requested:  ${serviceRequired}
Consent Confirmed:  Yes (UK GDPR / Privacy Policy Acknowledged)
-------------------------------------------------------------------
OPERATIONAL REQUIREMENTS & MESSAGE:
${message}
-------------------------------------------------------------------
This email was generated automatically by the enquiry system at
https://1313proadvisors.ltd
Direct Reply: Click Reply in your email client to email ${fullName} directly at ${businessEmail}.
===================================================================`

    // Prepare HTML email body
    const htmlBody = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Website Enquiry — 1313 Pro Advisors Ltd</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F7F4; color: #14213D;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E5E2DC; overflow: hidden; box-shadow: 0 4px 12px rgba(20, 33, 61, 0.04);">
    <!-- Header -->
    <tr>
      <td style="background-color: #14213D; padding: 28px 32px; text-align: left;">
        <div style="display: inline-block; background-color: #ffffff; color: #14213D; font-weight: 900; font-size: 16px; padding: 4px 10px; border-radius: 6px; letter-spacing: 0.5px; margin-bottom: 12px;">1313</div>
        <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.2px;">New Website Business Enquiry</h1>
        <p style="margin: 6px 0 0; color: #E5E2DC; font-size: 13px;">1313 Pro Advisors Ltd • Administrative Desk Notification</p>
      </td>
    </tr>

    <!-- Reference Alert -->
    <tr>
      <td style="background-color: #FFF8E7; padding: 14px 32px; border-bottom: 1px solid #F0E6D2;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="font-size: 12px; color: #8A6D3B; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Enquiry Reference</td>
            <td style="text-align: right; font-family: monospace; font-size: 14px; font-weight: 700; color: #14213D;">${escapeHtml(referenceId)}</td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Content Table -->
    <tr>
      <td style="padding: 28px 32px;">
        <h2 style="margin: 0 0 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.8px; color: #E63946; font-weight: 700;">Client &amp; Organisation Details</h2>
        
        <table role="presentation" width="100%" cellspacing="0" cellpadding="8" style="font-size: 14px; border-collapse: collapse; margin-bottom: 24px;">
          <tr style="border-bottom: 1px solid #F0EEE9;">
            <td style="color: #6B7280; width: 35%; font-weight: 500;">Contact Name</td>
            <td style="color: #14213D; font-weight: 600;">${escapeHtml(fullName)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #F0EEE9;">
            <td style="color: #6B7280; font-weight: 500;">Business Name</td>
            <td style="color: #14213D; font-weight: 600;">${escapeHtml(businessName)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #F0EEE9;">
            <td style="color: #6B7280; font-weight: 500;">Business Email</td>
            <td style="color: #14213D;"><a href="mailto:${escapeHtml(businessEmail)}" style="color: #E63946; text-decoration: none; font-weight: 600;">${escapeHtml(businessEmail)}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #F0EEE9;">
            <td style="color: #6B7280; font-weight: 500;">Telephone</td>
            <td style="color: #14213D; font-weight: 600;">${escapeHtml(telephone)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #F0EEE9;">
            <td style="color: #6B7280; font-weight: 500;">Service Required</td>
            <td style="color: #14213D; font-weight: 700;">${escapeHtml(serviceRequired)}</td>
          </tr>
          <tr>
            <td style="color: #6B7280; font-weight: 500;">Submission Time</td>
            <td style="color: #14213D; font-size: 13px;">${escapeHtml(submissionDate)}</td>
          </tr>
        </table>

        <!-- Message Box -->
        <h2 style="margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.8px; color: #14213D; font-weight: 700;">Operational Requirements</h2>
        <div style="background-color: #F8F7F4; border: 1px solid #E5E2DC; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #14213D; white-space: pre-wrap; margin-bottom: 24px;">${escapeHtml(message)}</div>

        <!-- Reply Notice -->
        <div style="background-color: #EEF4FF; border-left: 4px solid #14213D; padding: 12px 16px; border-radius: 4px; font-size: 13px; color: #1E3A8A;">
          <strong>Direct Reply:</strong> Replying directly to this email will send your response to <strong>${escapeHtml(fullName)}</strong> at <strong>${escapeHtml(businessEmail)}</strong>.
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #F8F7F4; padding: 20px 32px; border-top: 1px solid #E5E2DC; font-size: 12px; color: #6B7280; text-align: center;">
        <p style="margin: 0 0 6px;">1313 Pro Advisors Ltd • Registered UK Business Support Services</p>
        <p style="margin: 0;">Automated Notification Desk • <a href="https://1313proadvisors.ltd" style="color: #14213D; text-decoration: underline;">1313proadvisors.ltd</a></p>
      </td>
    </tr>
  </table>
</body>
</html>`

    const mailOptions = {
      from: `"1313 Pro Advisors Ltd" <${smtpUser}>`,
      to: notificationEmail,
      replyTo: `"${fullName.replace(/"/g, '')}" <${businessEmail}>`,
      subject: `New Website Enquiry — 1313 Pro Advisors Ltd [Ref: ${referenceId}]`,
      text: plainTextBody,
      html: htmlBody
    }

    // Attempt delivery with 1 bounded retry if a transient connection error occurs
    let attempts = 0
    let lastError: any = null

    while (attempts < 2) {
      attempts += 1
      try {
        await transporter.sendMail(mailOptions)
        console.log(`[Enquiry Sent] Reference: ${referenceId} - Service: ${serviceRequired}`)
        return res.status(200).json({
          success: true,
          referenceId,
          message: 'Your enquiry has been received and logged directly with our UK administrative desk.'
        })
      } catch (err: any) {
        lastError = err
        console.warn(`[SMTP Delivery Attempt ${attempts} Failed]`, err?.message || 'Unknown SMTP error')
        if (attempts < 2) {
          // Bounded delay of 1000ms before single retry
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }
      }
    }

    // Both attempts failed
    console.error('[SMTP Delivery Final Error]', lastError?.message || 'SMTP failed')
    return res.status(502).json({
      success: false,
      error: 'We were unable to deliver your enquiry automatically to our mail server. Please try again in a few moments or email office@1313proadvisors.ltd directly.'
    })
  } catch (error: any) {
    console.error('[Enquiry Endpoint Unexpected Exception]', error?.message || 'Server error')
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your request. Please try again.'
    })
  }
}
