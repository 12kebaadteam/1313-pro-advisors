import React from 'react'
import { 
  CheckCircle, 
  Clock, 
  Workflow, 
  UserCheck, 
  Lock, 
  ShieldCheck,
  Building2 
} from 'lucide-react'

export const WhyChooseUs: React.FC = () => {
  const values = [
    {
      icon: <CheckCircle className="w-5 h-5 text-coral" />,
      title: 'Accuracy & Attention to Detail',
      description:
        'Financial transactions, ledger entries, and working hour records demand absolute precision. We maintain structured administrative review stages to record every detail methodically.'
    },
    {
      icon: <Clock className="w-5 h-5 text-coral" />,
      title: 'Dependable & Punctual Service',
      description:
        'Payroll cycles, timesheet deadlines, and weekly transaction logs cannot wait. Our team operates on reliable schedules aligned with your regular business rhythms.'
    },
    {
      icon: <Workflow className="w-5 h-5 text-coral" />,
      title: 'Organised Operational Processes',
      description:
        'We establish clear documentation hierarchies and transparent workflows, turning cluttered operational paperwork into organised, retrievable records.'
    },
    {
      icon: <UserCheck className="w-5 h-5 text-coral" />,
      title: 'Direct Professional Support',
      description:
        'You work directly with dedicated UK business administration professionals. We do not outsource your records or delegate your operations to third-party intermediaries.'
    },
    {
      icon: <Lock className="w-5 h-5 text-coral" />,
      title: 'Confidential Handling of Records',
      description:
        'Your commercial transactions, employee payroll figures, and internal workflows are treated with the highest degree of discretion, confidentiality, and data security.'
    }
  ]

  return (
    <section className="bg-navy text-cream py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative background grid subtle overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#293B59_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-light text-coral text-xs font-heading font-semibold uppercase tracking-wider mb-4 border border-navy-light/80">
            <ShieldCheck className="w-4 h-4" />
            <span>Our Professional Standards</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-cream tracking-tight mb-6">
            The Principles Behind Our Direct Administrative Support.
          </h2>
          
          <p className="text-cream/80 text-base sm:text-lg leading-relaxed">
            1313 Pro Advisors Ltd operates as an accountable operational partner for UK companies. We provide direct, hands-on administration to ensure your business ledgers, payroll cycles, and timesheet records remain organised and dependable.
          </p>
        </div>

        {/* 5 Values Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((item, index) => (
            <div
              key={index}
              className={`p-7 rounded-2xl bg-navy-dark/70 border border-navy-light/60 hover:border-coral/40 transition-all duration-300 flex flex-col justify-between group ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-navy-light flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                
                <h3 className="text-lg font-heading font-bold text-cream mb-3">
                  {item.title}
                </h3>
                
                <p className="text-sm text-cream/70 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-navy-light/40 flex items-center justify-between text-xs text-cream/40">
                <span>Direct UK Standard</span>
                <span className="font-mono">0{index + 1}</span>
              </div>
            </div>
          ))}

          {/* Highlighting Card / Standout UK Direct Commitment */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-navy-light to-navy border border-coral/30 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-coral/20 flex items-center justify-center text-coral mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-cream mb-3">
                No Intermediaries. Full Accountability.
              </h3>
              <p className="text-sm text-cream/80 leading-relaxed">
                When you partner with 1313 Pro Advisors Ltd, your administrative tasks are managed directly by our team. No hand-offs, no third-party outsourcing, and no hidden delegation.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-navy-light flex items-center justify-between text-xs text-coral font-medium">
              <span>Direct Responsibility</span>
              <CheckCircle className="w-4 h-4 text-coral" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

