import { ServiceInfo } from '../types'

export const SERVICES_DATA: Record<string, ServiceInfo> = {
  bookkeeping: {
    id: 'bookkeeping',
    title: 'Bookkeeping',
    subtitle: 'Systematic transaction recording and structured ledger administration.',
    shortDescription:
      'Day-to-day bookkeeping support, financial transaction recording, and structured financial record maintenance to support clear, dependable business administration.',
    fullDescription:
      'Accurate day-to-day financial administration forms the cornerstone of every well-run UK business. 1313 Pro Advisors Ltd delivers focused, direct bookkeeping support tailored to your routine operational requirements. We record financial transactions systematically, maintain organised records, and help ensure your financial administration remains transparent, up-to-date, and readily accessible.',
    coreActivities: [
      'Day-to-day bookkeeping support tailored to routine operational activity.',
      'Recording commercial and administrative transactions with meticulous attention to detail.',
      'Maintaining systematic, orderly, and accessible financial records.',
      'Supporting accurate and timely internal financial administration.',
      'Reconciliation of day-to-day supplier and customer transaction entries.',
      'Structured organisation of receipts, invoices, and supporting financial documentation.'
    ],
    operationalOutcomes: [
      {
        title: 'Documented Transaction Accuracy',
        description: 'Every financial entry is recorded methodically, reducing oversights and maintaining reliable administrative ledgers.'
      },
      {
        title: 'Organised Business Ledgers',
        description: 'Financial paperwork and electronic documentation are categorised systematically for seamless internal visibility.'
      },
      {
        title: 'Direct Accountability',
        description: 'All work is handled directly by 1313 Pro Advisors Ltd with rigorous quality controls and confidential handling.'
      },
      {
        title: 'Operational Time Saved',
        description: 'Free business owners and key managers from time-consuming transactional entry so you can focus on core commercial activities.'
      }
    ],
    processSteps: [
      {
        number: '01',
        step: 'Intake & Documentation Review',
        detail: 'Establishing secure communication channels and receiving routine invoices, receipts, and source documents.'
      },
      {
        number: '02',
        step: 'Systematic Transaction Recording',
        detail: 'Entering and categorising financial transactions methodically within agreed operational schedules.'
      },
      {
        number: '03',
        step: 'Ledger Organisation & Verification',
        detail: 'Reviewing entries for consistency, verifying transactional balances, and organising record archives.'
      },
      {
        number: '04',
        step: 'Administrative Summary & Support',
        detail: 'Providing clean, updated transaction schedules and ongoing direct communication for administrative queries.'
      }
    ],
    path: '/services/bookkeeping'
  },

  payroll: {
    id: 'payroll',
    title: 'Payroll',
    subtitle: 'Dependable payroll administration and structured employee payroll records.',
    shortDescription:
      'Reliable payroll processing support, routine payroll administration, and employee record management to keep workforce compensation workflows organised and punctual.',
    fullDescription:
      'Timely and dependable remuneration workflows are essential for employee trust and organisational stability. 1313 Pro Advisors Ltd provides direct payroll administration support for UK businesses. From routine payroll cycle processing support to managing employee payroll files and administrative workflows, our dedicated service ensures your routine payroll records remain meticulously structured and punctual.',
    coreActivities: [
      'Payroll administration support aligned with your weekly, fortnightly, or monthly pay schedules.',
      'Routine payroll processing support and calculation verification.',
      'Maintaining accurate and organised employee payroll records.',
      'Managing payroll-related administrative workflows and routine paperwork.',
      'Coordinating payroll cycle adjustments, updates, and employee profile records.',
      'Structured archival of historical payroll summaries and administrative files.'
    ],
    operationalOutcomes: [
      {
        title: 'Punctual Payroll Administration',
        description: 'Structured workflows ensure your scheduled pay cycles are administered reliably and consistently on time.'
      },
      {
        title: 'Confidential Employee Records',
        description: 'Workforce remuneration data is handled with strict confidentiality and robust data security protocols.'
      },
      {
        title: 'Reduced Administrative Overhead',
        description: 'Removes repetitive payroll data coordination from internal teams while maintaining full operational transparency.'
      },
      {
        title: 'Structured Record Archival',
        description: 'Clear, chronological documentation of all processed pay periods for dependable internal business governance.'
      }
    ],
    processSteps: [
      {
        number: '01',
        step: 'Payroll Schedule & Data Collection',
        detail: 'Gathering periodic pay variables, salary details, and authorized adjustments according to your fixed cycle.'
      },
      {
        number: '02',
        step: 'Calculations & Processing Support',
        detail: 'Executing administrative calculations, applying adjustments, and compiling draft payroll registers.'
      },
      {
        number: '03',
        step: 'Review & Client Confirmation',
        detail: 'Presenting structured payroll schedules for direct management sign-off prior to disbursement.'
      },
      {
        number: '04',
        step: 'Distribution & Record Archival',
        detail: 'Assisting with documentation distribution and archiving comprehensive payroll cycle summaries.'
      }
    ],
    path: '/services/payroll'
  },

  'timesheet-management': {
    id: 'timesheet-management',
    title: 'Timesheet Management',
    subtitle: 'Accurate working hour recording, verification, and workforce time records.',
    shortDescription:
      'Employee timesheet administration, working hours verification, and structured workforce records to ensure operational clarity across hourly and project teams.',
    fullDescription:
      'Managing staff working hours across shifts, projects, or contract assignments requires disciplined oversight. 1313 Pro Advisors Ltd provides comprehensive timesheet management services for UK enterprises. We record, organise, and review working hours systematically, resolving discrepancies and delivering organised workforce attendance records ready for operational analysis and payroll integration.',
    coreActivities: [
      'Employee timesheet collection and structured administrative management.',
      'Accurate recording and organising of regular, overtime, and project working hours.',
      'Timesheet review, verification against schedules, and discrepancy identification.',
      'Maintaining complete, organised workforce attendance records.',
      'Supporting operational communication with managers regarding time approvals.',
      'Preparing consolidated working hour summaries for operational review.'
    ],
    operationalOutcomes: [
      {
        title: 'Precision in Recorded Hours',
        description: 'Systematic timesheet reviews eliminate unverified entries and ensure hours reflect verified work.'
      },
      {
        title: 'Seamless Payroll Alignment',
        description: 'Pre-verified timesheet summaries allow payroll workflows to proceed without last-minute delays.'
      },
      {
        title: 'Clear Workforce Visibility',
        description: 'Organised time tracking records provide clear insights into operational time allocation across teams.'
      },
      {
        title: 'Discrepancy Resolution',
        description: 'Prompt identification of missing entries or scheduling inconsistencies directly with internal leads.'
      }
    ],
    processSteps: [
      {
        number: '01',
        step: 'Submission & Intake Tracking',
        detail: 'Monitoring timely timesheet submissions across departments, contractors, and employee rosters.'
      },
      {
        number: '02',
        step: 'Audit & Hours Verification',
        detail: 'Verifying recorded hours against shift rotas, project assignments, and management authorisations.'
      },
      {
        number: '03',
        step: 'Discrepancy Clarification',
        detail: 'Resolving gaps, overlapping entries, or unapproved hours directly with designated supervisors.'
      },
      {
        number: '04',
        step: 'Consolidated Reporting',
        detail: 'Exporting reconciled time summaries for payroll preparation and internal operational records.'
      }
    ],
    path: '/services/timesheet-management'
  },

  'back-office-services': {
    id: 'back-office-services',
    title: 'Back-Office Services',
    subtitle: 'Streamlined operational administration, documentation workflows, and business record management.',
    shortDescription:
      'Administrative support, business record management, and operational workflow organisation to ensure everyday office operations proceed seamlessly.',
    fullDescription:
      'Smooth day-to-day back-office operations form the backbone of sustained business performance. 1313 Pro Advisors Ltd provides dedicated back-office administrative support directly to UK companies. We manage operational documentation, maintain structured business archives, and assist with routine procedural workflows, enabling your leadership team to focus on strategic development.',
    coreActivities: [
      'Comprehensive administrative support tailored to daily operational requirements.',
      'Business record management and structured digital archiving.',
      'Organising operational workflows, communications, and internal documentation.',
      'Supporting routine business administration and operational filing systems.',
      'Supplier and client administrative coordination and correspondence support.',
      'Data entry, document verification, and operational process maintenance.'
    ],
    operationalOutcomes: [
      {
        title: 'Orderly Business Documentation',
        description: 'Standardised archiving structures ensure critical operational records are easily located and protected.'
      },
      {
        title: 'Consistent Operational Workflows',
        description: 'Routine administrative obligations are executed predictably without distracting core management.'
      },
      {
        title: 'Direct Collaborative Support',
        description: 'Work directly with dedicated administrative professionals who understand your specific operating rhythm.'
      },
      {
        title: 'Enhanced Organisational Agility',
        description: 'Adapt administrative capacity to evolving business requirements without lengthy internal onboarding.'
      }
    ],
    processSteps: [
      {
        number: '01',
        step: 'Workflow Analysis & Mapping',
        detail: 'Understanding your existing administrative routines, file structures, and daily operational bottlenecks.'
      },
      {
        number: '02',
        step: 'Standardised Procedure Setup',
        detail: 'Establishing clear record hierarchies, approval channels, and routine daily or weekly checklists.'
      },
      {
        number: '03',
        step: 'Daily Operational Execution',
        detail: 'Carrying out administrative tasks, document management, and communication support directly and diligently.'
      },
      {
        number: '04',
        step: 'Continuous Oversight & Refinement',
        detail: 'Maintaining organised archives, reporting operational status, and refining workflows as your firm expands.'
      }
    ],
    path: '/services/back-office-services'
  }
}

export const COMPANY_DETAILS = {
  name: '1313 Pro Advisors Ltd',
  legalName: '1313 Pro Advisors Ltd',
  registrationText: 'A direct business services provider for UK companies.',
  email: 'enquiries@1313proadvisors.co.uk',
  phone: '+44 (0) 20 7946 0892',
  market: 'United Kingdom',
  operatingHours: 'Monday – Friday, 08:30 – 17:30 GMT',
  tagline: 'Your Business Operations, in Better Hands.',
  mission: 'Empowering UK businesses with direct, dependable, and accurate bookkeeping, payroll, timesheet management, and back-office support.'
}

