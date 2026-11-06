export type PageId =
  | 'home'
  | 'about'
  | 'bookkeeping'
  | 'payroll'
  | 'timesheet-management'
  | 'back-office-services'
  | 'contact'
  | 'privacy'

export type ServiceId =
  | 'bookkeeping'
  | 'payroll'
  | 'timesheet-management'
  | 'back-office-services'

export interface ServiceInfo {
  id: ServiceId
  title: string
  subtitle: string
  shortDescription: string
  fullDescription: string
  coreActivities: string[]
  operationalOutcomes: {
    title: string
    description: string
  }[]
  processSteps: {
    number: string
    step: string
    detail: string
  }[]
  path: string
}

export interface ContactFormData {
  fullName: string
  businessName: string
  businessEmail: string
  telephone: string
  serviceRequired: string
  message: string
  consent: boolean
}

